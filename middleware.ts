// middleware.ts (or wherever your middleware is defined)
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;
  // const userRole = req.auth?.user?.role; // Ensure your auth object has the correct types

  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const isAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix);

  // if (isApiAuthRoute) {
  //   return ;
  // }

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return ;
  // }

  // // Check if the user is trying to access a protected route
  // if (!isLoggedIn && !isPublicRoute) {
  //   let callbackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callbackUrl += nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  //   return Response.redirect(
  //     new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  //   );
  // }

  // // Check for admin route access
  // if (isAdminRoute) {
  //   if (!isLoggedIn || userRole !== "ADMIN") {
  //     const errorType = "Unauthorized Access";
  //     const errorMessage = "You do not have permission to access this page.";
  //     return Response.redirect(
  //       new URL(
  //         `/error?errorType=${encodeURIComponent(
  //           errorType
  //         )}&errorMessage=${encodeURIComponent(errorMessage)}`,
  //         nextUrl
  //       )
  //     );
  //   }
  // }

  // return ;
});

// Middleware configuration
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
