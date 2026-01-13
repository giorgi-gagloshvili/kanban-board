import React, { useState } from "react";
import Button from "./Button";
import { getData } from "@/lib/api";
import { useInquiriesContext } from "@/context/inquiries-context";
import FilterCalendar from "./filter-calendar";
import { LuLoaderCircle } from "react-icons/lu";
type TForm = {
  clientName?: string;
  potentialValue?: string;
  startDate: string | undefined;
  endDate: string | undefined;
};

const Filter = () => {
  const { setInquiries } = useInquiriesContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<TForm>({
    clientName: "",
    potentialValue: "",
    startDate: undefined,
    endDate: undefined,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const onDateChange = (name: string, dates: any) => {
    setFormFields({
      ...formFields,
      startDate: dates.startDate,
      endDate: dates.endDate,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await getData("/inquiries", formFields);
    setInquiries(response);
    setIsLoading(false);
  };

  const onReset = async () => {
    const response = await getData("/inquiries", {});
    setInquiries(response);
    setFormFields({
      clientName: "",
      potentialValue: "",
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <div className="bg-slate-50 shadow border-default py-4 px-6 rounded-lg flex gap-x-2">
      {/* {JSON.stringify(formFields)} */}
      <form className="flex justify-between w-full" onSubmit={onSubmit}>
        <div className="flex gap-x-4">
          <div>
            <input
              type="text"
              className="px-4 py-2 border border-slate-400 outline-none rounded-md shadow-sm bg-white"
              name="clientName"
              placeholder="client name"
              value={formFields?.clientName}
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="px-4 py-2 border border-slate-400 outline-none rounded-md shadow-sm bg-white"
              name="potentialValue"
              placeholder="Value"
              value={formFields?.potentialValue}
              onChange={onChange}
            />
          </div>
          <div>
            <FilterCalendar
              placeholder={"Choose Date"}
              value={
                formFields.startDate && formFields.endDate
                  ? {
                      from: new Date(formFields.startDate),
                      to: new Date(formFields.endDate),
                    }
                  : undefined
              }
              onSelect={onDateChange}
              onClose={undefined}
              resetDates={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button type={"submit"} className="flex px-6 text-sm">
            <div className="flex justify-center items-center gap-x-2">
              {isLoading && <LuLoaderCircle className="animate-spin" />}
              Filter
            </div>
          </Button>
          <Button
            onClick={onReset}
            type="button"
            className="bg-white text-black px-6 border-default hover:bg-white"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
