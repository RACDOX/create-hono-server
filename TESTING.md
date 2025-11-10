# Testing Guide for create-hono-server

This guide will help you test the CLI tool locally before publishing.

## Prerequisites

- Node.js 18+ or Bun installed
- PostgreSQL database (or Neon account)
- Terminal access

## Local Testing Steps

### 1. Install Dependencies

```bash
cd create-hono-server
npm install
```

### 2. Link Package Locally

This makes the CLI available globally on your system:

```bash
npm link
```

### 3. Test the CLI

Create a test project in a different directory:

```bash
cd ..
create-hono-server test-backend
```

Follow the prompts:
- Project name: `test-backend` (or your choice)
- Package manager: `bun` (or your choice)
- Install dependencies: `yes`

### 4. Verify Generated Files

Check that all files were created:

```bash
cd test-backend
ls -la
```

You should see:
- `package.json`
- `tsconfig.json`
- `.gitignore`
- `.env.example`
- `README.md`
- `drizzle.config.ts`
- `src/` directory with all subdirectories

### 5. Set Up Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/testdb
JWT_SECRET=test-secret-key-change-in-production
PORT=3000
```

### 6. Push Database Schema

```bash
bun run db:push
```

Expected output:
- Drizzle should create the `users` and `sessions` tables

### 7. Start Development Server

```bash
bun run dev
```

Expected output:
```
✅ Database tables already exist (or warning to run db:push)
🚀 Server running on http://localhost:3000
📚 API Documentation: http://localhost:3000/reference
```

### 8. Test API Endpoints

#### a. Test Welcome Route

```bash
curl http://localhost:3000
```

Expected response:
```json
{
  "message": "Welcome to Hono Backend API",
  "version": "1.0.0",
  "documentation": "/reference"
}
```

#### b. Test User Signup

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

Expected response:
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User"
  },
  "message": "User created successfully"
}
```

#### c. Test User Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful"
}
```

#### d. Test Protected Route (Get Current User)

```bash
curl http://localhost:3000/users/me \
  -b cookies.txt
```

Expected response:
```json
{
  "id": 1,
  "email": "test@example.com",
  "name": "Test User",
  "createdAt": "2024-..."
}
```

#### e. Test Get All Users

```bash
curl http://localhost:3000/users/allusers \
  -b cookies.txt
```

Expected response:
```json
{
  "users": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

### 9. Test API Documentation

Open in browser:
```
http://localhost:3000/reference
```

You should see:
- Beautiful Scalar API documentation
- All endpoints listed with descriptions
- Authentication section
- Users section
- Ability to test endpoints directly

### 10. Test OpenAPI JSON

```bash
curl http://localhost:3000/openapi.json
```

Should return valid OpenAPI 3.0 JSON specification.

### 11. Test Database Commands

```bash
# Open Drizzle Studio
bun run db:studio
```

Should open a browser with database GUI at `https://local.drizzle.studio`

### 12. Verify TypeScript Compilation

The project should have no TypeScript errors. Since we're using Bun with hot reload, any TS errors would show in the console.

## Cleanup

After testing, unlink the package:

```bash
npm unlink -g create-hono-server
```

Remove test project:

```bash
cd ..
rm -rf test-backend
```

## Common Issues

### Issue: "DATABASE_URL environment variable is not set"

**Solution:** Make sure you created `.env` file with valid `DATABASE_URL`

### Issue: "Database tables may not exist"

**Solution:** Run `bun run db:push` to create tables

### Issue: Port 3000 already in use

**Solution:** Change `PORT` in `.env` file or stop other services using port 3000

### Issue: JWT token invalid

**Solution:** Make sure `JWT_SECRET` is set in `.env` file

### Issue: Cannot connect to database

**Solution:** Verify your PostgreSQL database is running and credentials are correct

## Success Criteria

✅ CLI runs without errors  
✅ All template files created  
✅ Dependencies installed successfully  
✅ Database schema pushed successfully  
✅ Server starts on port 3000  
✅ Welcome route responds  
✅ User signup works  
✅ User login works  
✅ Protected routes work with authentication  
✅ API documentation loads at `/reference`  
✅ OpenAPI JSON available at `/openapi.json`  
✅ No TypeScript errors  
✅ No console errors  

If all checks pass, your CLI is ready to publish! 🎉

## Next Steps

See `README.md` for publishing instructions.

