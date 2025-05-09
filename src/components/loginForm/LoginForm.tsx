import {useState} from "react";
import classes from './LoginForm.module.scss'
import {useNavigate} from "react-router-dom";
import {useAuthApi} from "../../hooks/useAuthApi.ts";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuthApi();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login({ username, password });
            navigate("/todos");
        } catch (error) {
            console.error("Ошибка входа:", error);
            alert("Ошибка входа");
        }
    };

    return (
        <div className={classes.login_form}>
            <h2>Авторизация</h2>
            <input
                className={classes.input}
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className={classes.input}
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.button} onClick={handleLogin}>Войти</button>
            <p>Нет аккаунта? <a className={classes.register_button} href="/register">Зарегистрироваться</a></p>
        </div>
    )
}

export default LoginForm;