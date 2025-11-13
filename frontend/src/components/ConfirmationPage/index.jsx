import styles from "../ConfirmationPage/styles.module.css";
import wavySvg from "../../assets/images/curve-main--mobile.svg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";

export default function ConfirmationPage() {
  const [order, setOrder] = useState();
  const [restaurant, setRestaurant] = useState();
  const [rider, setRider] = useState();
  const params = useParams();

  useEffect(() => {
    const obtenerOrder = async () => {
      try {
        const response = await api.get("/orders/" + params.orderId);
        setOrder(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del pedido:", error);
      }
    };

    const obtenerRider = async () => {
      try {
        const response = await api.get("https://randomuser.me/api/");
        setRider(response.data.results[0]);
      } catch (error) {
        console.error("Error al obtener los datos de los productos:", error);
      }
    };
    obtenerOrder();
    obtenerRider();
  }, []);

  useEffect(() => {
    if (!order) return;
    const obtenerRestaurante = async () => {
      try {
        const response = await api.get("/restaurant/" + order.restaurante);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los productos:", error);
      }
    };

    obtenerRestaurante();
  }, [order]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className={styles.viewport}>
        <header className={styles.confirmationHeader}>
          <div className={styles.h1Container}>
            <h1>Tu pedido ha sido confirmado </h1>{" "}
          </div>
        </header>
        <img className={styles.wavySvg} src={wavySvg} alt="" />
        <main className={styles.mainContainer}>
          <div className={styles.listContainer}>
            <ul className={`${styles.orderList} ${styles.itemList} `}>
              <div>
                <h2>Detalle del pedido</h2>
              </div>
              {order &&
                order.productList.slice(0, -2).map((e) => {
                  return (
                    <li key={e.producto._id}>
                      <div className={styles.individualItemContainer}>
                        <p>
                          {e.ammount} x {e.producto.nombre}
                          <b> {e.producto.precio}€</b>
                        </p>
                      </div>
                    </li>
                  );
                })}
              <div className={styles.individualItemContainer}>
                <p>
                  Tasas de transporte{" "}
                  <b>
                    {order && order.productList.slice(-2)[0].transportPrice}
                  </b>
                </p>
              </div>
              <div className={styles.transportFees}>
                Precio total{" "}
                {order && order.productList.slice(-1)[0].totalPrice}€
              </div>
            </ul>
          </div>
          <div className={styles.extraInfo}>
            {restaurant && (
              <div className={styles.itemList}>
                <h2>Datos del restaurante</h2>
                <div className={styles.restaurantInfo}>
                  <img
                    className={styles.restaurantIcon}
                    src={restaurant.img}
                    alt=""
                  />
                  <p>
                    <b>
                      {restaurant.brandName} <br />{" "}
                    </b>
                    {restaurant.direccion}
                  </p>
                </div>
              </div>
            )}
            {rider && (
              <div className={styles.itemList}>
                <h2>Datos del repartidor</h2>
                <div className={styles.restaurantInfo}>
                  <img
                    className={styles.restaurantIcon}
                    src={rider.picture.large}
                    alt=""
                  />
                  <p>
                    <b>
                      {rider.name.first} {rider.name.last}
                      <br />
                    </b>{" "}
                    Llegará en 15 minutos
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
}
