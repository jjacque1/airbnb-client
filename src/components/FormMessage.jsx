export default function FormMessage({ type, message }) {
  if (!message) return null;

  const className = type === "success" ? "form-success" : "form-error";

  return <p className={className}>{message}</p>;
}

