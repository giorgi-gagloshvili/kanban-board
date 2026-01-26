"use client";

import React, { useEffect, useState } from "react";
import Column from "./Column";
import { TColumn } from "@/lib/types";
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

const Board = () => {
  const { inquiries, setInquiries, error, setError, isPending, setIsPending } =
    useInquiriesContext();

  useEffect(() => {
    const getInquiries = async () => {
      setIsPending(true);
      try {
        const response = await getData("/inquiries", location?.search);
        setInquiries(response);
      } catch (err: any) {
        setError(err.message || "Failed to fetch");
      } finally {
        setIsPending(false);
      }
    };

    getInquiries();
  }, []);

  const getCards = (phase: string) => {
    return inquiries.filter((card) => card.phase === phase);
  };

  if (isPending) {
    return (
      <div className="absolute top-0 left-0 w-full h-screen bg-white z-50 flex items-center justify-center">
        <div className="animate-spin">
          <ImSpinner8 size={30} className="text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border p-5 bg-red-100 border-red-400 rounded-lg text-red-500 font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <Filter />
      {inquiries.length ? (
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
