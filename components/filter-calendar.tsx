import React, { useState } from "react";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { DateRange, DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import "react-day-picker/style.css";
import { format } from "date-fns";
import Button from "./Button";

type TDateRange = {
  startDate: string | undefined;
  endDate: string | undefined;
};

const FilterCalendar = ({
  placeholder,
  value,
  onSelect,
}: {
  placeholder: string;
  value: { from: Date; to: Date } | undefined;
  onSelect: (dates: TDateRange | undefined) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dates, setDates] = useState<DateRange | undefined>(undefined);
  const selectRef = useOutsideClick(() => {
    setIsVisible(false);
  });

  let footer = value
    ? `${format(value?.from, "LLL dd, yyyy")} - ${format(
        value?.to,
        "LLL dd, yyyy",
      )}`
    : "Please select the first day.";

  const handler = (value: DateRange | undefined) => {
    setDates(value);
    if (value && value.from && value.to) {
      const date = {
        startDate: format(value?.from, "yyyy-MM-dd"),
        endDate: format(value?.to, "yyyy-MM-dd"),
      };

      console.log({ date }, "phrialo");
      onSelect(date);
    }
  };

  return (
    <div ref={selectRef} className={`relative w-full z-50`}>
      <div
        tabIndex={0}
        className={cn(
          `flex-center w-full lg:w-64 bg-white hover:bg-gray-light gap-x-2 cursor-pointer border focus:border-blue-600 border-gray-300 shadow-sm py-2 px-4 rounded-md`,
        )}
        onClick={() => setIsVisible(!isVisible)}
      >
        <span
          className={cn(
            "text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden text-sm",
            value ? "w-28" : "w-auto",
          )}
        >
          {value && value.from && value.to
            ? `${format(value.from, "LLL dd, yyyy")} - ${format(
                value.to,
                "LLL dd, yyyy",
              )}`
            : placeholder}
        </span>
      </div>
      {isVisible && (
        <div className="absolute top-12 right-0 w-[43rem]">
          <DayPicker
            className={cn(
              "bg-white w-full inline-block p-4 rounded-xl border border-slate-300 shadow-sm",
            )}
            classNames={{
              selected: `bg-red-600 text-gray-500`,
              chevron: `fill-gray-600`,
            }}
            mode="range"
            showOutsideDays
            selected={value}
            onSelect={(value) => handler(value)}
            numberOfMonths={2}
            footer={
              <div className="flex items-center justify-between mt-4 border-t pt-3">
                <div className="flex gap-x-2">
                  <Button
                    type="button"
                    className="cursor-pointer py-2 px-5 text-[15px] text-white rounded-lg"
                    onClick={() => setIsVisible(false)}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    className="cursor-pointer px-5 bg text-[15px] bg-white border text-black py-2 rounded-lg hover:bg-slate-100"
                    onClick={() => {
                      onSelect(undefined);
                    }}
                  >
                    Reset
                  </Button>
                </div>
                <p className="text-sm font-tbc-medium">{footer}</p>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default FilterCalendar;
