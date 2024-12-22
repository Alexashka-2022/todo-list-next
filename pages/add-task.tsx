import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addTask } from "@/store/taskSlice";

export default function AddItem() {
    const [taskName, setTaskName] = useState<string>('');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSaveItem = () => {
        if (taskName.trim()) {
            dispatch(addTask({ taskValue: taskName })) //Записываем данные
            router.push('/'); //Переводим на главную страницу
        }
    }


    return (
        <div>
            <h1>Добавление новой задачи</h1>
            <label htmlFor="taskName">Task name:</label>
            <input
                id="taskName"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <button
                type="button"
                onClick={handleSaveItem}
            >
                Сохранить
            </button>
        </div>
    );
}