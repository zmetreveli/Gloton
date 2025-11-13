import styles from "../RestaurantConfirmationPage";
import ThumbsUpImg from "../../assets/images/thumb-up-svgrepo-com.svg";
import wavySvg from "../../assets/images/address-jumbotron-wave-desktop.svg";

export default function RestaurantConfirmationPage() {
  return (
    <div className={styles.viewport}>
      <header className={styles.confirmationHeader}>
        <div className={styles.h1Container}>
          <h1>Tu pedido ha sido confirmado </h1>{" "}
          <img className={styles.thumbsUpImg} src={ThumbsUpImg} alt="" />
        </div>
      </header>
      <img className={styles.wavySvg} src={wavySvg} alt="" />
      <div className={styles.listContainer}>
        <ul className={styles.itemList}>
          <div>
            <h2>Detalle del pedido</h2>
          </div>
          {order.map((e) => {
            return (
              <li key={e.producto._id}>
                <div className={styles.individualItemContainer}>
                  <p>
                    {e.ammount} x {e.producto.nombre}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
