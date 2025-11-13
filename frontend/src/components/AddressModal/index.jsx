import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import MapsComponent from "../MapsComponent";
import AutoCompleteAddressInput from "../AutoCompleteAddressInput";
import useOnclickOutside from "react-cool-onclickoutside";

export default function AddressModal({
  addressModalIsOpen,
  closeAddressModal,
  handleSaveClickAddress,
  optional,
}) {
  const ref = useOnclickOutside(() => {
    setCoordinates("");
    closeAddressModal();
  });

  const { register, handleSubmit, setValue: setFormValue } = useForm();
  const [coordinates, setCoordinates] = useState("");

  const onSubmit = (data) => {
    const formattedAddress = `${data.address}. ${data.number}, ${data.extra}. ${data.cp}.`;
    handleSaveClickAddress(formattedAddress);
    closeAddressModal();
    setCoordinates("");
  };

  return (
    <AnimatePresence>
      {addressModalIsOpen && (
        <Modal
          parentSelector={() => document.querySelector("#root")}
          className={styles.modalSecondaryContent}
          overlayClassName={styles.modalOverlay}
          isOpen={addressModalIsOpen}
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
              layout
              initial={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -100 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className={styles.mainContainer}
              ref={ref}
            >
              <div className={styles.topText}>
                <h2>Nueva dirección</h2>
                <p>Introduce tus datos</p>
              </div>

              {coordinates ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeOut", duration: 0.8 }}
                  className={styles.mapContainer}
                >
                  <MapsComponent coordinates={coordinates} />
                </motion.div>
              ) : (
                <></>
              )}

              <div className={styles.inputContainer}>
                <form
                  className={styles.formElement}
                  onSubmit={handleSubmit(onSubmit)}
                  action=""
                >
                  <AutoCompleteAddressInput
                    register={register}
                    setFormValue={setFormValue}
                    setCoordinates={setCoordinates}
                    coordinates={coordinates}
                  />
                  {coordinates && (
                    <button type="submit" className={styles.agregarTarjeta}>
                      Agregar dirección
                    </button>
                  )}
                </form>
              </div>
              {optional && (
                <p style={{ paddingTop: "10px" }}>
                  Esta direccion se utilizará sólo para este pedido
                </p>
              )}
            </motion.div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
