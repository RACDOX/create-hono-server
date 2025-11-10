# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-10

### Changed
- **BREAKING:** Package renamed from `create-hono-backend` to `create-hono-server`
- Updated CLI welcome message and default project name
- Enhanced documentation with role-based access control examples

### Added
- **Role-Based Access Control (RBAC)** system
  - Three built-in roles: user, moderator, admin
  - Role field in users table schema with default value "user"
  - New `roleChecker.ts` middleware for role validation
  - `requireRole(['admin', 'moderator'])` middleware function
- Role support in JWT tokens
  - Updated `generateJWT` to include role parameter
  - Updated `AuthUser` interface to include role
  - Auth middleware now extracts role from JWT
- Role parameter in auth routes
  - Signup defaults all new users to "user" role
  - Login returns user with role
  - JWT includes role information
- Protected routes with role requirements
  - `/users/allusers` now requires admin or moderator role
  - Returns 403 Forbidden for users without required role
- Comprehensive RBAC documentation
  - Usage examples for each role
  - Examples of custom role implementations

## [1.0.0] - 2025-11-10

### Added
- Initial release of create-hono-backend CLI
- Interactive CLI with prompts for project configuration
- Support for multiple package managers (bun, npm, pnpm, yarn)
- JWT-based authentication system with HTTP-only cookies
- User registration and login endpoints
- Protected user routes (me, allusers)
- PostgreSQL integration with Drizzle ORM
- OpenAPI 3.0 documentation with Scalar API Reference
- Zod schema validation
- TypeScript support
- Beautiful CLI output with chalk, ora, and prompts
- Production-ready project structure
- Comprehensive README and documentation
- Database initialization and migration support
- Cookie-based session management
- Password hashing with bcrypt
- Pagination support for user lists
- CORS enabled by default
- Environment variable configuration
- Automatic dependency installation
- Template-based project generation

### Features
- 🔐 Secure authentication flow
- 📚 Interactive API documentation
- 🗄️ Type-safe database queries
- ✨ Modern tech stack (Hono, Drizzle, Bun)
- 🎨 Beautiful CLI experience
- 🚀 Production-ready code
- 📝 Comprehensive documentation

[1.0.1]: https://github.com/yourusername/create-hono-server/releases/tag/v1.0.1
[1.0.0]: https://github.com/yourusername/create-hono-server/releases/tag/v1.0.0

