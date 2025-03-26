import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenName("");
      setIsClosing(false);
    }, 150);
  };

  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open, isClosing }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close, isClosing } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  // Renderujemy modal, jeśli jest otwarty lub w trakcie zamykania
  if (name !== openName && !isClosing) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-white backdrop-blur-sm">
      <div
        ref={ref}
        className={`relative rounded-lg bg-dark-lightbg p-8 shadow-lg transition-all duration-300 ease-in-out ${
          isClosing ? "animate-modalDisappear" : "animate-modalAppear"
        }`}
      >
        <button
          onClick={close}
          className="absolute right-2 top-2 rounded-md p-1.5 transition hover:text-red-500"
        >
          ✕
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
