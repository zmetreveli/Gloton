import styles from "./styles.module.css";
import wavySvg from "../../assets/images/address-jumbotron-wave-desktop.svg";
import { React } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DirectionBar from "../DirectionBar";
import burgerFront from "../../assets/images/segmentedBurguer/Burgerfront.webp";
import burgerMiddle from "../../assets/images/segmentedBurguer/Burgermiddle.webp";
import burgerMiddle2 from "../../assets/images/segmentedBurguer/Burgermiddle2.webp";
import burgerBack from "../../assets/images/segmentedBurguer/Burgerback.webp";

export default function HeroPage({ setLocation }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className={styles.viewport}>
        <motion.div layout className={styles.heroContainer}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className={styles.burgerContainer}
          >
            <img
              className={`${styles.burgerSegment} ${styles.burguerMiddle}`}
              src={burgerMiddle2}
              alt=""
            />

            <img
              className={`${styles.burgerSegment} ${styles.burguerBack}`}
              src={burgerBack}
              alt=""
            />
            <img
              className={`${styles.burgerSegment} ${styles.burguerMiddle}`}
              src={burgerMiddle}
              alt=""
            />
            <img
              className={`${styles.burgerSegment} ${styles.burguerFront}`}
              src={burgerFront}
              alt=""
            />
          </motion.div>
          <AnimatePresence>
            <DirectionBar setLocation={setLocation} />
          </AnimatePresence>
        </motion.div>
        <img className={styles.wavySvg} src={wavySvg} alt="" />
      </div>
    </motion.div>
  );
}
