import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TaskState {
    list: Task[];
}

const defaultTasks: Task[] = []; // Предположим, что задачи по умолчанию пустые

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { list: defaultTasks } as TaskState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.list = action.payload;
        },

        addTask(state, action: PayloadAction<{ taskValue: string }>) {
            state.list.push({
                id: new Date().toISOString(),// Временно поставим id как дату в формате строки
                title: action.payload.taskValue,
                completed: false,
            });
        },
        changeTask(state, action: PayloadAction<{ id: string; title: string; completed: boolean }>) {
            state.list = state.list.filter((task) => task.id !== action.payload.id);
            state.list.push({
                id: action.payload.id,
                title: action.payload.title,
                completed: action.payload.completed,
            });
        },
        deleteTask(state, action: PayloadAction<{ id: string }>) {
            state.list = state.list.filter((task) => task.id !== action.payload.id);
        },
        changeStatus(state, action: PayloadAction<{ _id: string }>) {
            const foundElement = state.list.find((item) => item.id === action.payload._id);
            if (foundElement) {
                foundElement.completed = !foundElement.completed;
            }
        },
    },
});

export const { setTasks, addTask, changeTask, deleteTask, changeStatus } = taskSlice.actions;
export default taskSlice.reducer;
