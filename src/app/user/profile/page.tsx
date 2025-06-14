"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  residential_address: string | null;
}

export default function UserProfilePage() {
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    residential_address: "",
  });

  React.useEffect(() => {
    async function fetchProfile() {
      try {
        const supabase = createClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error("Not authenticated");
        }

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone_number: data.phone_number || "",
          residential_address: data.residential_address || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Not authenticated");
      }

      const { error } = await supabase
        .from("users")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          residential_address: formData.residential_address,
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      setProfile({
        ...profile!,
        ...formData
      });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Profile Information</CardTitle>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isLoading}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile?.email}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                  type="tel"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="residential_address">Residential Address</Label>
                <Input
                  id="residential_address"
                  name="residential_address"
                  value={formData.residential_address}
                  onChange={handleInputChange}
                  disabled={!isEditing || isLoading}
                />
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 