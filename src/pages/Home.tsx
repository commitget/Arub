import React from "react";
import { useForm } from "react-hook-form";
import { HashLink } from 'react-router-hash-link';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const advantages = [
  { title: "Экономия времени", description: "Автоматизированный учет без ручной работы." },
  { title: "Доступные цены", description: "Тарифы для малого бизнеса и ИП." },
  { title: "Бухгалтеры Профи", description: "Опытные специалисты." },
  { title: "Удобный кабинет", description: "Загрузка документов онлайн." },
  { title: "Безопасность данных", description: "Защищенный доступ и хранение." },
  { title: "Поддержка 24/7", description: "Помощь в любое время." },
];

const steps = [
  { title: "Оставьте заявку", description: "Заполните форму на сайте." },
  { title: "Получите консультацию", description: "Наш менеджер свяжется с вами." },
  { title: "Подключитесь", description: "Начните использовать сервис." },
  { title: "Ведите учет", description: "Загружайте документы и получайте отчеты." },
];

const tariffs = [
  { title: "Мини", price: "5 000 ₽ | мес", features: ["Базовый учет", "ИП", "Ограниченные отчеты"] },
  { title: "Стандарт", price: "15 000 ₽ | мес", features: ["Полный учет", "До 5 пользователей", "Все отчеты", "Чат с бухгалтером"] },
  { title: "Премиум", price: "59 999 ₽ | мес", features: ["Расширенный учет", "До 25 пользователей", "Персональный бухгалтер", "Приоритетная поддержка"] },
];

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Ошибка сервера");
      }

      alert("Спасибо, мы свяжемся с вами в ближайшее время");
      reset();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Не удалось отправить заявку ((");
    }
  };

  return (
    <>
      {/*Нейминг*/}
      <section className="section-hero" id="homepage">
        <div className="container" >
          <h1 className="hero-title">Бухгалтерия Arub</h1>
          <p className="hero-subtitle">Аутсорсинг бухгалтерии и биржа бухгалтеров для вашего бизнеса</p>
          <HashLink to="/#singup" smooth className="button button-primary">Оставить заявку</HashLink>
        </div>
        <p className="hero-background-text">ARUB</p>
      </section>

      {/*Оверейт */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Преимущества</h2>
          <div className="grid">
            {advantages.map((adv, index) => (
              <HashLink to="/inf" smooth  key={index} className="card">
                <h3 className="card-title">{adv.title}</h3>
                <p className="card-description">{adv.description}</p>
              </HashLink>
            ))}
          </div>
        </div>
      </section>

      {/*Как джеркает */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Как мы работаем</h2>
          <div  className="grid">
            {steps.map((step, index) => (
              <HashLink to="/inf" smooth key={index} className="card">
                <h3 className="card-title">{step.title}</h3>
                <p className="card-description">{step.description}</p>
              </HashLink>
            ))}
          </div>
        </div>
      </section>

      {/*Тарифы */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Тарифы</h2>
          <div className="grid">
            {tariffs.map((tariff, index) => (
              <HashLink to="/inf" smooth key={index} className="card">
                <h3 className="card-title">{tariff.title}</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{tariff.price}</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  {tariff.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </HashLink>
            ))}
          </div>
        </div>
      </section>

      {/* Хуёдзывы */}
      {/* <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Отзывы</h2>
          <div className="grid">
            {reviews.map((review, index) => (
              <div key={index} className="card">
                <h3 className="card-title">{review.name}</h3>
                <p className="card-description">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/*Оставить заполнение нужно сделать на avto*/}
      <section className="section">
        <div id={"singup"} className="container">
          <h2 className="section-title" >Оставить заявку</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)} >
            <input className="input" type="text" placeholder="Ваше имя" {...register("name", { required: true })} />
            {errors.name && <span>это поле обязательно</span>}
            <input className="input" type="email" placeholder="Ваш email" {...register("email", { required: true })} />
            {errors.email && <span>это поле обязательно</span>}
            <input className="input" type="tel" placeholder="Ваш телефон" {...register("phone")} />
            <textarea className="textarea" placeholder="ваше сообщение" {...register("message")}></textarea>
            <button type="submit" className="button button-primary">Отправить</button>
            <p className="contacts">
            Уже есть аккаунт? <HashLink className="individualmarker" to="/login" smooth>Войти</HashLink>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Home;