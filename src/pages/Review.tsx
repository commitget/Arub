import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const comms = [
  { name: 'Дмитрий Смирнов', email: '', phone: '', message: 'Поддержка 24/7, всегда помогут.' },
  { name: 'Елена Кузнецова', email: '', phone: '', message: 'Экономит время и деньги, рекомендую.' },
  { name: 'Иван Иванов', email: '', phone: '', message: 'Отличный сервис! Бухгалтерия теперь без головной боли.' },
  { name: 'Ольга Васильева', email: '', phone: '', message: 'Легко загружать и скачивать отчеты.' },
];

function Review() {
const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Отзыв отправлен:", data);
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push(data);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    alert("Спасибо за отзыв!");
  };

  return (
    <>
      <section className="section-hero">
        <div className="kiki">
          <h2 className="tomi">Ваш отзыв очень важен, он поможет нам исправиться</h2>
          <form className="pupa" onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="lulu"
              placeholder="Комментарий о нас 💕"
              {...register("message", { required: "Комментарий обязателен" })}
            ></textarea>
            {errors.message && <p style={{ color: "red" }}>{errors.message.message}</p>}
            <button type="submit" className="zizi momo">
              Отправить
            </button>
          </form>
        </div>
                <div className="container">
          <h2 className="section-title">Кейсы</h2>
          <div className="grid">
            {comms.map((apa, index) => (
              <div key={index} className="card">
                <h3 className="card-title">{apa.name}</h3>
                <p className="card-description">{apa.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Review;