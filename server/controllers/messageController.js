const pool = require("../config/db");

// ==========================================
// SEND MESSAGE
// ==========================================

const sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;

    const {
      receiver_id,
      product_id,
      message,
    } = req.body;

    if (!receiver_id || !message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    await pool.query(
      `INSERT INTO messages
      (sender_id, receiver_id, product_id, message)
      VALUES ($1, $2, $3, $4)`,
      [
        sender_id,
        receiver_id,
        product_id || null,
        message.trim(),
      ]
    );

    res.json({
      success: true,
      message: "Message sent",
    });
  } catch (err) {
    console.error("SEND MESSAGE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// GET ONE CONVERSATION
// ==========================================

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
        (sender_id = $1 AND receiver_id = $2)
        OR
        (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC`,
      [currentUser, otherUser]
    );

    res.json({
      success: true,
      messages: result.rows,
    });
  } catch (err) {
    console.error("GET CONVERSATION ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// GET ALL CONVERSATIONS FOR LOGGED-IN USER
// ==========================================

const getConversations = async (req, res) => {
  try {
    const currentUser = req.user.id;

    const result = await pool.query(
      `
      SELECT DISTINCT ON (other_user_id)
        other_user_id,
        other_user_name,
        message AS last_message,
        created_at AS last_message_time,
        product_id
      FROM (
        SELECT
          CASE
            WHEN m.sender_id = $1 THEN m.receiver_id
            ELSE m.sender_id
          END AS other_user_id,

          CASE
            WHEN m.sender_id = $1 THEN receiver.full_name
            ELSE sender.full_name
          END AS other_user_name,

          m.message,
          m.created_at,
          m.product_id

        FROM messages m

        JOIN users sender
          ON sender.id = m.sender_id

        JOIN users receiver
          ON receiver.id = m.receiver_id

        WHERE
          m.sender_id = $1
          OR m.receiver_id = $1
      ) conversations

      ORDER BY
        other_user_id,
        created_at DESC
      `,
      [currentUser]
    );

    // Sort final conversation list by newest message
    const conversations = result.rows.sort(
      (a, b) =>
        new Date(b.last_message_time) -
        new Date(a.last_message_time)
    );

    res.json({
      success: true,
      conversations,
    });
  } catch (err) {
    console.error("GET CONVERSATIONS ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  sendMessage,
  getConversation,
  getConversations,
};