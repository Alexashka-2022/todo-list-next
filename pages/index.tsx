import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setTasks } from "@/store/taskSlice";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
        if (!response.ok) {
          throw new Error(`Ошибка получения данных, статус: ${response.status}`);
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  dispatch(setTasks(todos));

  return (
    <>
      <h1>Приложение для заметок "To-Do-List"</h1>
      {<ul>
        {todos.map((item) => {
          return (
            <li key={item.id}>
              <p>{item.id}</p>
              <Link href={{
                pathname: `/todos/${item.id}`,
                query: {
                  id: item.id,
                  title: item.title,
                  completed: item.completed
                }
              }}>{item.title}</Link>
              <strong>{item.completed ? 'Да' : 'Нет'}</strong>
            </li>
          )
        })}
      </ul>
      }
    </>
  );
}