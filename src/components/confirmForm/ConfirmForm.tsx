import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthApi} from "../../hooks/useAuthApi.ts";


const ConfirmForm = () => {
    const [code, setCode] = React.useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username || sessionStorage.getItem("pending_username");
    const { confirm } = useAuthApi();


    const handleConfirm = async () => {
        if (!username) {
            alert("Имя пользователя не передано");
            return;
        }

        try {
            await confirm(username, code);
            alert('Регистрация успешна');
            navigate("/");
        } catch (error) {
            console.error("Ошибка подтверждения:", error);
            alert('Ошибка подтверждения');
        }
    }

    if (!username) {
        return <div>Имя пользователя не передано. Вернитесь на <a href="/register">регистрацию</a>.</div>;
    }

    return (
        <div>
            <h2>Подтверждение почты</h2>
            <input
                type="text"
                placeholder="Код подтверждения"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleConfirm}>Подтвердить</button>
        </div>
    )
}

export default ConfirmForm;