import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setTodos, addTodo, removeTodo, setLoading } = todoSlice.actions;
export default todoSlice.reducer;
