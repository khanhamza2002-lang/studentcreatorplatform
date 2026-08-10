const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  sendMessage,
  getConversation,
  getConversations,
} = require("../controllers/messageController");


// Send a message
router.post(
  "/",
  authMiddleware,
  sendMessage
);


// Get conversation list
// IMPORTANT: this must come BEFORE /:userId
router.get(
  "/conversations",
  authMiddleware,
  getConversations
);


// Get messages between logged-in user and another user
router.get(
  "/:userId",
  authMiddleware,
  getConversation
);


module.exports = router;