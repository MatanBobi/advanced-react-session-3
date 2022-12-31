import React from "react";

type ModalContext = [
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
];

export const ModalContext = React.createContext<ModalContext | null>(null);

export function Modal(props: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const value = [isOpen, setIsOpen];

  return <ModalContext.Provider value={value} {...props} />;
}
