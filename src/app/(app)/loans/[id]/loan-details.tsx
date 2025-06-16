"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusCircleIcon, ArrowUpIcon, CalendarClockIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface LoanDetailsProps {
  loan: any;
  transactions: any[];
}

export function LoanDetails({ loan, transactions }: LoanDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Loan Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Loan Number</span>
              <span className="font-medium">#{loan.loan_number}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                loan.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                loan.status === 'paid' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                loan.status === 'defaulted' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
              }`}>
                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Original Amount</span>
              <span className="font-medium">{formatCurrency(loan.amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Remaining Balance</span>
              <span className="font-medium">{formatCurrency(loan.remaining_balance)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Interest Rate</span>
              <span className="font-medium">{loan.interest_rate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Term</span>
              <span className="font-medium">{loan.term_months} months</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Start Date</span>
              <span className="font-medium">{new Date(loan.start_date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">End Date</span>
              <span className="font-medium">{new Date(loan.end_date).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Repayments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Repayments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment Frequency</span>
                <span className="font-medium capitalize">{loan.payment_frequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Next Payment Date</span>
                <span className="font-medium">{new Date(loan.next_payment_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Next Payment Amount</span>
                <span className="font-medium">{formatCurrency(loan.next_payment_amount)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Make Extra Repayment
              </Button>
              <Button className="w-full" variant="outline">
                <ArrowUpIcon className="mr-2 h-4 w-4" />
                Increase Repayment Amount
              </Button>
              <Button className="w-full" variant="outline">
                <CalendarClockIcon className="mr-2 h-4 w-4" />
                Change Payment Date
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No recent transactions
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium capitalize">
                      {transaction.transaction_type.replace(/_/g, ' ')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.transaction_date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 