import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
  const res = NextResponse.next();

  // Check if Supabase environment variables are available
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.warn(
      "Supabase environment variables not found. Skipping auth middleware."
    );
    return res;
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value;
          },
          set(name, value, options) {
            res.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name, options) {
            res.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const protectedRoutes = ["/app", "/documents"];

    if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
      if (!session) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = "/";
        return NextResponse.redirect(redirectUrl);
      }
    }

    return res;
  } catch (error) {
    console.warn("Error in middleware:", error);
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
