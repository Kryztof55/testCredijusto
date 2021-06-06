import React from "react";
import "./style.scss";
const Header = (props) => {
  const { nombre, apellido } = props;
  return (
    <section className="header">
      <h1 className="header-title">Conversor de Cryptomoneda</h1>
      <p className="header-subtitle">Una prueba para CrediJusto</p>
      <p className="header-subtitle">
        {nombre} {apellido}
      </p>
    </section>
  );
};

export default Header;
