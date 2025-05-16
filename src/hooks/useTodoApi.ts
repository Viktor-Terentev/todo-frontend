import { useDispatch } from "react-redux";
import { createAxiosInstance } from "../api/axios";
import { setTodos, addTodo, removeTodo, setLoading } from "../store/todoSlice";
import {useAuth} from "../store/authContext.tsx";
import {useEffect, useRef} from "react";

export const useTodoApi = () => {
    const dispatch = useDispatch();
    const { accessToken } = useAuth();

    const apiRef = useRef(createAxiosInstance());

    useEffect(() => {
        apiRef.current = createAxiosInstance();
    }, [accessToken]);

    const fetchTodos = async () => {
        try {
            dispatch(setLoading(true));
            const res = await apiRef.current.get("/api/todos/");
            dispatch(setTodos(res.data));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const createTodo = async (todo: { title: string; description: string }) => {
        const res = await apiRef.current.post("/api/todos/", todo);
        dispatch(addTodo(res.data));
    };

    const deleteTodo = async (id: number) => {
        await apiRef.current.delete(`/api/todos/${id}/`);
        dispatch(removeTodo(id));
    };

    return { fetchTodos, createTodo, deleteTodo };
};
