import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addTask } from "@/store/taskSlice";
import styles from '@/styles/addItem.styles.module.scss';

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
        <div className={styles.addItem}>
            <h1 className={styles.addItem__header}>Добавление новой задачи</h1>
            <div className={styles.addItem__border}>
                <div className={styles.addItem__wrapper}>
                    <label className={styles.addItem__label} htmlFor="taskName">Введите название задачи:</label>
                    <input
                        className={styles.addItem__input}
                        id="taskName"
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className={styles.addItem__save}
                    onClick={handleSaveItem}
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
}