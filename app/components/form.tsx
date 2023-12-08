"use client";

import { createTodo } from "../utils/actions";
import { useRef } from "react";
import SubmitButton from "./submit-button";
import { useFormState } from "react-dom";

export default function TodoForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(createTodo, null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        // await createTodo(formData) //without useFormstate
        formAction(formData);
      }}
      className="flex flex-col"
    >
      <input
        type="text"
        name="input"
        className="border p-3 border-gray-800 rounded-md"
        placeholder="Write your todo..."
        autoComplete="off"
        required
      />

      <SubmitButton />
      <p className="text-red-500">{state as string}</p>
    </form>
  );
}
