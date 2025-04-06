"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckInboxPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-6">
              <h1 className="text-2xl font-bold">Check your inbox</h1>
              <p className="text-balance text-muted-foreground">
                We've sent a confirmation email to{" "}
                <span className="font-semibold">{email}</span>. Please check your
                inbox and click the link to verify your email address.
              </p>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <Link href="/auth/signup" className="underline underline-offset-4">
                  try again
                </Link>
                .
              </p>
              <Button asChild>
                <Link href="/auth/login">Back to login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
