import { useState } from "preact/hooks";
import ContactList from "./ContactList.tsx";
import ChatBox from "./ChatBox.tsx";
import { Contact } from "../types.ts";

export default function MessengerApp() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ width: "20%", overflowY: "auto", borderRight: "1px solid #ccc", background: "#f0f0f0" }}>
        <a href="/create-contact">
          <button style={{ width: "100%", padding: "1rem", background: "#25d366", color: "#fff", border: "none", borderRadius: "0", fontWeight: "bold" }}>
            Crear contacto
          </button>
        </a>
        <ContactList onSelect={setSelectedContact} selectedId={selectedContact?._id || null} />
      </div>
      <div style={{ width: "80%", position: "relative" }}>
        {selectedContact
          ? <ChatBox chatId={selectedContact.chatId} />
          : <div style={{ padding: "2rem", color: "#888" }}>Selecciona un contacto para chatear.</div>
        }
      </div>
    </div>
  );
}
