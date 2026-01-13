"use client";

import React, { useEffect, useState } from "react";
import Column from "./Column";
import { TCard, TColumn } from "@/lib/types";
import { useInquiriesContext } from "@/context/inquiries-context";
import Modal from "./Modal";
import InquiryDetails from "./inquiry-details";
import Filter from "./Filter";

const columns: TColumn[] = [
  { id: 1, name: "New", phase: "new", color: "bg-blue-500" },
  {
    id: 2,
    name: "Sent to hotels",
    phase: "sent_to_hotels",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Offers Received",
    phase: "offers_received",
    color: "bg-orange-400",
  },
  { id: 4, name: "Completed", phase: "completed", color: "bg-green-500" },
];

const Board = () => {
  const { inquiries, setInquiries } = useInquiriesContext();
  const [cards, setCards] = useState<TCard[]>([]);
  useEffect(() => {
    const getInquiries = async () => {
      const response = await fetch("http://localhost:3000/api/inquiries");
      const json = await response.json();
      console.log(json);
      setInquiries(json);
    };
    getInquiries();
  }, []);

  const getCards = (phase: string) => {
    return inquiries.filter((card) => card.phase === phase);
  };

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <Filter />
      <div className="flex flex-wrap gap-x-4 items-start mt-8 w-[1280px] ">
        {columns.map((column, index) => (
          <Column
            key={column.id}
            color={column.color}
            phase={column.phase}
            cards={getCards(column.phase)}
            columnTitle={column.name}
          />
        ))}
      </div>
      <Modal>
        <InquiryDetails />
      </Modal>
    </div>
  );
};

export default Board;
