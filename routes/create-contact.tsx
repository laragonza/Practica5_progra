import CreateContactForm from "../islands/CreateContactForm.tsx";

export default function Page() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Nuevo contacto</h2>
      <CreateContactForm />
    </div>
  );
}
