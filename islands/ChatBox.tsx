import { useEffect, useState } from "preact/hooks";
import { Message } from "../types.ts";

interface Props {
  chatId: string;
}

export default function ChatBox({ chatId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    if (!chatId) return;
    const res = await fetch(`https://back-a-p4.onrender.com/messages/chat/${chatId}`);
    const json = await res.json();
    setMessages(json.data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [chatId]);

  const sendMessage = async () => {
    if (!text.trim() || !chatId) return;
    const now = new Date().toISOString();

    const res = await fetch("https://back-a-p4.onrender.com/messages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        isContactMessage: false,
        content: text,
        timestamp: now,
      }),
    });

    if (res.ok) {
      setText("");
      fetchMessages();
    } else {
      const result = await res.json();
      alert(result?.error || "Error al enviar mensaje");
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto", background: "#f6f6f6" }}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              textAlign: msg.isContactMessage ? "left" : "right",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                background: msg.isContactMessage ? "#fff" : "#dcf8c6",
                borderRadius: "1rem",
                padding: "0.5rem 1rem",
                display: "inline-block",
                maxWidth: "60%",
                wordBreak: "break-word",
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", padding: "1rem", borderTop: "1px solid #ddd" }}>
        <input
          value={text}
          onInput={(e) => setText((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe tu mensaje"
          style={{ flex: 1, marginRight: "1rem", padding: "0.5rem", borderRadius: "1rem", border: "1px solid #ccc" }}
        />
        <button onClick={sendMessage} style={{ padding: "0.5rem 1rem", borderRadius: "1rem", background: "#25d366", color: "#fff", border: "none" }}>
          Enviar
        </button>
      </div>
    </div>
  );
}
