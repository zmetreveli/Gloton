import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Modal from "react-modal";
import Cards from "react-credit-cards-2";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

Modal.setAppElement("#root");

export default function CreditCardModal({
  cardModalIsOpen,
  closeCardModal,
  handleSaveClickCard,
  optional,
}) {
  const ref = useOnclickOutside(() => {
    closeCardModal(false);
  });

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    let formattedValue = value;

    switch (name) {
      case "number":
        formattedValue = value
          .replace(/\s+/g, "")
          .replace(/(\d{4})/g, "$1 ")
          .trim();
        break;
      case "expiry":
        const cleaned = value.replace(/\D/g, "").slice(0, 4);
        formattedValue =
          cleaned.length >= 3
            ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
            : cleaned;
        break;
      case "cvc":
        formattedValue = value.replace(/\D/g, "").slice(0, 3);
        break;
      default:
        formattedValue = value;
    }

    setState({ ...state, [name]: formattedValue });
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    handleSaveClickCard(data);
    closeCardModal();
  };

  return (
    <AnimatePresence>
      {cardModalIsOpen && (
        <Modal
          parentSelector={() => document.querySelector("#root")}
          className={styles.modalSecondaryContent}
          overlayClassName={styles.modalOverlay}
          isOpen={cardModalIsOpen}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.everything}
            style={
              optional && {
                backdropFilter: "blur(0px)",
                backgroundColor: "transparent",
              }
            }
          >
            <motion.div
              initial={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -50 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className={styles.mainContainer}
              ref={ref}
            >
              <div className={styles.topText}>
                <h2>Nueva tarjeta</h2>
                <p>Introduce tus datos</p>
              </div>
              <div>
                <div className={styles.cardImage}>
                  <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                    placeholders={{ name: "TU NOMBRE AQUÍ" }}
                    locale={{ valid: "válido hasta" }}
                  />
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={styles.formContainer}
                >
                  <input
                    {...register("name")}
                    required
                    type="text" // Cambiado a text para ser consistente
                    name="name"
                    placeholder="Nombre"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />

                  <input
                    required
                    maxLength={19}
                    minLength={19}
                    {...register("number")}
                    type="text"
                    name="number"
                    placeholder="Número de la tarjeta"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />

                  <div className={styles.extraInfoContainer}>
                    <input
                      {...register("expiry")}
                      required
                      maxLength={5}
                      minLength={5}
                      type="text"
                      name="expiry"
                      placeholder="Validez (MM/AA)"
                      value={state.expiry}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      className={styles.cvcInput}
                    />

                    <input
                      {...register("cvc")}
                      required
                      maxLength={3}
                      minLength={3}
                      type="text"
                      name="cvc"
                      placeholder="CVC"
                      value={state.cvc}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      className={styles.cvcInput}
                    />
                  </div>

                  <button type="submit" className={styles.agregarTarjeta}>
                    Agregar tarjeta
                  </button>
                </form>
              </div>
              {optional && (
                <p style={{ paddingTop: "10px" }}>
                  Esta tarjeta se utilizará sólo para este pedido
                </p>
              )}
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
