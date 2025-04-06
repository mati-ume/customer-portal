import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { checkAllRoles, checkAuth, checkRole } from "./auth";

async function protectPath(
  supabase: SupabaseClient,
  roles: string[] | null,
  allRequired: boolean = false,
  unauthorizedPath: string = "/unauthorized"
) {
  let authorized = false;

  const isAuthenticated = await checkAuth(supabase);
  if (!isAuthenticated) {
    return unauthorizedPath;
  }

  if (!roles || roles.length === 0) {
    return null;
  }

  if (allRequired) {
    authorized = await checkAllRoles(supabase, roles);
  } else {
    authorized = await checkRole(supabase, roles);
  }

  if (!authorized) {
    return unauthorizedPath;
  }

  return null;
}

const protectedRoutes = [
  {
    path: "/dashboard",
    roles: [], // This route only requires authentication, no specific roles
    unauthorizedPath: "/unauthorized",
  },
  // Add more protected routes here as needed
  // Example:
  // {
  //   path: "/admin",
  //   roles: ["admin"],
  //   unauthorizedPath: "/unauthorized"
  // }
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  for (const route of protectedRoutes) {
    if (request.nextUrl.pathname.startsWith(route.path)) {
      const unauthorizedPath = await protectPath(
        supabase,
        route.roles,
        false,
        route.unauthorizedPath
      );
      if (unauthorizedPath) {
        const redirectUrl = new URL(unauthorizedPath, request.url);
        const previousPage = request.headers.get("referer") || "/";
        redirectUrl.searchParams.set("from", previousPage);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}
