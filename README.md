# create-hono-server

A CLI tool to scaffold a production-ready Hono server with JWT authentication, role-based access control (RBAC), PostgreSQL, Drizzle ORM, and OpenAPI documentation.

## Features

✅ Interactive CLI with prompts  
✅ Multiple package manager support (bun, npm, pnpm, yarn)  
✅ JWT-based authentication with HTTP-only cookies  
✅ Role-based access control (admin, moderator, user)  
✅ PostgreSQL + Drizzle ORM  
✅ OpenAPI 3.0 documentation with Scalar API Reference  
✅ Zod validation  
✅ TypeScript support  
✅ Production-ready code structure  
✅ Beautiful colored terminal output  

## Usage

```bash
npx create-hono-server
```

Or with a specific package manager:

```bash
bunx create-hono-server
```

## What You Get

Running this CLI will create a new Hono server project with:

- **Authentication System**
  - POST `/auth/signup` - User registration (defaults to "user" role)
  - POST `/auth/login` - User login
  - Cookie-based JWT authentication

- **Role-Based Access Control**
  - Three roles: `user`, `moderator`, `admin`
  - Role checker middleware for protected routes
  - JWT tokens include role information

- **User Management**
  - GET `/users/me` - Get current user (protected)
  - GET `/users/allusers` - Get all users with pagination (requires admin or moderator role)

- **Documentation**
  - GET `/reference` - Interactive API docs (Scalar)
  - GET `/openapi.json` - OpenAPI specification

- **Database**
  - PostgreSQL with Drizzle ORM
  - User and session tables
  - Type-safe queries

## Project Structure

```
your-project/
├── src/
│   ├── index.ts              # Main application
│   ├── db/
│   │   ├── schema.ts         # Database schema (with roles)
│   │   ├── connection.ts     # DB connection
│   │   └── init.ts           # DB initialization
│   ├── middleware/
│   │   ├── auth.ts           # Auth middleware
│   │   └── roleChecker.ts    # Role-based access control
│   ├── routes/
│   │   ├── auth.ts           # Auth routes
│   │   └── users.ts          # User routes (with RBAC)
│   └── utils/
│       └── auth.ts           # Auth utilities
├── package.json
├── tsconfig.json
├── drizzle.config.ts
├── .env.example
├── .gitignore
└── README.md
```

## Quick Start

After creating your project:

```bash
# Navigate to project
cd your-project-name

# Create .env file (use .env.example as template)
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Push database schema
bun run db:push

# Start development server
bun run dev
```

Visit `http://localhost:3000/reference` for API documentation.

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run db:generate` - Generate database migrations
- `bun run db:push` - Push schema to database
- `bun run db:studio` - Open Drizzle Studio

## Tech Stack

- [Hono](https://hono.dev/) - Ultrafast web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Zod](https://zod.dev/) - Schema validation
- [Scalar](https://github.com/scalar/scalar) - API documentation
- [Bun](https://bun.sh/) - JavaScript runtime
- [PostgreSQL](https://www.postgresql.org/) - Database

## Development

### Local Testing

```bash
# Install dependencies
npm install

# Link package locally
npm link

# Test the CLI
create-hono-server test-project

# Unlink when done
npm unlink -g create-hono-server
```

## Publishing

```bash
# Login to npm
npm login

# Publish package
npm publish

# Users can now run
npx create-hono-server
```

## Requirements

- Node.js 18+ or Bun
- PostgreSQL database (local or cloud like [Neon](https://neon.tech/))

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on the GitHub repository.

---

Made with ❤️ using Hono and Bun

