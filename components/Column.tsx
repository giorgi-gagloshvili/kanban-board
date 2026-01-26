import React, { useEffect, useRef, useState } from "react";
import { TCard, TPhase } from "@/lib/types";
import Card from "./Card";
import { useInquiriesContext } from "@/context/inquiries-context";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { getData, updateData } from "@/lib/api";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const Column = ({
  cards,
  columnTitle,
  phase,
  color,
}: {
  cards: TCard[];
  columnTitle: string;
  phase: TPhase;
  color: string;
}) => {
  const refElement = useRef(null);
  const { setInquiries, inquiries, error } = useInquiriesContext();
  const [isDragged, setIsDragged] = useState<boolean>(false);

  useEffect(() => {
    const element = refElement.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      onDragEnter: () => {
        setIsDragged(true);
      },
      onDragLeave: () => {
        setIsDragged(false);
      },
      onDrop: ({ source, self }) => {
        setIsDragged(false);
        onUpdate(source.data.id as string, phase);
      },
    });
  }, []);

  const totalValue = cards.reduce(
    (total, item) => total + item.potentialValue,
    0,
  );

  const onUpdate = async (id: string, phase: TPhase) => {
    try {
      setInquiries((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              phase: phase,
            };
          } else {
            return item;
          }
        }),
      );
      await updateData(id, "inquiries", { phase });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        position: "bottom-center",
      });
    } finally {
      const response = await getData("/inquiries", "");
      setInquiries(response);
    }
  };

  return (
    <div
      className={cn(
        `bg-white border rounded-xl shadow flex-1 overflow-hidden flex-shrink-0`,
        isDragged ? "border-slate-400 bg-slate-50" : "border-slate-300",
      )}
      ref={refElement}
    >
      <div className="column-header p-4 border-b border-b-slate-300 bg-slate-100">
        <h2 className="text-lg text-gray-600 font-semibold flex items-center gap-x-2">
          <div className={cn(`w-2 h-2 rounded-full ${color}`)} />
          <span>{columnTitle}</span>
        </h2>
        <div className="flex justify-between">
          <p className="text-sm">Inquiries: {cards.length}</p>
          <p className="text-sm">Total Value: {totalValue}</p>
        </div>
      </div>
      {cards.length ? (
        <div className="column-body p-4 flex flex-col gap-y-3">
          {cards.map((card: TCard) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="flex items-center p-12 justify-center">
          <h3 className="text-xl uppercase">No Inquiries</h3>
        </div>
      )}
    </div>
  );
};

export default Column;
