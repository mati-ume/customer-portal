import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/constants/brand";
import { Button } from "@/components/ui/button";
import { LandingLoginForm } from "./login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-w-6xl">
        {/* Left Column - Welcome Message */}
        <div className="space-y-8 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <Image
              src="/logo.webp"
              alt="UME Loans Logo"
              width={200}
              height={80}
              className="object-contain"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Welcome to {brand.name}</h1>
            <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
              {brand.description}
            </p>
          </div>

          {/* <div className="flex gap-4 justify-center md:justify-start">
            <Button asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          </div> */}
        </div>

        {/* Right Column - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login to Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <LandingLoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
