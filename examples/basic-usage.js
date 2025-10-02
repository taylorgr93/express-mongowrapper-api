// examples/basic-usage.js
// Example of how to use express-mongowrapper-api

const express = require("express");
const { create, read, update, remove } = require("express-mongowrapper-api");

const app = express();
app.use(express.json());

// Middleware to attach database to request
app.use((req, res, next) => {
  req.database = "testdb"; // Your MongoDB database name
  next();
});

// CREATE endpoint
app.post(
  "/api/users",
  create({
    Collection: "users",
    AsyncFunctionAfter: async (req, res, data) => {
      console.log("User created:", data.insertedId);
    },
  })
);

// READ all users
app.get(
  "/api/users",
  read({
    Collection: "users",
  })
);

// READ single user
app.get(
  "/api/users/:_id",
  read({
    Collection: "users",
  })
);

// UPDATE user
app.put(
  "/api/users/:_id",
  update({
    Collection: "users",
  })
);

// DELETE user
app.delete(
  "/api/users/:_id",
  remove({
    Collection: "users",
  })
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Try: POST http://localhost:${PORT}/api/users`);
  console.log(`Body: {"name": "John Doe", "email": "john@example.com"}`);
});

module.exports = app;
