import Modal from "react-modal";
import styles from "./styles.module.css";
import crossIcon from "../../assets/icons/cross-circle-svgrepo-com.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function ErrorModal({ error, isErrorModalOpen }) {
  return (
    <AnimatePresence>
      {isErrorModalOpen && (
        <Modal
          parentSelector={() => document.querySelector("#root")}
          className={styles.modalContent}
          overlayClassName={styles.modalOverlay}
          isOpen={isErrorModalOpen}
        >
          <motion.div
            initial={{ opacity: 0, translateY: "-50px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            exit={{ opacity: 0, translateY: "-50px" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={styles.mainContainer}
          >
            <img className={styles.crossIcon} src={crossIcon} alt="" />
            <p className={styles.errorText}>{error}</p>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
