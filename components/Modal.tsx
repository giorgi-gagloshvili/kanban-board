import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useInquiriesContext } from "@/context/inquiries-context";
import { cn } from "@/lib/utils";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useInquiriesContext();

  const handleClose = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "modal-container" || target.id === "close-btn") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={cn(
        `fixed top-0 left-0 z-50 w-full flex justify-end h-screen`,
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      <div
        className={`h-full w-full absolute top-0 left-0 bg-black/20 z-[1010] item-transition`}
        onClick={handleClose}
        id="modal-container"
      ></div>
      <div
        className={`${
          isOpen ? "lg:translate-x-0" : "lg:translate-x-[100%]"
        } h-auto w-96 relative z-[1020] bg-white borde p-6`}
      >
        <div className="flex justify-between pb-5 mb-4 border-b border-slate-300">
          <h2 className="text-lg">{"Details"}</h2>
          <button
            className="p-1"
            id="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <TfiClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
