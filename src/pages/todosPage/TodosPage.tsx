import "./TodosPage.css";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useAuth} from "../../store/authContext.tsx";
import {useTodoApi} from "../../hooks/useTodoApi.ts";
import {useAuthApi} from "../../hooks/useAuthApi.ts";


const TodosPage = () => {
    const {logout} = useAuthApi();
    const navigate = useNavigate();
    const access_token = useAuth();
    const {todos, loading} = useSelector((state: RootState) => state.todo);

    const {fetchTodos, createTodo, deleteTodo} = useTodoApi();
    const {isAuthReady} = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!isAuthReady) return;

        if (!access_token) {
            navigate("/");
        } else {
            fetchTodos();
        }
    }, [isAuthReady, access_token, navigate])

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
        <div className="todos-page">
            <div className="todo-container">
                <h2>Ваши задачи</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Заголовок"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={handleAddTodo}>Добавить задачу</button>
                </div>

                {loading ? (
                    <p>Загрузка задач...</p>
                ) : (
                    <ul>
                        {todos.map(todo => (
                            <li key={todo.id}>
                                <h3>{todo.title}</h3>
                                <p>{todo.description}</p>
                                <button onClick={() => handleDelete(todo.id)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button className="logout-button" onClick={handleLogout}>Выйти</button>
        </div>
    )
}

export default TodosPage;