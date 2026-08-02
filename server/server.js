require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

process.on("exit", (code) => {
  console.log("Process exiting with code:", code);
});