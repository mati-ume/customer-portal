import { Loan } from "./types";

export interface LoanDetailsProps {
  loan: Loan;
}

export function LoanDetails(props: LoanDetailsProps): JSX.Element; 