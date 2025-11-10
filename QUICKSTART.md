# Quick Start Guide

Get up and running with create-hono-server in 5 minutes.

## 1. Create Project

```bash
npx create-hono-server
```

Follow the prompts:
- Enter project name (e.g., `my-api`)
- Select package manager (bun recommended)
- Choose to install dependencies

## 2. Navigate to Project

```bash
cd my-api
```

## 3. Set Up Database

### Using Neon (Recommended)

1. Create a free account at [neon.tech](https://neon.tech/)
2. Create a new project
3. Copy the connection string

### Using Local PostgreSQL

Make sure PostgreSQL is running locally.

## 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your-super-secret-key-change-this
PORT=3000
```

## 5. Initialize Database

```bash
bun run db:push
```

## 6. Start Development Server

```bash
bun run dev
```

## 7. Test the API

Open http://localhost:3000/reference in your browser to see the interactive API documentation.

### Create a User

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

### Get Current User (Protected)

```bash
curl http://localhost:3000/users/me -b cookies.txt
```

## 8. Explore

- **API Docs**: http://localhost:3000/reference
- **OpenAPI Spec**: http://localhost:3000/openapi.json
- **Database GUI**: Run `bun run db:studio`

## Available Commands

```bash
bun run dev          # Start dev server with hot reload
bun run start        # Start production server
bun run db:generate  # Generate migrations
bun run db:push      # Push schema to database
bun run db:studio    # Open database GUI
```

## Project Structure

```
my-api/
├── src/
│   ├── index.ts           # Main app
│   ├── db/                # Database
│   │   ├── schema.ts      # Tables
│   │   ├── connection.ts  # DB client
│   │   └── init.ts        # Initialization
│   ├── middleware/        # Middlewares
│   │   └── auth.ts        # Auth middleware
│   ├── routes/            # API routes
│   │   ├── auth.ts        # Auth endpoints
│   │   └── users.ts       # User endpoints
│   └── utils/             # Utilities
│       └── auth.ts        # Auth helpers
├── drizzle.config.ts      # Drizzle config
├── package.json
├── tsconfig.json
└── .env
```

## Next Steps

1. **Add More Routes**: Create new route files in `src/routes/`
2. **Extend Schema**: Add tables in `src/db/schema.ts`
3. **Add Middleware**: Create custom middleware in `src/middleware/`
4. **Deploy**: Deploy to Vercel, Cloudflare Workers, or any Node.js host

## Resources

- [Hono Documentation](https://hono.dev/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Zod Documentation](https://zod.dev/)
- [Scalar API Docs](https://github.com/scalar/scalar)

## Need Help?

- Check the full README in your project
- Review the TESTING.md guide
- Open an issue on GitHub

Happy coding! 🚀

