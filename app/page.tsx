import { CheckSquare, SquareIcon } from "lucide-react";
import TodoForm from "./components/form";
import {
  deleteTodo,
  editTodo,
  getTodos,
  toggleTodoAction,
} from "./utils/actions";

export default async function Home() {
  const todos = await getTodos();

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border rounded-lg shadow-xl p-10 w-[30vw]">
        <TodoForm />

        <div className="mt-5 flex flex-col gap-y-2">
          {todos?.length ? (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="w-full h-full flex items-center  justify-center"
              >
                <form action={toggleTodoAction.bind(null, todo.id)}>
                  <button>
                    {todo.completed ? (
                      <CheckSquare className="mt-2" />
                    ) : (
                      <SquareIcon className="mt-2" />
                    )}
                  </button>
                </form>
                <form className="flex space-x-2" action={editTodo}>
                  <input type="hidden" name="inputId" value={todo.id} />
                  <input
                    type="text"
                    name="content"
                    defaultValue={todo.content}
                    className="border p-1 rounded-md  border-gray-300 focus:border-blue-300"
                    autoComplete="off"
                  />

                  <button
                    type="submit"
                    className="border border-gray-300  bg-green-400 rounded-md w-16"
                  >
                    Edit
                  </button>

                  <button
                    formAction={deleteTodo}
                    className="border border-gray-300  bg-red-400 rounded-md w-16"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))
          ) : (
            <p className="text-center">No Todos to display</p>
          )}
        </div>
      </div>
    </div>
  );
}
