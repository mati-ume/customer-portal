"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { brand } from "@/lib/constants/brand";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sections = [
  {
    title: "Product",
    links: [
      { href: "/download", label: "Download" },
      { href: "#features", label: "Features", isScroll: true },
      { href: "/info/security", label: "Security" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/info/company/about", label: "About Us" },
      { href: "/info/company/careers", label: "Careers" },
      { href: "/info/company/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/info/legal/privacy-policy", label: "Privacy Policy" },
      { href: "/info/legal/terms-of-service", label: "Terms of Service" },
      { href: "/info/legal/cookie-policy", label: "Cookie Policy" },
    ],
  },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const supabase = createClient();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    router.push(href);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {sections.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              onClick={(e) => handleClick(e, link.href)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              target={
                                link.href.startsWith("/info/") ? "_blank" : undefined
                              }
                              rel={
                                link.href.startsWith("/info/")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              <div className="text-sm font-medium leading-none">
                                {link.label}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.email?.[0].toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign In
                </Button>
                <Button onClick={() => router.push("/auth/signup")}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
