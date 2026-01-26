"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-50 border mb-2 border-red-200 rounded-lg">
      <h2 className="text-2xl text-red-500">ERROR</h2>
      <h4>Something went wrong!</h4>
      <p className="text-sm mt-2 text-red-600">{error.message}</p>
    </div>
  );
}
