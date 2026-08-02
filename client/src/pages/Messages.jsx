import "./Messages.css";
import Navbar from "../components/Navbar";

function Messages() {
  return (
    <>
      <Navbar />

      <div className="messages-container">
        <div className="chat-list">
          <h2>Chats</h2>

          <div className="chat-item">
            <strong>Ali Khan</strong>
            <p>Is this product still available?</p>
          </div>

          <div className="chat-item">
            <strong>Sarah Ahmed</strong>
            <p>Can you lower the price?</p>
          </div>
        </div>

        <div className="chat-window">
          <h2>Conversation</h2>

          <div className="messages">
            <div className="message received">
              Hi! Is this still available?
            </div>

            <div className="message sent">
              Yes, it's available.
            </div>
          </div>

          <div className="message-input">
            <input
              type="text"
              placeholder="Type a message..."
            />

            <button>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;