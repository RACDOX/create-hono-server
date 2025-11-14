import { Context, Next } from "hono";
import { AuthUser } from "./auth";

/**
 * Role-based access control middleware
 * Checks if user has one of the allowed roles
 * 
 * @param allowedRoles - Array of allowed role strings (e.g., ['admin', 'moderator'])
 * @returns Middleware function
 */
export function requireRole(allowedRoles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as AuthUser | undefined;

    if (!user) {
      return c.json(
        {
          error: "Unauthorized",
          message: "Authentication required",
        },
        401
      );
    }

    if (!allowedRoles.includes(user.role)) {
      return c.json(
        {
          error: "Forbidden",
          message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
        },
        403
      );
    }

    await next();
  };
}

/**
 * Convenience middleware for admin-only routes
 */
export function requireAdmin(c: Context, next: Next) {
  return requireRole(["admin"])(c, next);
}

/**
 * Convenience middleware for admin or moderator routes
 */
export function requireAdminOrModerator(c: Context, next: Next) {
  return requireRole(["admin", "moderator"])(c, next);
}

