import Link from 'next/link';
import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
        if (!response.ok) {
          throw new Error(`Failed to fetch data, status: ${response.status}`);
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
              <strong>{item.completed ? 'Completed' : 'Pending'}</strong>
            </li>
          )
        })}
      </ul>
      }
    </>
  );
}