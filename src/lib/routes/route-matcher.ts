/**
 * Route matcher utilities for determining route protection requirements
 */

/**
 * Public routes that should never be protected
 */
export const PUBLIC_ROUTES = [
  "/",
  "/not-found",
] as const;

/**
 * Auth routes that should be accessible without authentication
 */
export const AUTH_ROUTES = [
  "/admin/auth/signin",
  "/admin/auth/signup",
] as const;

/**
 * Admin routes prefix - all routes under this should be protected (except auth routes)
 */
export const ADMIN_ROUTE_PREFIX = "/admin";

/**
 * Check if a route is a public route
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route);
}

/**
 * Check if a route is an auth route
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if a route is an admin route
 */
export function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith(ADMIN_ROUTE_PREFIX);
}

/**
 * Check if a route should be protected
 * Admin routes are protected, except auth routes
 */
export function shouldProtectRoute(pathname: string): boolean {
  // Public routes are never protected
  if (isPublicRoute(pathname)) {
    return false;
  }

  // Auth routes are never protected
  if (isAuthRoute(pathname)) {
    return false;
  }

  // All admin routes (except auth) should be protected
  if (isAdminRoute(pathname)) {
    return true;
  }

  // All other routes are public by default
  return false;
}

