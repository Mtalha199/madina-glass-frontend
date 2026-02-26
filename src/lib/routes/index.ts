/**
 * Route protection module
 * 
 * This module provides utilities and components for route protection
 * in a modular architecture.
 * 
 * - route-matcher.ts: Utilities for determining route protection requirements
 * - route-guards.tsx: React components for protecting routes
 */

export {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  ADMIN_ROUTE_PREFIX,
  isPublicRoute,
  isAuthRoute,
  isAdminRoute,
  shouldProtectRoute,
} from "./route-matcher";

export { RouteGuard } from "./route-guards";

