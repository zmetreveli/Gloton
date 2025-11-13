import React, { useContext, useEffect, useState } from "react";
import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import RestaurantGrid from "../RestaurantGrid";
import { getNearbyRestaurants } from "../../utils/fetchRestaurants";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../utils/api";

// Componente principal de la página de inicio
// Aquí se muestran los restaurantes locales y los obtenidos desde Google Places
// También se maneja la búsqueda de restaurantes por nombre
// y la geolocalización del usuario para mostrar restaurantes cercanos
export default function HomePage({ location, searchTerm }) {
  const { user } = useContext(UserContext);
  const [localRestaurants, setLocalRestaurants] = useState([]);
  const [googleRestaurants, setGoogleRestaurants] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      try {
        const [localResponse, googleResults] = await Promise.all([
          api.get("/restaurantes"),
          getNearbyRestaurants(), // ya devuelve formato correcto
        ]);

        setLocalRestaurants(localResponse.data);
        setGoogleRestaurants(googleResults);
      } catch (error) {
        console.error("❌ Error al obtener restaurantes:", error);
      }
    };

    obtenerRestaurantes();
  }, []);

  const allRestaurants = [...localRestaurants, ...googleRestaurants];

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
    >
      <div className={styles.viewport}>
        <div className={styles.homeHeader}>
          <p>
            Entregando a{" "}
            <span className={styles.deliveryAdress}>
              {location || (user && user.address) || "Agregar dirección"}
            </span>
          </p>
        </div>
        <img className={styles.borderImg} src={BorderImg} alt="" />

        {searchTerm ? (
          <RestaurantGrid
            restaurantes={allRestaurants.filter((r) =>
              r.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            gridName={`Tu búsqueda: ${searchTerm}`}
          />
        ) : (
          <>
            <RestaurantGrid
              restaurantes={localRestaurants.slice(0, 8)}
              gridName="Restaurantes recomendados"
            />
            <RestaurantGrid
              restaurantes={googleRestaurants}
              gridName="Opciones populares a tu alrededor"
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
