import { useRouter } from 'next/router';
import { useState } from 'react';

export default function TodoItem() {
    const router = useRouter();
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const { id, title, completed } = router.query;

    const toggleCompleted = () => {
        setIsComplete(!isComplete);
    }

    return (
        <div>
            <h1>{`Информация о элементе с id ${id}`}</h1>
            <p><strong>ID:</strong> {id}</p>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Completed:</strong> {completed ? 'Да' : 'Нет'}</p>

            <div>
                <button onClick={toggleCompleted}>
                    Изменить статус
                </button>
                <button onClick={() => router.push('/')} >
                    Back to Home
                </button>
            </div>
        </div>
    );
}