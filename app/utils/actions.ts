"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import db from "./db";

export async function getTodos() {
  noStore();

  const todos = await db.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return todos;
}

export async function createTodo(prevState: any, formData: FormData) {
  try {
    const content = formData.get("input") as string;

    await db.todo.create({
      data: {
        content: content,
      },
    });

    revalidatePath("/");
  } catch (error) {
    return "Failed to Create";
  }
}

export async function editTodo(formData: FormData) {
  const content = formData.get("content") as string;
  const inputId = formData.get("inputId") as string;

  await db.todo.update({
    where: {
      id: inputId,
    },
    data: {
      content: content,
    },
  });

  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  await db.todo.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath("/");
}

export async function toggleTodoAction(id: string) {
  const todo = await db.todo.findFirst({
    where: {
      id: id,
    },
  });

  await db.todo.update({
    where: {
      id: todo?.id,
    },
    data: {
      completed: !todo?.completed,
    },
  });

  revalidatePath("/");
}
