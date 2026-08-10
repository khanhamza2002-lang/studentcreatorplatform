import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Search,
  Send,
  MessageCircle,
  User,
  ShoppingBag,
} from "lucide-react";

import Navbar from "../components/Navbar";
import "./Messages.css";

const API_URL =
  "https://extraordinary-embrace-production-5820.up.railway.app";

function Messages() {
  const { sellerId } = useParams();
  const [searchParams] = useSearchParams();

  const seller = searchParams.get("seller");
  const product = searchParams.get("product");

  const token = localStorage.getItem("token");

  const [receiverId, setReceiverId] = useState(
    sellerId || seller || ""
  );

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [conversations, setConversations] = useState([]);

  const [conversationSearch, setConversationSearch] =
    useState("");

  const [selectedName, setSelectedName] = useState("");

  const [loadingConversation, setLoadingConversation] =
    useState(false);

  const messagesEndRef = useRef(null);


  // ==========================================
  // LOAD SIDEBAR CONVERSATIONS
  // ==========================================

  const loadConversations = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/messages/conversations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setConversations(data.conversations);

        // If conversation was opened directly from product page,
        // try to find seller's name in conversation list
        if (receiverId) {
          const current = data.conversations.find(
            (conversation) =>
              String(conversation.other_user_id) ===
              String(receiverId)
          );

          if (current) {
            setSelectedName(current.other_user_name);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };


  // ==========================================
  // LOAD SELECTED CONVERSATION
  // ==========================================

  const loadConversation = async () => {
    if (!receiverId) return;

    try {
      setLoadingConversation(true);

      const response = await fetch(
        `${API_URL}/api/messages/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setLoadingConversation(false);
    }
  };


  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async () => {
    if (!receiverId || !message.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}/api/messages`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            receiver_id: receiverId,
            product_id: product || null,
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("");

        await loadConversation();
        await loadConversations();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };


  // ==========================================
  // SELECT CHAT
  // ==========================================

  const selectConversation = (conversation) => {
    setReceiverId(conversation.other_user_id);
    setSelectedName(conversation.other_user_name);
    setMessages([]);
  };


  // ==========================================
  // SEND WITH ENTER
  // ==========================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };


  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadConversations();
  }, []);


  // ==========================================
  // DIRECT SELLER LINK
  // ==========================================

  useEffect(() => {
    if (sellerId) {
      setReceiverId(sellerId);
    } else if (seller) {
      setReceiverId(seller);
    }
  }, [sellerId, seller]);


  // ==========================================
  // LOAD + REFRESH ACTIVE CHAT
  // ==========================================

  useEffect(() => {
    if (!receiverId) return;

    loadConversation();

    const interval = setInterval(() => {
      loadConversation();
    }, 2000);

    return () => clearInterval(interval);
  }, [receiverId]);


  // ==========================================
  // REFRESH SIDEBAR
  // ==========================================

  useEffect(() => {
    const interval = setInterval(() => {
      loadConversations();
    }, 5000);

    return () => clearInterval(interval);
  }, [receiverId]);


  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  // ==========================================
  // FILTER SIDEBAR
  // ==========================================

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.other_user_name
        ?.toLowerCase()
        .includes(conversationSearch.toLowerCase())
  );


  // ==========================================
  // HELPERS
  // ==========================================

  const getInitials = (name) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };


  const formatTime = (date) => {
    if (!date) return "";

    const messageDate = new Date(date);

    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  const formatConversationTime = (date) => {
    if (!date) return "";

    const messageDate = new Date(date);
    const today = new Date();

    if (
      messageDate.toDateString() === today.toDateString()
    ) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return messageDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };


  return (
    <>
      <Navbar />

      <main className="messages-page">

        <div className="messages-heading">
          <div>
            <span className="messages-label">
              CONVERSATIONS
            </span>

            <h1>Messages</h1>

            <p>
              Connect with buyers and student creators.
            </p>
          </div>
        </div>


        <div className="messages-container">

          {/* =====================================
              LEFT SIDEBAR
          ====================================== */}

          <aside className="chat-list">

            <div className="chat-list-header">
              <div>
                <h2>Inbox</h2>

                <span>
                  {conversations.length} conversations
                </span>
              </div>

              <MessageCircle size={22} />
            </div>


            <div className="chat-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search conversations..."
                value={conversationSearch}
                onChange={(e) =>
                  setConversationSearch(e.target.value)
                }
              />
            </div>


            <div className="conversation-list">

              {filteredConversations.length === 0 ? (
                <div className="no-conversations">
                  <MessageCircle size={35} />

                  <h3>No conversations yet</h3>

                  <p>
                    Message a seller from a product page to
                    start a conversation.
                  </p>
                </div>
              ) : (
                filteredConversations.map((conversation) => (

                  <button
                    key={conversation.other_user_id}
                    className={`chat-item ${
                      String(receiverId) ===
                      String(conversation.other_user_id)
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      selectConversation(conversation)
                    }
                  >

                    <div className="chat-avatar">
                      {getInitials(
                        conversation.other_user_name
                      )}
                    </div>


                    <div className="chat-preview">

                      <div className="chat-preview-top">

                        <h3>
                          {conversation.other_user_name}
                        </h3>

                        <span>
                          {formatConversationTime(
                            conversation.last_message_time
                          )}
                        </span>

                      </div>


                      <p>
                        {conversation.last_message}
                      </p>

                    </div>

                  </button>

                ))
              )}

            </div>

          </aside>


          {/* =====================================
              RIGHT CHAT WINDOW
          ====================================== */}

          <section className="chat-window">

            {!receiverId ? (

              <div className="empty-chat">

                <div className="empty-chat-icon">
                  <MessageCircle size={42} />
                </div>

                <h2>Your messages</h2>

                <p>
                  Select a conversation from the left to
                  start chatting.
                </p>

              </div>

            ) : (

              <>

                {/* CHAT HEADER */}

                <div className="chat-header">

                  <div className="chat-header-user">

                    <div className="chat-avatar large">
                      {getInitials(selectedName)}
                    </div>

                    <div>
                      <h2>
                        {selectedName || "Conversation"}
                      </h2>

                      <span>
                        Student Marketplace
                      </span>
                    </div>

                  </div>


                  {product && (
                    <div className="product-context">
                      <ShoppingBag size={17} />
                      Product #{product}
                    </div>
                  )}

                </div>


                {/* MESSAGES */}

                <div className="messages">

                  {loadingConversation &&
                  messages.length === 0 ? (

                    <div className="chat-status">
                      Loading conversation...
                    </div>

                  ) : messages.length === 0 ? (

                    <div className="start-conversation">

                      <div className="empty-chat-icon small">
                        <User size={30} />
                      </div>

                      <h3>Start the conversation</h3>

                      <p>
                        Send a message below to begin chatting.
                      </p>

                    </div>

                  ) : (

                    messages.map((msg) => {

                      const isSent =
                        String(msg.sender_id) !==
                        String(receiverId);

                      return (
                        <div
                          key={msg.id}
                          className={`message-row ${
                            isSent
                              ? "message-row-sent"
                              : "message-row-received"
                          }`}
                        >

                          <div
                            className={`message ${
                              isSent
                                ? "sent"
                                : "received"
                            }`}
                          >

                            <p>{msg.message}</p>

                            <span className="message-time">
                              {formatTime(msg.created_at)}
                            </span>

                          </div>

                        </div>
                      );

                    })

                  )}

                  <div ref={messagesEndRef} />

                </div>


                {/* MESSAGE INPUT */}

                <div className="message-input">

                  <textarea
                    rows="1"
                    placeholder="Write a message..."
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                  />

                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    title="Send message"
                  >
                    <Send size={20} />
                  </button>

                </div>

              </>

            )}

          </section>

        </div>

      </main>
    </>
  );
}

export default Messages;