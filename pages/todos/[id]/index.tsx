import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { changeStatus } from '@/store/taskSlice';

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
        <div>
            <h1>{`Информация о элементе с id ${id}`}</h1>
            <p><strong>ID:</strong> {task.id}</p>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Completed:</strong> {task.completed ? 'Да' : 'Нет'}</p>

            <div>
                <button onClick={() => {
                    if (typeof id === 'string') {
                        toggleCompleted(task.id);
                    } else {
                        console.error("ID должен быть строкой");
                    }
                }}>
                    Изменить статус
                </button>
                <button onClick={() => router.push('/')} >
                    Вернуться на главную
                </button>
            </div>
        </div>
    );
}