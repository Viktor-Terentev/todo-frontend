import {useState} from "react";
import {useAuthApi} from "../../hooks/useAuthApi.ts";
import {useNavigate} from "react-router-dom";
import classes from './RegisterForm.module.scss'


const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register } = useAuthApi();

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await register({username, email, password});
            sessionStorage.setItem("pending_username", username);
            navigate("/confirm");
            alert('На вашу почту отправлен код подтверждения');
        } catch (error: any) {
            console.error("Ошибка регистрации:", error);
            alert(error?.response?.data?.error || "Ошибка регистрации");
        }
    }

    return (
        <div className={classes.register_form}>
            <h2>Регистрация</h2>
            <input
                className={classes.input}
                type="text"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className={classes.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className={classes.input}
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.button} onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    )
}

export default RegisterForm;