import React from "react";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log("Вход выполнен:", data);
    alert("Добро пожаловать!");
  };

  return (
    <>
      {/**/}
      <section className="section-hero">
        <div className="container">
          <h1 className="hero-title">Вход в личный кабинет</h1>
          <p className="hero-subtitle">Введите email и пароль для доступа к вашим документам и отчетам.</p>
        </div>
      </section>

      {/**/}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Авторизация</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="input"
              type="email"
              placeholder="Ваш email"
              {...register("email", { required: "Email обязателен" })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
            <input
              className="input"
              type="password"
              placeholder="Ваш пароль"
              {...register("password", { required: "Пароль обязателен" })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            <button type="submit" className="button button-primary">Войти</button>
          </form>
          <p className="contacts">
            Нет аккаунта? <HashLink to="/#singup" smooth>Зарегистрируйтесь</HashLink>
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;