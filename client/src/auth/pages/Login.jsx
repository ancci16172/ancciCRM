import { Link, useNavigate } from "react-router-dom";
import style from "../styles/styles.module.css";
import Container from "../../shared/components/Container";
import { useForm } from "react-hook-form";
import axios from "../../shared/api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import Cookies from "js-cookie";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    console.log("trySubmit");
    console.log(values);
    signIn(values);

    return;
  });

  return (
    <Container className="">
      <div className={style["container--login"]}>
        <header className={style["container--login__header"]}>
          Iniciar sesion
        </header>

        <form className={style["container--login__form"]} onSubmit={onSubmit}>
          <div className={style["container--input"]}>
            <div>Usuario</div>
            <input
              type="text"
              className={style["container--login__input"]}
              {...register("usuario", { required: true })}
            />
            <p className="text-red-400">{errors.usuario?.message}</p>
          </div>
          <div className={style["container--login__container--input"]}>
            <div>Contraseña</div>
            <input
              type="password"
              className={style["container--login__input"]}
              {...register("contrasenia", {
                required: true,
                minLength: {
                  value: 3,
                  message: "La longitud debe ser almenos de 3",
                },
              })}
            />
            <p className="text-red-400">{errors.contrasenia?.message}</p>
          </div>
          <p className="text-red-400 text-xs">{authErrors.msg}</p>
          <button className={style["container--login__input--submit"]}>
            Ingresar
          </button>
        </form>
      </div>
    </Container>
  );
}

export default Login;
