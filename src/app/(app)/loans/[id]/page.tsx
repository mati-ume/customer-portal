import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { LoanDetails } from "./loan-details";

export default async function LoanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/auth/login');
  }

  const { data: loan, error: loanError } = await supabase
    .from('loans')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (loanError || !loan) {
    console.error('Error fetching loan:', loanError);
    notFound();
  }

  // Additional security check to ensure the loan belongs to the user
  if (loan.user_id !== session.user.id) {
    redirect('/dashboard');
  }

  const { data: transactions } = await supabase
    .from('loan_transactions')
    .select('*')
    .eq('loan_id', id)
    .order('transaction_date', { ascending: false })
    .limit(5);

  return <LoanDetails loan={loan} transactions={transactions || []} />;
} 