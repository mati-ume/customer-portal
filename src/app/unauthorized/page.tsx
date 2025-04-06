import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  const previousPath = searchParams.from || "/";

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="text-muted-foreground">
        You are not authorized to access this page.
      </p>
      <Button asChild>
        <Link href={previousPath}>Return to previous page</Link>
      </Button>
    </div>
  );
}
