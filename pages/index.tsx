import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "@/store/taskSlice";
import { RootState, AppDispatch } from '@/store';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state.tasks.list)

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

  //Обработчик удаления задачи
  const handleDeleteItem = () => {

  }

  //Обработчик изменения статуса задачи
  const handleCompleteItem = () => {

  }

  return (
    <>
      <h1>Приложение для заметок "To-Do-List"</h1>
      <button>
        <Link href={`/add-task`}>Добавить новый элемент</Link>
      </button>
      {<ul>
        {allTasks.map((item) => {
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
              <button type="button" className="element__complete-button" onClick={handleCompleteItem}>Выполнено</button>
              <button onClick={handleDeleteItem}>Удалить</button>
            </li>
          )
        })}
      </ul>
      }
    </>
  );
}