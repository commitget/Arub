import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">Arub</Link>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/login" className="button button-outline">Войти</Link>
            <Link to="/singup"className="button button-primary">Оставить заявку</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p style={{}} className="Arub">@Arub все права защищены</p>
          <p>Контакты: +7 (800) 555-35-35 | BigBossJohn@arub.ru</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;