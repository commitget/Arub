import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="header">
        <div className="container header-inner">
          <HashLink to="/#homepage" smooth style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/Bobi.jpg" height={50} width={50} className="logo" alt="Arub Logo" />
            <span className="logo">Arub</span>
          </HashLink>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/login" className="button button-outline">Войти</Link>
            <Link to="/review"className="button button-primary">Оставить отзыв</Link>
            <Link to="/inf"className="button button-inf">Инфо</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p>&copy;Arub все права защищены кем то?</p>
          <p>Контакты: +7 (800) 555-35-35 | John@arub.ru</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;