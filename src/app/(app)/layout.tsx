"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/layouts/app-layout";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Get the first segment of the path to determine the base path
  const basePath = pathname.split("/")[1] || "dashboard";

  return <AppLayout basePath={basePath}>{children}</AppLayout>;
} 