# Express Mongowrapper API

> Express.js API framework powered by [mongoclienteasywrapper](https://www.npmjs.com/package/mongoclienteasywrapper) for MongoDB operations

[![npm version](https://img.shields.io/npm/v/express-mongowrapper-api.svg)](https://www.npmjs.com/package/express-mongowrapper-api)
[![npm downloads](https://img.shields.io/npm/dm/express-mongowrapper-api.svg)](https://www.npmjs.com/package/express-mongowrapper-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Uses mongoclienteasywrapper](https://img.shields.io/badge/Uses-mongoclienteasywrapper-blue)](https://www.npmjs.com/package/mongoclienteasywrapper)

Build REST APIs with Express.js and MongoDB quickly and easily. This framework provides ready-to-use CRUD operations, file upload handling, collection assignments, and more.

---

## 🚀 Features

- ✅ **Automatic CRUD operations** for MongoDB collections
- ✅ **File upload support** with Multer (images, documents, etc.)
- ✅ **Assignment/unassignment handling** between collections
- ✅ **Recursive delete support** for related documents
- ✅ **Middleware support** for custom processing
- ✅ **Async/await based** - modern JavaScript, no callback hell
- ✅ **Built-in error handling**
- ✅ **Powered by mongoclienteasywrapper** for easy MongoDB operations

---

## 📦 Installation

```bash
npm install express-mongowrapper-api mongoclienteasywrapper express
```

---

## 🔧 Quick Start

### Basic Setup

```javascript
const express = require("express");
const { create, read, update, remove } = require("express-mongowrapper-api");

const app = express();
app.use(express.json());

// Middleware to attach database connection to request
app.use((req, res, next) => {
  req.database = "mydb"; // Your database name
  next();
});

// Create endpoint
app.post(
  "/api/users",
  create({
    Collection: "users",
  })
);

// Read endpoint
app.get(
  "/api/users",
  read({
    Collection: "users",
  })
);

// Update endpoint
app.put(
  "/api/users/:_id",
  update({
    Collection: "users",
  })
);

// Delete endpoint
app.delete(
  "/api/users/:_id",
  remove({
    Collection: "users",
  })
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 📚 API Documentation

### `create(params)`

Creates a new document in the MongoDB collection.

**Parameters:**

| Parameter            | Type     | Required | Description                                              |
| -------------------- | -------- | -------- | -------------------------------------------------------- |
| `Database`           | string   | No       | Database name (uses `req.database` if not provided)      |
| `Collection`         | string   | No       | Collection name (auto-detected from URL if not provided) |
| `PathBaseFile`       | string   | No       | Base path for file uploads                               |
| `URL`                | string   | No       | Base URL for file access                                 |
| `AsyncFunctionAfter` | function | No       | Async function to execute after creation                 |
| `Middleware`         | boolean  | No       | If true, passes response to next middleware              |

**Example:**

```javascript
app.post(
  "/api/products",
  create({
    Database: "shop",
    Collection: "products",
    PathBaseFile: "./uploads",
    URL: "http://localhost:3000/files",
    AsyncFunctionAfter: async (req, res, data) => {
      console.log("Product created:", data.insertedId);
      // Send notification, update cache, etc.
    },
  })
);
```

**Request Body:**

```json
{
  "name": "Product Name",
  "price": 29.99,
  "description": "Product description",
  "_Assign": [
    {
      "categories": ["category_id_here"]
    }
  ]
}
```

**Response:**

```json
{
  "status": "ok",
  "message": "completed",
  "data": {
    "_id": "generated_id",
    "name": "Product Name",
    "price": 29.99,
    "description": "Product description",
    "datetime": "2025-09-26T10:30:00.000Z"
  }
}
```

---

### `read(params)`

Reads documents from the MongoDB collection.

**Parameters:**

Similar to `create()`.

**Example:**

```javascript
app.get(
  "/api/users",
  read({
    Collection: "users",
  })
);

// With query parameters
app.get(
  "/api/users/:_id",
  read({
    Collection: "users",
  })
);
```

---

### `update(params)`

Updates an existing document in the MongoDB collection.

**Parameters:**

Similar to `create()`.

**Example:**

```javascript
app.put(
  "/api/products/:_id",
  update({
    Collection: "products",
    AsyncFunctionAfter: async (req, res, data) => {
      console.log("Product updated");
    },
  })
);
```

**Request Body:**

```json
{
  "name": "Updated Product Name",
  "price": 39.99
}
```

---

### `remove(params)`

Soft deletes a document (marks as deleted).

**Parameters:**

| Parameter    | Type    | Required | Description                                 |
| ------------ | ------- | -------- | ------------------------------------------- |
| `Database`   | string  | No       | Database name                               |
| `Collection` | string  | No       | Collection name                             |
| `Middleware` | boolean | No       | If true, passes response to next middleware |

**Example:**

```javascript
app.delete(
  "/api/users/:_id",
  remove({
    Collection: "users",
  })
);
```

**Request Body (optional):**

```json
{
  "_Unassign": ["related_collection"],
  "_RecursiveDelete": ["child_collection"]
}
```

---

## 🔥 Advanced Features

### File Uploads

```javascript
const multer = require("multer");
const upload = multer({ dest: "temp/" });

app.post(
  "/api/products",
  upload.single("file"),
  create({
    Collection: "products",
    PathBaseFile: "./uploads",
    URL: "http://localhost:3000/files",
  })
);
```

The file will be automatically moved to:
`./uploads/{database}/{collection}/{document_id}/{filename}`

And the document will include:

```json
{
  "foto": "http://localhost:3000/files/mydb/products/123/image.jpg",
  "fotopath": "./uploads/mydb/products/123/image.jpg"
}
```

---

### Collection Assignments

When creating a document, you can automatically assign it to other collections:

```javascript
// Creating a user and assigning to groups
{
  "name": "John Doe",
  "email": "john@example.com",
  "_Assign": [
    {
      "groups": ["group_id_1", "group_id_2"]
    }
  ]
}
```

---

### Recursive Delete

When deleting a document, you can mark related documents as deleted:

```javascript
// Delete a user and mark all their posts as deleted
app.delete('/api/users/:_id', remove({
  Collection: 'users'
}));

// Request body:
{
  "_RecursiveDelete": ["posts", "comments"]
}
```

---

## 🛠️ Complete Example

Check out the [examples](./examples) folder for complete working examples.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for details about changes in each version.

---

## 📄 License

MIT © [Your Name]

---

## 🙏 Credits

This project is an improved and maintained version, originally forked from [apibuildingframeworkexpress](https://www.npmjs.com/package/apibuildingframeworkexpress).

Built with:

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [mongoclienteasywrapper](https://www.npmjs.com/package/mongoclienteasywrapper) - MongoDB operations wrapper
- [Multer](https://github.com/expressjs/multer) - File upload middleware

---

## 📞 Support

- 🐛 [Report a bug](https://github.com/YOUR_USERNAME/express-mongowrapper-api/issues)
- 💡 [Request a feature](https://github.com/YOUR_USERNAME/express-mongowrapper-api/issues)
- 📧 Email: your.email@example.com

---

**Made with ❤️ by developers, for developers**
