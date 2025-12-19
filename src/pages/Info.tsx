import React from "react";

function DescriptionWithMap() {
  return (
    <>
      {/* Hero */}
      <section className="section-hero">
        <div className="container">
          <h1 className="hero-title">Наш адрес</h1>
          <p className="hero-subtitle">
            Мы находимся рядом с метро Петроградская в Санкт-Петербурге.
          </p>
        </div>
      </section>

      {/* Описание + карта */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Как нас найти</h2>
          <p className="text">
            Офис расположен в пешей доступности от станции метро
            «Петроградская». Удобный подъезд и развитая инфраструктура района
            позволяют легко добраться как на общественном транспорте, так и на
            автомобиле.
          </p>

          {/* КАРТА */}
          <div style={styles.mapWrapper}>
            <iframe
              title="Метро Петроградская"
              src="https://www.google.com/maps?q=метро%20Петроградская%20Санкт-Петербург&output=embed"
              style={styles.map}
              loading="lazy"
            />
          </div>

          <p className="text">
            Адрес: Санкт-Петербург, метро Петроградская
          </p>
          <p>
          Наши соцсети
          </p>
          <img src="https://img.icons8.com/color/72/instagram-new.png" alt="Instagram"></img>
          <img src="https://img.icons8.com/color/72/facebook-new.png" alt="Facebook"></img>
        </div>
      </section>
    </>
  );
}

const styles = {
  mapWrapper: {
    padding: "0px 0px 0px 0px",
    width: "800px",
    height: "200px",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "0px",
    borderRadius: "12px",
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
    border: 0,
  },
};

export default DescriptionWithMap;