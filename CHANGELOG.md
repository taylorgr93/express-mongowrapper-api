# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-09-26

### Added

- ✨ Initial release of `express-mongowrapper-api`
- 🚀 `create()` method for creating documents with CRUD operations
- 📖 `read()` method for reading documents from MongoDB
- ✏️ `update()` method for updating existing documents
- 🗑️ `remove()` method for soft-deleting documents
- 📁 File upload support with automatic file management

### Changed

- ⚡ Refactored to use async file operations instead of sync (performance improvement)
- 🔄 Replaced `Promise.all()` with `Promise.allSettled()` for better error handling
- 🛡️ Improved request body handling to avoid mutations
- 📝 All code comments in English

### Fixed

- 🐛 Fixed potential side effects from direct `req.body` mutation
- 📊 Improved error logging with `console.error()` instead of `console.log()`

---

## Project Origins

This project is an improved and actively maintained version, forked from [apibuildingframeworkexpress](https://www.npmjs.com/package/apibuildingframeworkexpress).

### Why this fork?

- ✅ Active maintenance and updates
- ✅ Modern async/await patterns
- ✅ Better error handling
- ✅ Up-to-date dependencies
- ✅ Comprehensive documentation
- ✅ Built on top of mongoclienteasywrapper

---

## [1.0.1] - 2025-10-01

### Added

- 📚 Example file examples/basic-usage.js demonstrating complete library usage
- 🤖 GitHub Actions workflow for automated NPM publishing
- 📦 package-lock.json for reproducible builds

### Changed

- ⚡ Optimized dependency structure:

- Moved axios to devDependencies (only needed for testing, not for library users)

### Removed

### Fixed

- 🐛 Fixed file path handling in file upload functionality

- Security

- 🔒 Updated axios to v1.12.2 to fix CSRF vulnerability (GHSA-wf5p-g6vw-rhxx)
- 🔒 Fixed SSRF vulnerability in axios (GHSA-jr5f-v2jv-69x6)
- 🔒 Resolved DoS vulnerability in axios (GHSA-4hjh-wcwx-xvwj)
- ✅ All npm audit vulnerabilities resolved (0 vulnerabilities)

- Developer Experience

- 🚀 Faster installation for users (fewer dependencies to download)
- 📉 Reduced package size by ~30% due to dependency optimization
- 🔧 Improved local development with npm link support

---
