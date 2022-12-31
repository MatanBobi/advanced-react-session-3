import { useModal } from "./useModal";

export function ModalContent({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [isOpen, setIsOpen] = useModal();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      style={{
        padding: "15px",
        boxShadow: "3px 3px 5px 6px #ccc",
        borderRadius: "10px",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: `${isOpen ? "block" : "none"}`,
        backgroundColor: "black",
      }}
    >
      <button onClick={closeModal}>X</button>
      <div className="modal-content">{children}</div>
    </div>
  );
}
