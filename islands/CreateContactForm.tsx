import { useState } from "preact/hooks";

export default function CreateContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const res = await fetch("https://back-a-p4.onrender.com/contacts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.status === 201) {
      window.location.href = "/";
    } else if (res.status === 409) {
      setError("El correo ya está registrado.");
    } else {
      setError(data?.error || "Error al crear contacto.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <input
        placeholder="Nombre"
        value={form.name}
        onInput={(e) => setForm({ ...form, name: (e.target as HTMLInputElement).value })}
      />
      <input
        placeholder="Correo"
        type="email"
        value={form.email}
        onInput={(e) => setForm({ ...form, email: (e.target as HTMLInputElement).value })}
      />
      <input
        placeholder="Teléfono"
        value={form.phone}
        onInput={(e) => setForm({ ...form, phone: (e.target as HTMLInputElement).value })}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "1rem", background: "#25d366", color: "#fff", border: "none" }}>
        Crear contacto
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
