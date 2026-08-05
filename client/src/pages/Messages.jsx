import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Messages() {
  const { sellerId } = useParams();
  const params = new URLSearchParams(window.location.search);

  const seller = params.get("seller");
  const product = params.get("product");

  const [receiverId, setReceiverId] = useState(
  sellerId || seller || ""
);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  const loadConversation = async () => {
    if (!receiverId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${receiverId}`,
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  loadConversation();

  const interval = setInterval(() => {
    loadConversation();
  }, 2000);

  return () => clearInterval(interval);
}, [receiverId]);
  
  useEffect(() => {
  if (sellerId) {
    setReceiverId(sellerId);
  }
}, [sellerId]);

  const sendMessage = async () => {
    if (!receiverId || !message.trim()) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiver_id: receiverId,
            product_id: product,
            message,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("");
        loadConversation();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
  💬 Messages
</h1>

   

        <div className="bg-white rounded-2xl shadow-lg h-[500px] overflow-y-auto p-6 mb-6">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
  <h2 className="text-2xl font-bold">
    💬 No messages yet
  </h2>

  <p className="mt-3">
    Start the conversation with the seller.
  </p>
</div>
          ) : (
            messages.map((msg) => (
              <div className="bg-white rounded-2xl shadow-lg h-[500px] overflow-y-auto p-6 mb-6">
                <h3 className="font-bold text-blue-700">
  {msg.full_name}
</h3>

                <p>{msg.message}</p>

               <p className="text-xs text-gray-400 mt-2">
  {new Date(msg.created_at).toLocaleString()}
</p>
              </div>
            ))
          )}
        </div>

        <textarea
  rows="4"
  placeholder="Type your message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="w-full border rounded-xl p-4"
/>

       <button
  onClick={sendMessage}
  className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
>
  Send Message
</button>
      </div>
    </>
  );
}

export default Messages;