const pool = require("../config/db");

// Send Message
const sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;

    const {
      receiver_id,
      product_id,
      message,
    } = req.body;

    if (!receiver_id || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    await pool.query(
      `INSERT INTO messages
      (sender_id, receiver_id, product_id, message)
      VALUES ($1,$2,$3,$4)`,
      [
        sender_id,
        receiver_id,
        product_id,
        message,
      ]
    );

    res.json({
      success: true,
      message: "Message sent",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Conversation
const getConversation = async (req, res) => {
  try {
    const currentUser = req.user.id;

    const otherUser = req.params.userId;

    const result = await pool.query(
      `SELECT
        messages.*,
        users.full_name
      FROM messages
      JOIN users
      ON users.id = messages.sender_id
      WHERE
      (sender_id=$1 AND receiver_id=$2)
      OR
      (sender_id=$2 AND receiver_id=$1)
      ORDER BY created_at ASC`,
      [currentUser, otherUser]
    );

    res.json({
      success: true,
      messages: result.rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendMessage,
  getConversation,
};