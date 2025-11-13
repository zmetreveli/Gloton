import styles from "../RestaurantPage/styles.module.css";
import likeIcon from "../../assets/icons/like-svgrepo-com.svg";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import stopwatchIcon from "../../assets/icons/stopwatch-svgrepo-com.svg";
import RestaurantStats from "../RestaurantStats";
import ProductCard from "../ProductCard";
import productExampleImg from "../../assets/images/productexampleimg.avif";
import { React, useState, useEffect, useContext } from "react";
import { api } from "../../utils/api";
import ShoppingCart from "../ShoppingCart";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

export default function RestaurantPage({}) {
  const [restaurante, setRestaurante] = useState();
  const [productos, setProductos] = useState([]);
  const [fix, setFix] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const { shoppingList, setShoppingList } = useContext(CartContext);

  const params = useParams();

  window.addEventListener("scroll", setFixedCart);

  useEffect(() => {
    if (!isLoadingProducts) {
      calculatePrice();
    }
  }, [shoppingList, isLoadingProducts, productos, restaurante]);

  useEffect(() => {
    const obtenerRestaurante = async () => {
      try {
        const response = await api.get("/restaurant/" + params.restaurantId);
        setRestaurante(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los productos:", error);
      }
    };

    const obtenerProductosDelRestaurante = async () => {
      // setIsLoadingProducts(true);
      try {
        const response = await api.get(
          "/restaurantes/" + params.restaurantId + "/products"
        );
        setProductos(response.data);
        setIsLoadingProducts(false);
      } catch (error) {
        console.error(
          "Error al obtener los datos de los productos del restaurante:",
          error
        );
      }
    };

    obtenerProductosDelRestaurante();
    obtenerRestaurante();
  }, [params.restaurantId]);

  function setFixedCart() {
    const dynamicScrollY = calculateDynamicScrollY();
    if (window.scrollY <= dynamicScrollY - 280) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  function calculateDynamicScrollY() {
    const cartContainer = document.getElementById("cartContainer");
    if (cartContainer) {
      return cartContainer.offsetHeight;
    }
    return 0;
  }

  const calculatePrice = () => {
    let fullPrice = 0;

    shoppingList.forEach((e) => {
      if (productos.find((i) => i._id === e.id)) {
        const productPrice = productos.find((i) => i._id === e.id).precio;
        const partialPrice = productPrice * e.ammount;
        fullPrice += partialPrice;
      }
    });

    if (restaurante && restaurante.transporte === "FREE") {
      setTotalPrice(Math.floor(fullPrice * 100) / 100);
    } else {
      restaurante &&
        setTotalPrice(
          Math.floor(
            (fullPrice += parseFloat(
              restaurante.transporte.replace("€", "").replace(",", ".")
            )) * 100
          ) / 100
        );
    }
  };

  {
    return (
      restaurante && (
        <motion.div
          initial={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        >
          <div className={styles.viewport}>
            <header className={styles.header}>
              <div className={styles.content}>
                <address>{restaurante.direccion}</address>
              </div>
              <div className={styles.headerBackgroundContainer}>
                <img
                  className={styles.headerBackgroundImg}
                  src={restaurante.img}
                  alt=""
                />
              </div>
            </header>
            <main>
              <div className={styles.mainRestaurantContent}>
                <section className={styles.restaurantHeader}>
                  <h1>{restaurante.brandName}</h1>
                  <div className={styles.description}>
                    <RestaurantStats
                      iconSrc={likeIcon}
                      statValue={restaurante.puntuacion}
                    />
                    <RestaurantStats
                      iconSrc={stopwatchIcon}
                      statValue="5-10'"
                    />
                    <RestaurantStats
                      iconSrc={scooterIcon}
                      statValue={restaurante.transporte}
                    />
                  </div>
                </section>
                <img src="" alt="" />
                <div id="cartContainer" className={styles.productGrid}>
                  {!isLoadingProducts ? (
                    productos &&
                    productos.map((e) => {
                      return (
                        <ProductCard
                          setShoppingList={setShoppingList}
                          productos={productos}
                          key={e._id}
                          productName={e.nombre}
                          productDescription={e.descripcion}
                          productPrice={`${e.precio}€`}
                          productImg={productExampleImg}
                          producto={e}
                          shoppingList={shoppingList}
                          restaurante={restaurante}
                        />
                      );
                    })
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "188px",
                        paddingTop: "100px",
                      }}
                    >
                      <BeatLoader
                        width="fitContent"
                        color="#09827e"
                        size={20}
                      />{" "}
                    </div>
                  )}
                </div>
              </div>
              <ShoppingCart
                productos={productos}
                shoppingList={shoppingList}
                totalPrice={totalPrice}
                setShoppingList={setShoppingList}
                restaurante={restaurante}
                isLoadingProducts={isLoadingProducts}
                fix={fix}
                calculatePrice={calculatePrice}
              />
            </main>
          </div>
        </motion.div>
      )
    );
  }
}
