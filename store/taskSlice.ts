import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    _id: string;
    task: string;
    isComplete: boolean;
}

interface TaskState {
    list: Task[];
}

const defaultTasks: Task[] = []; // Предположим, что задачи по умолчанию пустые

const taskSlice = createSlice({
    name: 'tasks',
    initialState: { list: defaultTasks } as TaskState,
    reducers: {
        addTask(state, action: PayloadAction<{ taskValue: string }>) {
            state.list.push({
                _id: new Date().toISOString(),
                task: action.payload.taskValue,
                isComplete: false,
            });
        },
        changeTask(state, action: PayloadAction<{ _id: string; task: string; isComplete: boolean }>) {
            state.list = state.list.filter((task) => task._id !== action.payload._id);
            state.list.push({
                _id: action.payload._id,
                task: action.payload.task,
                isComplete: action.payload.isComplete,
            });
        },
        deleteTask(state, action: PayloadAction<{ _id: string }>) {
            state.list = state.list.filter((task) => task._id !== action.payload._id);
        },
        changeStatus(state, action: PayloadAction<{ _id: string }>) {
            const foundElement = state.list.find((item) => item._id === action.payload._id);
            if (foundElement) {
                foundElement.isComplete = !foundElement.isComplete;
            }
        },
    },
});

export const { addTask, changeTask, deleteTask, changeStatus } = taskSlice.actions;
export default taskSlice.reducer;
