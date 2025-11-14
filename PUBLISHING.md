# Publishing Guide

This guide will walk you through publishing `create-hono-server` to npm.

## Prerequisites

- npm account ([Sign up here](https://www.npmjs.com/signup))
- Git repository set up
- All tests passed (see `TESTING.md`)

## Pre-Publishing Checklist

Before publishing, make sure:

- [ ] All files are committed to git
- [ ] Version number is correct in `package.json`
- [ ] `README.md` is complete and accurate
- [ ] `CHANGELOG.md` is updated
- [ ] Package has been tested locally with `npm link`
- [ ] All template files are working correctly
- [ ] Dependencies are up to date
- [ ] `.npmignore` excludes unnecessary files
- [ ] License is correct
- [ ] Author information is filled in `package.json`
- [ ] Repository URL is correct in `package.json`

## Update Package Metadata

Before publishing, update these fields in `package.json`:

```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/create-hono-server"
  },
  "bugs": {
    "url": "https://github.com/yourusername/create-hono-server/issues"
  },
  "homepage": "https://github.com/yourusername/create-hono-server#readme"
}
```

## Publishing Steps

### 1. Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### 2. Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included in the package.

### 3. Test Package Locally

```bash
# Link the package
npm link

# Test it
cd /tmp
create-hono-backend test-project

# Unlink when done
npm unlink -g create-hono-backend
```

### 4. Publish to npm

For the first publish:

```bash
npm publish
```

For subsequent updates:

```bash
# Update version first
npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
npm version minor  # for new features (1.0.0 -> 1.1.0)
npm version major  # for breaking changes (1.0.0 -> 2.0.0)

# Then publish
npm publish
```

### 5. Verify Publication

Check your package on npm:

```
https://www.npmjs.com/package/create-hono-server
```

Test installation:

```bash
npx create-hono-server test-project
```

## Post-Publishing

### 1. Create Git Tag

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Create GitHub Release

Go to your repository on GitHub:
1. Click "Releases"
2. Click "Create a new release"
3. Select the tag you just created
4. Add release notes from `CHANGELOG.md`
5. Publish release

### 3. Update Documentation

Make sure your README includes:
- Installation instructions
- Usage examples
- Features list
- Link to generated project documentation

### 4. Share Your Package

Share on:
- Twitter/X
- Reddit (r/javascript, r/node)
- Dev.to
- Hono Discord
- Your blog

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version (X.0.0): Breaking changes
- **MINOR** version (0.X.0): New features (backwards compatible)
- **PATCH** version (0.0.X): Bug fixes

Example version history:
- 1.0.0 - Initial release
- 1.0.1 - Bug fix in auth middleware
- 1.1.0 - Added new database driver support
- 2.0.0 - Changed CLI API (breaking change)

## Updating the Package

When you need to publish an update:

```bash
# 1. Make your changes
git add .
git commit -m "feat: add new feature"

# 2. Update CHANGELOG.md

# 3. Bump version
npm version minor

# 4. Push changes
git push origin main --tags

# 5. Publish
npm publish

# 6. Create GitHub release
```

## Unpublishing (Emergency Only)

⚠️ **Warning:** Only unpublish if absolutely necessary (security issue, accidental publish)

```bash
npm unpublish create-hono-backend@1.0.0
```

Note: You can only unpublish within 72 hours of publishing, and it should only be done for serious reasons.

## Package Scope (Optional)

If you want to publish under your username scope:

1. Update `package.json`:
```json
{
  "name": "@yourusername/create-hono-backend"
}
```

2. Publish as public:
```bash
npm publish --access public
```

## Troubleshooting

### Error: Package name already taken

Choose a different name or publish under your scope.

### Error: You need to be logged in

Run `npm login` again.

### Error: 403 Forbidden

Make sure you have permission to publish this package name.

### Package not updating

Users might need to clear npm cache:
```bash
npx clear-npx-cache
npm cache clean --force
```

## Maintenance

### Regular Updates

- Update dependencies monthly
- Monitor GitHub issues
- Respond to PRs
- Keep documentation current
- Test with latest Hono/Drizzle versions

### Security

- Enable 2FA on npm account
- Use `npm audit` regularly
- Update vulnerable dependencies promptly
- Monitor security advisories

## Success!

Once published, users can install with:

```bash
npx create-hono-backend
```

Congratulations! 🎉

