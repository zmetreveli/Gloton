import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../PerfilUsuario/styles.module.css";
import Modal from "react-modal";
import { handleLoginSubmit } from "../../utils/Usercrud";
import { UserContext } from "../../contexts/UserContext";
import useOnclickOutside from "react-cool-onclickoutside";
import { BeatLoader } from "react-spinners";

function UserLoginModal({
  setLogged,

  loginModalOpen,
  setLoginModalOpen,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const { setLocalUser } = useContext(UserContext);
  const navigate = useNavigate();
  const ref = useOnclickOutside(() => {
    setLoginModalOpen(false);
  });
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await handleLoginSubmit(data, setLocalUser);
      if (response.status == 200 && response.data.user.role === "RESTAURANT") {
        setLogged(true);
        setIsLoading(false);
        navigate("../DashBoard");
      } else if (response.status == 200 && response.data.user.role === "USER") {
        setLogged(true);
        setIsLoading(false);
      } else {
        setLogged(false);
        setError("Error en tus credenciales");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error en el registro inicial:", error);
    }
  };

  useEffect(() => {
    const handleOpenLoginModal = () => setLoginModalOpen(true);

    window.addEventListener("open-login-modal", handleOpenLoginModal);

    return () => {
      window.removeEventListener("open-login-modal", handleOpenLoginModal);
    };
  }, []);

  return (
    <AnimatePresence>
      {loginModalOpen && (
        <Modal
          isOpen={loginModalOpen}
          parentSelector={() => document.querySelector("#root")}
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
        >
          {" "}
          overlayClassName={styles.modalOverlay}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.everything}
          >
            <motion.form
              initial={{ translateY: 100 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: -100 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              onSubmit={handleSubmit(onSubmit)}
              className={styles.registerForm}
              ref={ref}
            >
              <h2 className={styles.hola}>¡Bienvenido de nuevo!</h2>
              <p className={styles.registerP}>Ingresa tus credenciales:</p>
              <div className={styles.inputContainer}>
                <div className={styles.inputPictureContainer}>
                  <MdOutlineEmail className={styles.emailIcon} />
                  <input
                    className={styles.firstInput}
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className={styles.inputPictureContainer}>
                  <MdOutlinePassword className={styles.passwordIcon} />
                  <input
                    className={styles.firstInput}
                    {...register("password")}
                    type="password"
                    placeholder="Contraseña"
                    required
                  />
                </div>
              </div>
              {error && <p>{error}</p>}
              <button className={styles.guardarCambios} type="submit">
                {!isLoading ? (
                  "Iniciar sesión"
                ) : (
                  <div style={{ marginTop: "3px", marginRight: "5px" }}>
                    <BeatLoader color="#ffffff" size={5} />{" "}
                  </div>
                )}
              </button>
            </motion.form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default UserLoginModal;
