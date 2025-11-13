import React, { useState } from "react";
import styles from "../Footer/styles.module.css";
import footerWaveSvg from "../../assets/images/footer-wave-desktop.svg";
import logoImg from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import Formulario from "../formularios/formularios";

export default function Footer({ logged, setLogged }) {
  const [formulariosIsOpen, setFormulariosIsOpen] = useState(false);

  const navigate = useNavigate();

  const openFormularios = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setFormulariosIsOpen(true);
  };

  return (
    <div className={styles.viewport}>
      <footer className={styles.footerContainer}>
        <img className={styles.footerWaveImg} src={footerWaveSvg} alt="" />
        <div className={styles.footerBackground}>
          <div className={styles.footerTextContainer}>
            <div className={styles.logoContainer}>
              <img className={styles.footerLogo} src={logoImg} alt="" />
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.verticalLinks}>
                <h4>Colabora con Gloton</h4>

                <p
                  className={styles.formularioButton}
                  onClick={openFormularios}
                >
                  Gloton para socios
                </p>
              </div>
              <div className={styles.verticalLinks}>
                <h4>Links de interés</h4>
                <p
                  className={styles.formularioButton}
                  onClick={() => {
                    navigate("/about");
                  }}
                  href=""
                >
                  Acerca de nosotros
                </p>
                <p
                  className={styles.formularioButton}
                  onClick={() => {
                    navigate("/faq");
                  }}
                  href=""
                >
                  Preguntas frecuentes
                </p>
              </div>
              <div className={styles.verticalLinks}>
                <h4>Síguenos</h4>
                <a href="https://twitter.com/NuclioGloton">Twitter</a>
                <a href="https://www.instagram.com/gloton_bcn/">
                  Instagram
                </a>{" "}
                <a href="https://willowy-torte-8bd0aa.netlify.app/user/gloton">
                  Meower
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Formulario
        formulariosIsOpen={formulariosIsOpen}
        setFormulariosIsOpen={setFormulariosIsOpen}
        logged={logged}
        setLogged={setLogged}
      />
    </div>
  );
}
