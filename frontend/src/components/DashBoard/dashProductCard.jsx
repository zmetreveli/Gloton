import styles from "./productCard.module.css";
import ModifyProductModal from "./modifyModal";
import { useState } from "react";
import deleteIcon from "../../assets/icons/cross-circle-svgrepo-com.svg";
import { deleteProduct } from "../../utils/api";

export default function DashProductCard({
  productName,
  productDescription,
  productPrice,
  productImg,

  producto,
  restaurante,
}) {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  return (
    <>
      <div key={producto._id} className={styles.mainContainer}>
        <div
          onClick={() => {
            setIsModifyModalOpen(true);
          }}
        >
          <div className={styles.upperContainer}>
            <img
              className={styles.productImg}
              src={producto.img || productImg}
              alt=""
            />
            <div className={styles.textContainer}>
              <h5>{productName}</h5>
              <p className={styles.description}>{productDescription}</p>
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <aside>{productPrice}</aside>
          </div>
        </div>
        <button
          onClick={() => {
            deleteProduct(producto._id);
          }}
          className={styles.deleteIcon}
        >
          <img className={styles.deleteIcon} src={deleteIcon} alt="" />
        </button>
      </div>
      <ModifyProductModal
        restaurante={restaurante}
        isModifyModalOpen={isModifyModalOpen}
        setIsModifyModalOpen={setIsModifyModalOpen}
        producto={producto}
      />
    </>
  );
}
