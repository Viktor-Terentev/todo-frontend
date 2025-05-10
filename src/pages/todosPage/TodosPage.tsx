import "./TodosPage.module.scss";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useAuth} from "../../store/authContext.tsx";
import {useTodoApi} from "../../hooks/useTodoApi.ts";
import {useAuthApi} from "../../hooks/useAuthApi.ts";
import classes from "./TodosPage.module.scss";
import Loader from "../../components/loader/Loader.tsx";


const TodosPage = () => {
    const {logout} = useAuthApi();
    const navigate = useNavigate();
    const accessToken = useAuth();
    const {todos, loading} = useSelector((state: RootState) => state.todo);
    const {fetchTodos, createTodo, deleteTodo} = useTodoApi();
    const {isAuthReady} = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!isAuthReady) return;
        if (!accessToken) {
            navigate("/");
        } else {
            fetchTodos();
        }
    }, [isAuthReady, accessToken, navigate])

    const handleAddTodo = async () => {
        if (title.trim() === '') {
            alert('Введите название задачи')
            return;
        }

        await createTodo({title, description});
        setTitle('');
        setDescription('');
    }

    const handleDelete = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            await deleteTodo(id);
        }
    }

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    return (
        <div className={classes.todos_page}>
            <div className={classes.todo_container}>
                <h2>Ваши задачи</h2>
                <div className={classes.todo_form}>
                    <input
                        className={classes.input}
                        type="text"
                        placeholder="Заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className={classes.input}
                        type="text"
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={handleAddTodo}>Добавить задачу</button>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <ul className={classes.todo_list}>
                        {todos.map(todo => (
                            <li key={todo.id}>
                                <div>
                                    <h3>{todo.title}</h3>
                                    <p>{todo.description}</p>
                                </div>
                                <button onClick={() => handleDelete(todo.id)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className={classes.logout_button} onClick={handleLogout}>Выйти</button>
        </div>
    );

}

export default TodosPage;