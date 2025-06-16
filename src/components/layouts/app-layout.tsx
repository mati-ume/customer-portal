"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { AppSidebar } from "@/components/layouts/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  basePath: string;
}

export function AppLayout({ children, basePath }: AppLayoutProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex h-screen w-screen bg-background">
          <AppSidebar />
          <div className="flex-1 w-full">
            <div className="flex items-center gap-4 px-5 pt-5">
              <SidebarTrigger />
              <Breadcrumb>
                <BreadcrumbList>
                  {pathSegments.map((segment, index) => (
                    <React.Fragment key={segment}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {index === pathSegments.length - 1 ? (
                          <BreadcrumbPage className="capitalize">
                            {segment}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={`/${pathSegments
                              .slice(0, index + 1)
                              .join("/")}`}
                            className="capitalize"
                          >
                            {segment}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="container mx-auto overflow-auto px-6 py-4 space-y-5">
              {children}
            </div>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
} 