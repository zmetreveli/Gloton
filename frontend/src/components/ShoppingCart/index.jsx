import styles from "../ShoppingCart/styles.module.css";
import shoppingCartBackground from "../../assets/images/astronaut-grey-scale.svg";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import { motion } from "framer-motion";
import PurchaseConfirmationModal from "../PurchaseConfirmationModal";
import crossIcon from "../../assets/icons/cross-circle-svgrepo-com.svg";
import { useState } from "react";

export default function ShoppingCart({
  productos,
  shoppingList,
  totalPrice,
  restaurante,
  setShoppingList,
  fix,
}) {
  const [purchaseConfirmationModalIsOpen, setPurchaseConfirmationModalIsOpen] =
    useState(false);

  const openModal = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.dispatchEvent(new CustomEvent("open-login-modal"));
    } else {
      setPurchaseConfirmationModalIsOpen(true);
    }
  };

  const ammountHandler = (e, operation) => {
    const ProductIndex = shoppingList.findIndex((o) => o.id === e.id);
    const updatedShoppingList = [...shoppingList];
    if (operation === "-") {
      updatedShoppingList[ProductIndex].ammount -= 1;
      if (updatedShoppingList[ProductIndex].ammount <= 0) {
        updatedShoppingList.splice(ProductIndex, 1);
      } else {
      }
    } else {
      updatedShoppingList[ProductIndex].ammount += 1;
    }
    setShoppingList(updatedShoppingList);
  };

  const deleteCartItem = (e) => {
    const productIndex = shoppingList.findIndex((o) => o.id === e.id);
    const updatedShoppingList = [...shoppingList];
    updatedShoppingList.splice(productIndex, 1);

    setShoppingList(updatedShoppingList);
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <section className={fix ? styles.shoppingCart : styles.shoppingCartFixed}>
        <h2>Tu pedido </h2>
        {shoppingList.length === 0 ||
        productos.length === 0 ||
        !shoppingList.find((item) => item.shop === restaurante._id) ? (
          <>
            <img
              className={styles.shoppingCartBackground}
              src={shoppingCartBackground}
              alt=""
            />
            <p>
              Todavía no has añadido ningún producto. Cuando lo hagas, ¡verás
              los productos aquí!
            </p>
          </>
        ) : (
          <div className={styles.shoppingListContainer}>
            {shoppingList.map((e) => {
              const producto = productos.find((item) => item._id === e.id);
              if (producto) {
                return (
                  <motion.div
                    initial={{ opacity: 0, translateY: 50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
                    exit={{ opacity: 0 }}
                    className={styles.cartItemContainer}
                    key={e.id}
                  >
                    <div className={styles.ammountContainer}>
                      <button
                        onClick={() => {
                          ammountHandler(e, "-");
                        }}
                        className={styles.quantityButton}
                      >
                        <span className={styles.buttonContentMinus}>-</span>
                      </button>
                      <p className={styles.quantityNumber}>{e.ammount}</p>
                      <button
                        onClick={() => {
                          ammountHandler(e, "+");
                        }}
                        className={styles.quantityButton}
                      >
                        <span className={styles.buttonContentPlus}>+</span>
                      </button>
                    </div>
                    <p className={styles.shoppingListItem}>
                      {producto.nombre + " "}
                    </p>
                    <b>{producto.precio + "€"}</b>
                    <button
                      onClick={() => deleteCartItem(e)}
                      className={styles.deleteCartItemButton}
                    >
                      <img
                        className={styles.crossIcon}
                        src={crossIcon}
                        alt=""
                      />
                    </button>
                  </motion.div>
                );
              }
            })}

            <div className={styles.transportContainer}>
              <img className={styles.scooterIcon} src={scooterIcon} alt="" />
              <p>
                Tasas de tranporte
                <b> {restaurante.transporte}</b>
              </p>
            </div>
            <button onClick={openModal} className={styles.buyButton}>
              Comprar por {totalPrice}€
            </button>
          </div>
        )}{" "}
      </section>

      <PurchaseConfirmationModal
        shoppingList={shoppingList}
        purchaseConfirmationModalIsOpen={purchaseConfirmationModalIsOpen}
        productos={productos}
        setPurchaseConfirmationModalIsOpen={setPurchaseConfirmationModalIsOpen}
        totalPrice={totalPrice}
        transportPrice={restaurante.transporte}
        restaurante={restaurante}
      />
    </div>
  );
}
