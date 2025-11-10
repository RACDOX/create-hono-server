import { sign, verify } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-in-production";
const JWT_EXPIRY = 60 * 60 * 24 * 7; // 7 days in seconds

/**
 * Hash a password using Bun's built-in bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await Bun.password.verify(password, hash, "bcrypt");
}

/**
 * Generate a JWT token
 */
export async function generateJWT(
  userId: number,
  email: string,
  name: string,
  role: string
): Promise<string> {
  const payload = {
    userId,
    email,
    name,
    role,
    exp: Math.floor(Date.now() / 1000) + JWT_EXPIRY,
  };

  return await sign(payload, JWT_SECRET);
}

/**
 * Verify and decode a JWT token
 */
export async function verifyJWT(token: string): Promise<any> {
  try {
    const payload = await verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export { JWT_SECRET };

