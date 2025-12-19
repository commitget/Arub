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

    alert("Профиль сохранён, ура!");
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

// src/pages/Profile.tsx
// src/pages/Profile.tsx
// src/pages/Profile.tsx

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// type FormData = {
//   name: string;
//   email: string;
//   phone?: string;
// };

// const API_URL = "http://localhost:5000";

// function Profile() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors }
//   } = useForm<FormData>();

//   const [avatar, setAvatar] = useState<string | null>(null);
//   const token = localStorage.getItem("access_token");

//   /* ---------- Загрузка профиля ---------- */
//   useEffect(() => {
//     if (!token) return;

//     fetch(${API_URL}/profile, {
//       headers: {
//         Authorization: Bearer ${token}
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         setValue("name", data.name || "");
//         setValue("email", data.email || "");
//         setValue("phone", data.phone || "");
//         setAvatar(data.avatar || null);
//       })
//       .catch(err => console.error("Ошибка загрузки профиля", err));
//   }, [setValue, token]);

//   /* ---------- Обновление профиля ---------- */
//   const onSubmit = async (data: FormData) => {
//     try {
//       const res = await fetch(${API_URL}/profile, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: Bearer ${token}
//         },
//         body: JSON.stringify(data)
//       });

//       if (!res.ok) throw new Error("Ошибка обновления");

//       alert("Профиль обновлён ✅");
//     } catch (err) {
//       console.error(err);
//       alert("Ошибка сохранения профиля ❌");
//     }
//   };

//   /* ---------- Загрузка аватара ---------- */
//   const handleAvatarChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("avatar", file);

//     try {
//       const res = await fetch(${API_URL}/upload-avatar, {
//         method: "POST",
//         headers: {
//           Authorization: Bearer ${token}
//         },
//         body: formData
//       });

//       const data = await res.json();
//       setAvatar(${API_URL}${data.avatarUrl});
//     } catch (err) {
//       console.error("Ошибка загрузки аватара", err);
//     }
//   };

//   return (
//     <section className="section-profile">
//       <div className="container">
//         <h1 className="hero-title">Профиль пользователя</h1>

//         <div className="profile-avatar">
//           {avatar ? (
//             <img src={avatar} alt="avatar" />
//           ) : (
//             <div className="avatar-placeholder">Нет аватара</div>
//           )}
//         </div>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleAvatarChange}
//           className="input"
//         />

//         <form className="form" onSubmit={handleSubmit(onSubmit)}>
//           <input
//             className="input"
//             placeholder="Ваше имя"
//             {...register("name", { required: "Имя обязательно" })}
//           />
//           {errors.name && <p className="error-message">{errors.name.message}</p>}

//           <input
//             className="input"
//             type="email"
//             placeholder="Ваш email"
//             {...register("email", { required: "Email обязателен" })}
//           />
//           {errors.email && (
//             <p className="error-message">{errors.email.message}</p>
//           )}

//           <input
//             className="input"
//             placeholder="Телефон"
//             {...register("phone")}
//           />

//           <button type="submit" className="button button-primary">
//             Сохранить
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default Profile;