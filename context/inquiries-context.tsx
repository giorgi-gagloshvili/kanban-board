"use client";
import { TCard } from "@/lib/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type TContext = {
  inquiries: TCard[];
  setInquiries: Dispatch<SetStateAction<TCard[]>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  inquiryDetails: TCard | null;
  setInquiryDetails: Dispatch<SetStateAction<TCard | null>>;
};

const inqContext = createContext<null | TContext>(null);

export const InquiriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [inquiries, setInquiries] = useState<TCard[]>([]);
  const [inquiryDetails, setInquiryDetails] = useState<TCard | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <inqContext.Provider
      value={{
        inquiries,
        setInquiries,
        isOpen,
        setIsOpen,
        inquiryDetails,
        setInquiryDetails,
      }}
    >
      {children}
    </inqContext.Provider>
  );
};

export const useInquiriesContext = () => {
  const context = useContext(inqContext);
  if (!context) throw new Error("asd");
  return context;
};
