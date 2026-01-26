import React, { useState } from "react";
import Button from "./Button";
import { getData } from "@/lib/api";
import { useInquiriesContext } from "@/context/inquiries-context";
import FilterCalendar from "./filter-calendar";
import { LuLoaderCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { getQueryString } from "@/lib/utils";
type TForm = {
  clientName?: string;
  potentialValue?: string;
  startDate: string | undefined;
  endDate: string | undefined;
};

const Filter = () => {
  const router = useRouter();
  const { setInquiries } = useInquiriesContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<TForm>({
    clientName: "",
    potentialValue: "",
    startDate: undefined,
    endDate: undefined,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "potentialValue") {
      value = value.replace(/\D/g, "");
    }
    setFormFields({ ...formFields, [e.target.name]: value });
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
    const query = getQueryString(formFields);
    const response = await getData("/inquiries", query);
    setInquiries(response);
    router.push(query);
    setIsLoading(false);
  };

  const onReset = async () => {
    const response = await getData("/inquiries", "");
    setInquiries(response);
    router.push("/");
    setFormFields({
      clientName: "",
      potentialValue: "",
      startDate: undefined,
      endDate: undefined,
    });
  };

  const getFieldsLength = () => {
    return Object.values(formFields).filter(Boolean).length === 0;
  };

  return (
    <div className="bg-slate-50 shadow border-default py-4 px-6 rounded-lg flex gap-x-2">
      {/* {JSON.stringify(formFields)} */}
      <form
        className="flex flex-col lg:flex-row justify-between w-full gap-y-4 flex-wrap"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col lg:flex-row flex-wrap gap-4">
          <div className="flex-1">
            <input
              type="text"
              className="px-4 w-full py-2 border border-slate-400 outline-none rounded-md shadow-sm bg-white"
              name="clientName"
              placeholder="client name"
              value={formFields?.clientName}
              onChange={onChange}
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="px-4 w-full py-2 border border-slate-400 outline-none rounded-md shadow-sm bg-white"
              name="potentialValue"
              placeholder="Value"
              value={formFields?.potentialValue}
              onChange={onChange}
            />
          </div>
          <div className="flex-1">
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
            disabled={getFieldsLength()}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
