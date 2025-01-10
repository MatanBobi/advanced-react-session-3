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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="shadow-xl p-4 rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black block">
      <button onClick={closeModal}>X</button>
      <div className="modal-content">{children}</div>
    </div>
  );
}
