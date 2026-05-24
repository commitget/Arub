import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  message: string;
};

const comms = [
  { name: 'Дмитрий', message: 'Поддержка топ.' },
  { name: 'Елена', message: 'Экономит время и деньги, рекомендую.' },
  { name: 'Иван ', message: 'Отличный сервис. Бухгалтерия теперь без головной боли.' },
  { name: 'Ольга', message: 'Легко загружать и скачивать отчеты.' },
];

function Review() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка сервера(( ${response.status}: ${errorText}`);
      }

      alert("Спасибо за отзыв :3");

    } catch (err: any) {
      console.error(err);
      alert("Не удалось отправить отзыв((");
    }
  };

  return (
    <>
      <section className="section-hero">
        <div className="kiki">
          <h2 className="tomi">Ваш отзыв очень важен, он поможет нам исправиться</h2>
          <form className="pupa" onSubmit={handleSubmit(onSubmit)}>
            <textarea
              className="lulu"
              placeholder="💜комментарий о нас💜"
              {...register("message", { required: " а комментарий 😥 " })}
            ></textarea>
            {errors.message && <p style={{ color: "black" }}>{errors.message.message}</p>}
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