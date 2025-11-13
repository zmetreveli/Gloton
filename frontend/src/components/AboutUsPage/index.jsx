import React from "react";
import styles from "./styles.module.css";
import joelImg from "../../assets/images/joelimg.webp";
import mailImg from "../../assets/images/mailicon.svg";
import spotifyImg from "../../assets/images/Spotify_logo_without_text.svg";
import linkedinImg from "../../assets/images/LinkedIn_icon_circle.svg";
import instagramImg from "../../assets/images/Instagram_logo_2016.svg";
import vincentImg from "../../assets/images/vincent.webp";
import zurabImg from "../../assets/images/zurab.webp";
import joseImg from "../../assets/images/jose.webp";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={styles.teamContainer}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Nuestro equipo</h1>
      </header>

      <div className={styles.teamMember}>
        <div className={styles.memberPhoto}>
          <img
            className={styles.memberPhotoImg}
            src={joelImg}
            alt="Nombre Miembro 2"
          />
        </div>
        <div className={styles.rightInfo}>
          <div className={styles.memberDescription}>
            <h2>Joel Oliver</h2>
            <p>
              Como líder en front-end y UX/UI, combino mi pasión por el
              desarrollo de aplicaciones y la creación musical como Odsen.
              Destaco en diseño de UI/UX, enfocándome en experiencias usuario
              intuitivas. En React, lidero la construcción de aplicaciones web
              reactivas, aplicando innovación. Mi música inspira mi enfoque de
              diseño, aportando creatividad única a cada proyecto.
            </p>
          </div>
          <div className={styles.memberContact}>
            <a href="https://www.linkedin.com/in/joel-oliver-millan/">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={linkedinImg} alt="" />
              </div>
            </a>
            <a href="mailto:jolivermillan@gmail.com">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={mailImg} alt="" />
              </div>
            </a>
            <a href="https://www.instagram.com/odsenmusic/">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={instagramImg} alt="" />
              </div>
            </a>
            <a href="https://open.spotify.com/intl-es/artist/5u9LEu640uGxBEKnU1PY9V">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={spotifyImg} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.teamMember}>
        <div className={styles.memberPhoto}>
          <img
            className={styles.memberPhotoImg}
            src={vincentImg}
            alt="Nombre Miembro 2"
          />
        </div>
        <div className={styles.rightInfo}>
          <div className={styles.memberDescription}>
            <h2>Vincent Rey</h2>
            <p>
              Back-end lead engineer, atraído por el desafío que supone la
              lógica de programación compleja. Prefiero trabajar en aspectos
              técnicos. He encontrado particular satisfacción en automatizar
              pruebas con herramientas como Cypress y Jest y a la corrección de
              bugs y al manejo de errores, lo que ha mejorado la eficiencia y
              calidad del desarrollo.
            </p>
          </div>
          <div className={styles.memberContact}>
            <a href="https://www.linkedin.com/in/vincent-rey-65140b239/">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={linkedinImg} alt="" />
              </div>
            </a>
            <a href="mailto:vincent.rey865@gmail.com">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={mailImg} alt="" />
              </div>
            </a>
            <a href="https://www.instagram.com/vins013/">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={instagramImg} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.teamMember}>
        <div className={styles.memberPhoto}>
          <img
            className={styles.memberPhotoImg}
            src={zurabImg}
            alt="Foto de vincent"
          />
        </div>
        <div className={styles.rightInfo}>
          <div className={styles.memberDescription}>
            <h2>Zurab Metreveli</h2>
            <p>
              Soy un Desarrollador Full-Stack entusiasta con una sólida
              formación académica, habiendo completado 'FP2 Grado Superior'. Mis
              habilidades incluyen HTML, CSS, JavaScript, React.js y Node.js,
              con los que desarrollo aplicaciones web dinámicas y amigables.
            </p>
          </div>
          <div className={styles.memberContact}>
            <a href="https://www.linkedin.com/in/zurab-metreveli">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={linkedinImg} alt="" />
              </div>
            </a>
            <a href="mailto:Metreveli.zura.2014@gmail.com">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={mailImg} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.teamMember}>
        <div className={styles.memberPhoto}>
          <img
            className={styles.memberPhotoImg}
            src={joseImg}
            alt="foto de zurab"
          />
        </div>
        <div className={styles.rightInfo}>
          <div className={styles.memberDescription}>
            <h2>Jose García</h2>
            <p>
              En Glotón, he liderado el desarrollo del backend, mejorando la
              experiencia optimizando operaciones clave como la creación,
              lectura, actualización y eliminación de datos. Envio de correos
              electronicos y Implementé un sistema avanzado de login y
              autenticación con tokens para reforzar la seguridad.
            </p>
          </div>
          <div className={styles.memberContact}>
            <a href="https://www.linkedin.com/in/jose-garcia-98421814a/">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={linkedinImg} alt="" />
              </div>
            </a>
            <a href="mailto:josegarcia1006@gmail.com">
              <div className={styles.contactButton}>
                <img className={styles.logoImg} src={mailImg} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
