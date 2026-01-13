"use client";
import { useInquiriesContext } from "@/context/inquiries-context";
import { updateData } from "@/lib/api";
import { useState } from "react";
import { TPhase } from "@/lib/types";
const PHASES = [
  { name: "New", phase: "new" },
  { name: "Sent to Hotels", phase: "sent_to_hotels" },
  { name: "Offers Received", phase: "offers_received" },
  { name: "Completed", phase: "completed" },
];

const InquiryDetails = () => {
  const { inquiryDetails: details, setInquiries } = useInquiriesContext();
  const [selectedPhase, setSelectedPhase] = useState<TPhase | undefined>(
    undefined
  );

  return (
    <div className="text-gray-800">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold uppercase">
          {details?.clientName}
        </h2>
        <p className="text-blue-600 font-semibold">{details?.eventType}</p>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <div className="border-b pb-4">
          <div className="text-gray-700">
            Contact Person:{" "}
            <span className="font-semibold">{details?.contactPerson}</span>
          </div>
          <div className="text-gray-700">
            Total amount of Guests:{" "}
            <span className="font-semibold">{details?.guestCount}</span> people
          </div>
          <div className="text-gray-700">
            Potential Value:{" "}
            <span className="font-semibold">{details?.potentialValue}</span>{" "}
            people
          </div>
        </div>
        <div>
          <p className="text-[15px] font-semibold">Hotels</p>
          <ul className="flex flex-wrap gap-2 border-b pb-4">
            {details?.hotels.map((item) => (
              <li
                key={item}
                className="text-sm border border-slate-300 py-1 px-3 rounded-full bg-slate-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[15px] font-semibold">Notes</p>

          <ul className="flex flex-wrap gap-2 border-b pb-4">
            {details?.notes.split(",").map((item) => (
              <li
                key={item}
                className="text-sm border border-slate-300 py-1 px-3 rounded-full bg-slate-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full">
          <label htmlFor="update_inquiry text-[15px] font-medium">
            Update Inquiry
          </label>
          <select
            className="border p-2 w-full"
            name="phase"
            id="update_inquiry"
            value={selectedPhase ? selectedPhase : details?.phase}
            onChange={async (e) => {
              const value = e.target.value;
              setSelectedPhase(e.target.value as TPhase);

              if (details?.id) {
                setInquiries((prev) =>
                  prev.map((item) => {
                    if (item.id === details?.id) {
                      return {
                        ...item,
                        phase: value as TPhase,
                      };
                    } else {
                      return item;
                    }
                  })
                );

                await updateData(details?.id, "/inquiries", {
                  phase: value,
                });
              }
            }}
          >
            {PHASES.map((item) => (
              <option key={item.phase} value={item.phase}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetails;
