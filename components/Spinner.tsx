"use client";

import { ImSpinner8 } from "react-icons/im";

export const Spinner = () => {
  return (
    <div className="animate-spin">
      <ImSpinner8 size={30} className="text-blue-600" />
    </div>
  );
};
