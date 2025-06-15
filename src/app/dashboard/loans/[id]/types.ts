export interface Loan {
  id: string;
  user_id: string;
  amount: number;
  interest_rate: number;
  term_months: number;
  status: string;
  created_at: string;
  monthly_payment: number;
  total_payment: number;
  total_interest: number;
} 