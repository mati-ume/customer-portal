import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoanDetails } from "./loan-details";

// Remove the custom PageProps interface and use Next.js built-in types
export default async function LoanPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  const data = await getLoan(id);

  if (!data) {
    notFound();
  }

  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const { data: loan, error } = await supabase
    .from("loans")
    .select("*")
    .eq("id", id)
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