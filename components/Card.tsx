import { TCard, TPhase } from "@/lib/types";
import React, { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
// import {
//   attachClosestEdge,
//   extractClosestEdge,
//   Edge,
// } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import { cn, formatTimeAgo } from "@/lib/utils";
import { useInquiriesContext } from "@/context/inquiries-context";
import { updateData } from "@/lib/api";

const Card = ({ card }: { card: TCard }) => {
  const { clientName, id, phase, guestCount, createdAt } = card;
  const { setIsOpen, setInquiryDetails } = useInquiriesContext();
  const ref = useRef(null);
  const [isDragged, setIsDragged] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return draggable({
      element,
      getInitialData: () => ({ id, type: "card" }),
      onDragStart() {
        setIsDragged(true);
        // console.log("dragged");
      },
      onDrop() {
        setIsDragged(false);
      },
    });
  }, []);

  return (
    <div
      className={cn(
        `flex flex-col gap-y-2 border p-4 rounded-xl cursor-pointer shadow hover:bg-slate-100`,
        isDragged ? "opacity-0" : ""
      )}
      ref={ref}
      onClick={() => {
        setIsOpen(true);
        setInquiryDetails(card);
      }}
      // onClick={() => onUpdate(id, "completed")}
    >
      <h2 className="text-[17px] font-semibold text-gray-800">{clientName}</h2>

      <div className="flex text-[15px]">Participants: {guestCount} guests</div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm">Guests: {guestCount}</span>
        <span className="rounded-full bg-slate-100 border-default px-4 py-1 text-sm w-fit">
          {formatTimeAgo(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Card;
