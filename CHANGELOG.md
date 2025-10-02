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
- 🔗 Collection assignment/unassignment functionality
- ♻️ Recursive delete support for related collections
- 📚 Comprehensive documentation and examples

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
