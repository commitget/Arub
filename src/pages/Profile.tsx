import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const savedAvatar = document.cookie
      .split('; ')
      .find(row => row.startsWith('userAvatar='))
      ?.split('=')[1];

    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setAvatar(base64);

      document.cookie = `userAvatar=${base64}; max-age=${30 * 24 * 60 * 60}; path=/`;
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatar(null);
    document.cookie = "userAvatar=; max-age=0; path=/";
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          credentials: "include",
          headers: { "Accept": "application/json" },
        });

        if (!res.ok) throw new Error("not login");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div 
  // style={{
  //       minHeight: '60vh',
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       fontSize: '1.2rem',
  //       color: '#666'
  //     }}
      className='section kobolttext'>wait profile</div>;

  return (

    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }} className="section">
      <h1>Личный кабинет</h1>
      {user ? (
        <>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
            {avatar ? (
              <img
                src={avatar}
                alt="Аватар"
                style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "#f0f0f0", margin: "0 auto" }}>
              <p>нет ничего</p>
              </div>
            )}

            <label style={{ display: "inline-block", marginTop: "10px", cursor: "pointer" }}>
              Изменить фото
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </label>

            {avatar && (
              <button onClick={removeAvatar} style={{ marginLeft: "10px", color: "red" }}>
                Удалить
              </button>
            )}
          </div>
          <p><strong>Имя:</strong> {user.name || "Аноним"}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button
            onClick={() => {
              fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include",
              }).then(() => navigate("/login"));
            }}
            style={{ marginTop: "1.5rem", padding: "10px 20px" }}
            className="button button-primary"
          >
            Выйти
          </button>
        </>
      ) : (
        <p>404 | data lost</p>
      )}
    </div>
  );
}