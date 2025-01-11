import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeStatus, deleteTask, setTasks } from "@/store/taskSlice";
import { RootState, AppDispatch } from '@/store';
import Footer from '@/components/Footer';
import styles from '@/styles/main.styles.module.scss';

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
    <main className={styles.home}>
      <h1 className={styles.home__header}>Приложение для заметок "To-Do-List"</h1>
      <Link href={`/add-task`}>
        <button
          type="button"
          className={styles.home__buttonAdd}>
        </button>
      </Link>
      {
        <ul className={styles.home__elements}>
          {allTasks.map((item) => {
            return (
              <li key={item.id}
                className={styles.home__element}>
                <div className={styles.home__rowData}>
                  <p>{item.id}</p>
                  <Link href={{
                    pathname: `/todos/${item.id}`,
                    query: {
                      id: item.id
                    }
                  }}>{item.title}</Link>
                  <strong>{item.completed ? 'Выполнено' : 'Не выполнено'}</strong>
                </div>
                <div className={styles.home__container}>
                  <button
                    type="button"
                    className={styles.home__buttonComplete}
                    onClick={() => {
                      handleCompleteItem(item.id)
                    }}></button>
                  <button
                    type="button"
                    className={styles.home__buttonDelete}
                    onClick={() => {
                      handleDeleteItem(item.id)
                    }}></button>
                </div>
              </li>
            )
          })}
        </ul>
      }
      <Footer />
    </main >
  );
}