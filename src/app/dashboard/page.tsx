"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [loans, setLoans] = React.useState<any[]>([]);
  const [applications, setApplications] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        
        // Fetch loans
        const { data: loansData, error: loansError } = await supabase
          .from("loans")
          .select("*")
          .order("created_at", { ascending: false });

        if (loansError) {
          console.error("Error fetching loans:", loansError);
          setError("Error loading loans. Please try again later.");
          return;
        }

        // Fetch applications
        const { data: applicationsData, error: applicationsError } = await supabase
          .from("loan_applications")
          .select("*")
          .order("created_at", { ascending: false });

        if (applicationsError) {
          console.error("Error fetching applications:", applicationsError);
          setError("Error loading applications. Please try again later.");
          return;
        }

        setLoans(loansData || []);
        setApplications(applicationsData || []);
      } catch (error) {
        console.error("Error in fetchData:", error);
        setError("Error loading data. Please try again later.");
      }
    }

    fetchData();
  }, []);

  const handleLoanClick = (loanId: string) => {
    router.push(`/loans/${loanId}`);
  };

  const handleNewApplication = () => {
    router.push('/applications/new');
  };

  return (
    <div className="space-y-8">
      {/* Applications Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Loan Applications</h1>
        
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-10 space-y-4">
            <p className="text-muted-foreground">You don't have any loan applications.</p>
            <Button onClick={handleNewApplication}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              New Application
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Application #{application.id.slice(0, 8)}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      application.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                      application.status === 'in_review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                    }`}>
                      {application.status.split('_').map((word: string) => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-medium">{formatCurrency(application.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Term</span>
                      <span className="font-medium">{application.term_months} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purpose</span>
                      <span className="font-medium">{application.purpose}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Submitted</span>
                      <span className="font-medium">{new Date(application.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Loans Section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">My Loans</h1>
        
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : loans.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">You don't have any active loans.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loans.map((loan) => (
              <Card 
                key={loan.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleLoanClick(loan.id)}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Loan #{loan.loan_number}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      loan.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                      loan.status === 'paid' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                      loan.status === 'defaulted' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                    }`}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Original Loan Amount</span>
                      <span className="font-medium">{formatCurrency(loan.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining Balance</span>
                      <span className="font-medium">{formatCurrency(loan.remaining_balance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">{loan.interest_rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Term</span>
                      <span className="font-medium">{loan.term_months} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date</span>
                      <span className="font-medium">{new Date(loan.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}