import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
};

function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>();

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile") || "{}");

    setValue("name", storedProfile.name || "");
    setValue("email", storedProfile.email || "");
    setAvatar(storedProfile.avatar || null);
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    const profileData = {
      ...data,
      avatar,
      updatedAt: new Date().toISOString()
    };

    console.log("Профиль обновлён", profileData);

    localStorage.setItem("profile", JSON.stringify(profileData));

    alert("Профиль сохранён");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* */}
      <section className="section-hero">
        <div className="container">
          <h1 className="hero-title">Профиль пользователя</h1>
                <section className="section-profile">
        <div className="container">
          <h2 className="section-title">Ваши данные</h2>

          <div className="profile-avatar">
            {avatar ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <div className="avatar-placeholder">Нет аватара</div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="input"
          />

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="input"
              placeholder="Ваше имя"
              {...register("name", { required: "Имя обязательно" })}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}

            <input
              className="input"
              type="email"
              placeholder="Ваш email"
              {...register("email", { required: "Email обязателен" })}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}

            <button type="submit" className="button button-primary">
              Сохранить
            </button>
          </form>
        </div>
      </section>
        </div>
      </section>

    </>
  );
}

export default Profile;