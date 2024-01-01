import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { MiddlewareFactory } from "./type";
import { isAuthenticated } from "@/lib/auth";
import { User } from "@/services/auth/type";
import { hasRole } from "@/utils/hasRole";

// Define an array of paths that don't require authentication
const pathWithoutAuth = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/password-change",
  "/auth/social",
];
// Define an array of public paths
const publicPath = ["/auth/confirm-email"];

const adminPath = ["/users-management"];

const regexPattern = /^(?!\/(api|_next\/(static|image)|favicon\.ico)).*/;

// Create a middleware factory named "authorization"
export const authorization: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (!regexPattern.test(pathname)) return NextResponse.next();

    // Check if the user is authenticated
    const infoUser: User = await isAuthenticated(request);
    // Check if the path requires authentication and the user is not authenticated
    if (![...pathWithoutAuth, ...publicPath].includes(pathname) && !infoUser) {
      // Redirect the user to the login page
      const url = new URL(`/auth/login`, request.url);
      return NextResponse.redirect(url);
    }

    // Check if the path doesn't require authentication but the user is authenticated
    if (pathWithoutAuth.includes(pathname) && infoUser) {
      // Redirect the user to the home page
      const url = new URL(`/`, request.url);
      return NextResponse.redirect(url);
    }

    if (adminPath.includes(pathname)) {
      if (!hasRole(infoUser, "admin")) {
        const url = new URL(`/`, request.url);
        return NextResponse.redirect(url);
      }
    }

    return next(request, _next);
  };
};
