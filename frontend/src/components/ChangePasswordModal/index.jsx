import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import useOnclickOutside from "react-cool-onclickoutside";

function ChangePasswordModal({
  isChangePasswordModalOpen,
  closeChangePasswordModal,
  handleSubmitChangePassword,
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    handleSubmitChangePassword(formData);
    closeChangePasswordModal();
  };

  const ref = useOnclickOutside(() => {
    closeChangePasswordModal(false);
  });

  return (
    <AnimatePresence>
      {isChangePasswordModalOpen && (
        <Modal
          isOpen={isChangePasswordModalOpen}
          onRequestClose={closeChangePasswordModal}
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
          parentSelector={() => document.querySelector("#root")}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.mainContainer}
            ref={ref}
          >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <h2>Cambiar contraseña</h2>

              <div className={styles.inputContainer}>
                <div className={styles.formGroup}>
                  <input
                    placeholder="Contraseña actual"
                    type="password"
                    {...register("currentPassword", {
                      required: "Este campo es requerido",
                    })}
                    id="currentPassword"
                  />
                  {errors.currentPassword && (
                    <p>{errors.currentPassword.message}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Nueva contraseña"
                    type="password"
                    {...register("newPassword", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                    id="newPassword"
                  />
                  {errors.newPassword && <p>{errors.newPassword.message}</p>}
                </div>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Repetir nueva contraseña"
                    type="password"
                    {...register("confirmNewPassword", {
                      validate: (value) =>
                        value === getValues("newPassword") ||
                        "Las contraseñas no coinciden",
                    })}
                    id="confirmNewPassword"
                  />
                  {errors.confirmNewPassword && (
                    <p>{errors.confirmNewPassword.message}</p>
                  )}
                </div>
              </div>
              <button type="submit" className={styles.agregarTarjeta}>
                Cambiar contraseña
              </button>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

export default ChangePasswordModal;
