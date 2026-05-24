import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
// import Avatar from 'react-avatar';



function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/api/profile", {
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then((res) => setIsLoggedIn(res.ok))
      .catch(() => setIsLoggedIn(false));
  }, [location.pathname]);

  return (
    <div>
      <header className="header">
        <div className="container header-inner">
          <HashLink to="/#homepage" smooth style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logohp.png" height={50} width={50} className="logo" alt="lost" />
            <span className="logo">Arub</span>
          </HashLink>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/login" className="button button-outline">Войти</Link>
            <Link to="/review" className="button button-primary">Оставить отзыв</Link>
            <Link to="/inf" className="button button-inf">Инфо</Link>
            {isLoggedIn && (
              <Link to="/profile" className="avaformech">
                <img
        ></img>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p>&copy;Arub все права защищены</p>
          <p>Контакты: +7 (800) 555-35-35 | John@arub.ru</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;