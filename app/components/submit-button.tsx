"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-blue-500 rounded-lg mt-2 text-black py-2 disabled:bg-gray-300"
      type="submit"
    >
      {pending ? "Adding..." : "Add"}
    </button>
  );
}
