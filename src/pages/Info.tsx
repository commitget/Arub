import React from "react";

function DescriptionWithMap() {
   return (
    <>
      <section className="section-hero">
        <div className="container">
          <h1 className="hero-title">Наш адрес</h1>
          <p className="hero-subtitle">
            Мы находимся рядом с метро Петроградская в Санкт-Петербурге
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Как нас найти</h2>
          <p style={{ textAlign: 'center', marginBottom: '32px', fontSize: '18px', lineHeight: '1.6' }}>
            Офис расположен в пешей доступности от станции метро
            «Петроградская»
          </p>
          <div style={{
            maxWidth: '800px',
            width: '100%',
            height: '400px',
            margin: '32px auto',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <iframe
              title="Метро Петроградская"
              src="https://www.google.com/maps?q=метро%20Петроградская%20Санкт-Петербург&output=embed"
              style={{
                width: '100%',
                height: '100%',
                border: 0
              }}
              loading="lazy"
              allowFullScreen
            />
          </div>
          <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '500', marginBottom: '48px' }}>
            Адрес: Санкт-Петербург, метро Петроградская
          </p>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
              Наши соцсети
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ transition: 'transform 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img 
                  src="https://img.icons8.com/color/72/instagram-new.png" 
                  alt="Instagram"
                  style={{ display: 'block' }}
                />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ transition: 'transform 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img 
                  src="https://img.icons8.com/color/72/facebook-new.png" 
                  alt="Facebook"
                  style={{ display: 'block' }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DescriptionWithMap;