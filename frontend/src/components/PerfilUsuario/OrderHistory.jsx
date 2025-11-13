import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext.js";
import useOnclickOutside from "react-cool-onclickoutside";
import { api } from "../../utils/api.js";
import axios from "axios";
import { CartContext } from "../../contexts/CartContext.js";
import { useNavigate } from "react-router";

Modal.setAppElement("#root");

function OrderHistory({ historyModalIsOpen, setHistoryModalIsOpen }) {
  const { user } = useContext(UserContext);
  const { setShoppingList } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        const response = await api.get("/restaurantes");
        if (!response) return;
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los restaurantes:", error);
      }
    };
    obtenerRestaurantes();
  }, []);

  useEffect(() => {
    if (!user) return;
    const getOrders = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/users/${user._id}/orders`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        throw error;
      }
    };
    getOrders();
  }, [user, orders]);

  const ref = useOnclickOutside(() => {
    setHistoryModalIsOpen(false);
  });

  function repeatOrder(e) {
    const newCart = [];

    e.productList.forEach((p) => {
      p.producto &&
        newCart.push({
          id: p.producto._id,
          ammount: p.ammount,
          shop: e.restaurante,
        });
    });
    setShoppingList(newCart);
    setHistoryModalIsOpen(false);
    navigate(`/restaurant/${e.restaurante}`);
  }

  return (
    <>
      <Modal
        historyModalIsOpen
        isOpen={historyModalIsOpen}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        parentSelector={() => document.querySelector("#root")}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.everything}
        >
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className={styles.historyContainer}
            ref={ref}
          >
            <h2>Tus pedidos</h2>

            <div className={styles.orderListContainer}>
              {orders.length !== 0 ? (
                orders
                  .slice(0)
                  .reverse()
                  .map((e) => {
                    const restauranteEncontrado = restaurants.find(
                      (r) => r._id === e.restaurante
                    );
                    if (!restauranteEncontrado) {
                      console.warn(
                        `Restaurante con ID ${e.restaurante} no encontrado.`
                      );
                      return null;
                    }
                    return (
                      <div
                        key={e._id}
                        onClick={() => repeatOrder(e)}
                        className={styles.orderContainer}
                      >
                        <h5>{restauranteEncontrado.brandName}</h5>
                        <div className={styles.imgTextContainer}>
                          <img
                            className={styles.restaurantHistoryImg}
                            src={restauranteEncontrado.img}
                            alt=""
                          />
                          <div>
                            <p>{e.productList.length - 2} productos</p>
                            <p>{e.date.split(" ")[0]}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className={styles.containerSinPedidos}>
                  <h3>Tus pedidos aparecerán aquí</h3>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </Modal>
    </>
  );
}

export default OrderHistory;
