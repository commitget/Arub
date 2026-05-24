import React from "react";
import { HashLink } from 'react-router-hash-link';
// let a = "asse" as const;
function DescriptionWithMap() {
   return (
    <>
      <section className="section-hero">
        <div className="container">
          <h1 className="hero-title">Наш адрес и ост информация</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Как нас найти</h2>
          <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '15px', lineHeight: '1' }}>
            Офис расположен в пешей доступности от станции метро
            «Петроградская» СПБ
          </p>
          <div style={{
            maxWidth: '800px',
            width: '100%',
            height: '400px',
            margin: '30px auto',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <iframe
              title="Метро Петроградская"
              src="https://www.google.com/maps?q=Санкт-Петербург,+ул.+Чапаева,+15+БЦ+Сенатор&output=embed"
              style={{
                width: '100%',
                height: '100%',
                border: 0
              }}
              loading="lazy"
              allowFullScreen
            />
          </div>
          <p style={{ textAlign: 'center', fontSize: '15px', fontWeight: '500', marginBottom: '48px' }}>
            Адрес: Санкт-Петербург, метро Петроградская, Сенатор на ул. Чапаева
          </p>
          <div className="privacy-section">
  <hr id = "buverinfo"></hr>
    <div className="linksta">
      <a className="individualmarker"
        href="https://docs.google.com" target="_blank" rel="noopener noreferrer"
      >
        наша конфиденциальность
      </a>
      <a className="individualmarker"
        href="https://docs.google.com" target="_blank" rel="noopener noreferrer"
      >
        наша политика и документы
      </a>
    </div>
    </div>
        </div>
      </section>
            <section className="section-light">
        <div className="container">
        <div className="imgsvger">
          <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">
            <img src="/lilia1.svg" />
            <p>Telegram</p>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src="/lilia2.svg" />
            <p>X</p>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/lilia3.svg" />
            <p>Instagram</p>
          </a>
        </div>
        </div>
      </section>
    </>
  );
}

export default DescriptionWithMap;