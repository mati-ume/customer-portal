import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoanDetails } from "./loan-details";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function LoanDetailsPage({ params }: PageProps) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const { data: loan, error } = await supabase
    .from("loans")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !loan) {
    redirect("/dashboard");
  }

  // Verify the loan belongs to the user
  if (loan.user_id !== user.id) {
    redirect("/dashboard");
  }

  return <LoanDetails loan={loan} />;
} 