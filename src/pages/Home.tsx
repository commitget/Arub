import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const advantages = [
  { title: "Экономия времени", description: "Автоматизированный учет без ручной работы." },
  { title: "Доступные цены", description: "Тарифы для малого бизнеса." },
  { title: "Профессиональные бухгалтеры", description: "Опытные специалисты на аутсорсе." },
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
  { title: "Мини", price: "500 ₽/мес", features: ["Базовый учет", "1 пользователь", "Ограниченные отчеты"] },
  { title: "Стандарт", price: "1500 ₽/мес", features: ["Полный учет", "До 3 пользователей", "Все отчеты", "Чат с бухгалтером"] },
  { title: "Премиум", price: "3000 ₽/мес", features: ["Расширенный учет", "Неограниченные пользователи", "Персональный бухгалтер", "Приоритетная поддержка"] },
];

function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    console.log("Заявка отправлена:", data);
    alert("Спасибо за заявку!");
  };

  return (
    <>
      {/* Hero */}
      <section className="section-hero">
        <div className="container">
          <h1 className="hero-title">Бухгалтерия Arub, без головной боли</h1>
          <p className="hero-subtitle">Аутсорсинг бухгалтерии и биржа бухгалтеров для вашего бизнеса.</p>
          <button className="button button-primary">Оставить заявку</button>
        </div>
      </section>

      {/* Advantages */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Преимущества</h2>
          <div className="grid">
            {advantages.map((adv, index) => (
              <div key={index} className="card">
                <h3 className="card-title">{adv.title}</h3>
                <p className="card-description">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Как мы работаем</h2>
          <div className="grid">
            {steps.map((step, index) => (
              <div key={index} className="card">
                <h3 className="card-title">{step.title}</h3>
                <p className="card-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Тарифы</h2>
          <div className="grid">
            {tariffs.map((tariff, index) => (
              <div key={index} className="card">
                <h3 className="card-title">{tariff.title}</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{tariff.price}</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  {tariff.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
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

      {/* Form */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Оставить заявку</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input className="input" type="text" placeholder="Ваше имя" {...register("name", { required: true })} />
            {errors.name && <span>Это поле обязательно</span>}
            <input className="input" type="email" placeholder="Ваш email" {...register("email", { required: true })} />
            {errors.email && <span>Это поле обязательно</span>}
            <input className="input" type="tel" placeholder="Ваш телефон" {...register("phone")} />
            <textarea className="textarea" placeholder="Ваше сообщение" {...register("message")}></textarea>
            <button type="submit" className="button button-primary">Отправить</button>
          </form>
          <div className="contacts">
            <p>Контакты: +7 (800) 555-35-35 | John@arub.ru</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;