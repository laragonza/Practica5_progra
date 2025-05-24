import { useEffect, useState } from "preact/hooks";
import { Contact } from "../types.ts";

interface Props {
  onSelect: (contact: Contact) => void;
  selectedId: string | null;
}

export default function ContactList({ onSelect, selectedId }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("https://back-a-p4.onrender.com/contacts/")
      .then((res) => res.json())
      .then((data) => setContacts(data.data));
  }, []);

  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {contacts.map((c) => (
        <li
          key={c._id}
          style={{
            padding: "1rem",
            borderBottom: "1px solid #ccc",
            background: c._id === selectedId ? "#e0ffe0" : "transparent",
            cursor: "pointer",
          }}
          onClick={() => onSelect(c)}
        >
          <div><strong>{c.name}</strong></div>
          <div>{c.email}</div>
          <div>{c.phone}</div>
        </li>
      ))}
    </ul>
  );
}
