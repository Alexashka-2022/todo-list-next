import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeStatus, deleteTask, setTasks } from "@/store/taskSlice";
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
        dispatch(setTasks(todos));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };
    if (allTasks.length === 0) {
      getData();
    } else {
      setLoading(false);
    }
  }, [allTasks, dispatch]);



  if (loading) {
    return <div>Loading...</div>;
  }


  //Обработчик удаления задачи
  const handleDeleteItem = (id: string) => {
    dispatch(deleteTask({ id }))
  }

  //Обработчик изменения статуса задачи
  const handleCompleteItem = (id: string) => {
    dispatch(changeStatus({ id }));
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
                  id: item.id
                }
              }}>{item.title}</Link>
              <strong>{item.completed ? 'Да' : 'Нет'}</strong>
              <button type="button" className="element__complete-button" onClick={() => {
                handleCompleteItem(item.id)
              }}>Выполнено</button>
              <button onClick={() => {
                handleDeleteItem(item.id)
              }}>Удалить</button>
            </li>
          )
        })}
      </ul>
      }
    </>
  );
}