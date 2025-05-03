import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/', { replace: true }); // Редирект, если пользователь авторизован
    }
  }, [navigate]); // Зависимость от navigate
  
  // Если пользователь есть, компонент не рендерится (из-за редиректа)
  return (
    <div>
      <SignUp />
      <SignIn />
    </div>
  );
}

export default Auth;