"use client";

import React, { useEffect, useState } from "react";
import Column from "./Column";
import { TCard, TColumn } from "@/lib/types";
import { useInquiriesContext } from "@/context/inquiries-context";
import Modal from "./Modal";
import InquiryDetails from "./inquiry-details";
import Filter from "./Filter";
import { ImSpinner8 } from "react-icons/im";
import { getData } from "@/lib/api";

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

const Board = ({ data }: { data: TCard[] }) => {
  const { inquiries, setInquiries } = useInquiriesContext();

  useEffect(() => {
    setInquiries(data);
  }, []);

  const getCards = (phase: string) => {
    return inquiries.filter((card) => card.phase === phase);
  };

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <Filter />
      {inquiries ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 ">
          {columns.map((column) => (
            <Column
              key={column.id}
              color={column.color}
              phase={column.phase}
              cards={getCards(column.phase)}
              columnTitle={column.name}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-32 mt-8 border border-slate-300 bg-slate-50 h-full rounded-xl">
          No inquiries
        </div>
      )}
      <Modal>
        <InquiryDetails />
      </Modal>
    </div>
  );
};

export default Board;
