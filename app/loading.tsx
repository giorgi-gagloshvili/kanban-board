import { Spinner } from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center h-screen">
      <Spinner />
    </div>
  );
}
