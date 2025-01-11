import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { changeStatus } from '@/store/taskSlice';
import styles from '@/styles/todoItem.styles.module.scss';

export default function TodoItem() {
    const router = useRouter();
    const { id } = router.query;
    const dispatch: AppDispatch = useDispatch();

    // Получаем задачу из хранилища
    const task = useSelector((state: RootState) => state.tasks.list.find((item) => typeof item.id !== 'string' ? String(item.id) === id : item.id === id));

    //Обработчик изменения статуса задачи
    const toggleCompleted = (id: string) => {
        if (id) {
            dispatch(changeStatus({ id }));
        }
    }

    if (!task) {
        return <div>Задача не найдена. <button onClick={() => router.push('/')}>Вернуться на главную</button></div>;
    }

    return (
        <div className={styles.item}>
            <h1 className={styles.item__header}>{`Информация о элементе с id ${id}`}</h1>
            <div className={styles.item__wrapper}>
                <p className={styles.item__text}>ID: {task.id}</p>
                <p className={styles.item__text}>Текст задания: {task.title}</p>
                <p className={styles.item__text}>Статус: {task.completed ? 'Выполнено' : 'Не выполнено'}</p>
            </div>
            <div className={styles.item__container}>
                <button
                    className={styles.item__button}
                    onClick={() => {
                        if (typeof id === 'string') {
                            toggleCompleted(task.id);
                        } else {
                            console.error("ID должен быть строкой");
                        }
                    }}>
                    Изменить статус
                </button>
                <button
                    className={styles.item__button}
                    onClick={() => router.push('/')} >
                    Вернуться на главную
                </button>
            </div>
        </div>
    );
}