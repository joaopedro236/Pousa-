import "./Chatbot.css";
import { useState, useEffect } from "react";
import iconGemini from "../../assets/gemini.png";
import sendMessage from "../../Requests/sendMessageChatbot";
export default function Chatbot({ selectedTrip, userData, user }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const end =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (end) {
        setAnimate(true);
      } else {
        setAnimate(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [message, setMessage] = useState("");
  const [quantityMessage, setQuantityMessage] = useState(0);
  const [chatbotActive, setChatBotActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        className={`chatbotBtn bg-primary ${chatbotActive || !user ? "remove" : ""} ${animate ? "animation" : ""}`}
        onClick={() => {
          setChatBotActive(true);
        }}
      >
        <img src={iconGemini} alt="iconGemini" loading="lazy" />
      </button>
      <aside className={`chatbot ${chatbotActive ? "active" : ""}`}>
        <header>
          <button
            onClick={() => {
              setChatBotActive(false);
            }}
          >
            X
          </button>
        </header>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <p>{msg.role === "user" ? "You:" : "Gemini:"}</p>
              <p>{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div>
              <p>IA: </p>
              <p>🤖 Typing...</p>
            </div>
          )}
        </div>
        <form onSubmit={(e) => (sendMessage(e, setMessage, setMessages, setLoading, message, userData, selectedTrip, quantityMessage, setQuantityMessage))}>
          <input
            type="text"
            placeholder="Type a question"
            value={message}
            minLength={2}
            maxLength={1600}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="submit"
            className="btn btn-primary"
            disabled={message.trim().length < 2 || loading}
            value="Send"
          />
        </form>
      </aside>
    </>
  );
}
