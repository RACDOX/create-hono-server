import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verifyJWT } from "../utils/auth";

export interface AuthUser {
  userId: number;
  email: string;
  name: string;
  role: string;
}

/**
 * Authentication middleware
 * Verifies JWT token from cookie and sets user in context
 */
export async function authMiddleware(c: Context, next: Next) {
  const token = getCookie(c, "auth_token");

  if (!token) {
    return c.json(
      {
        error: "Unauthorized",
        message: "Authentication token is required",
      },
      401
    );
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return c.json(
      {
        error: "Unauthorized",
        message: "Invalid or expired token",
      },
      401
    );
  }

  // Set user in context
  c.set("user", {
    userId: payload.userId,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  } as AuthUser);

  await next();
}

