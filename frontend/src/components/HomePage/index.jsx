import React, { useContext, useEffect, useState } from "react";
import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import RestaurantGrid from "../RestaurantGrid";
import { getNearbyRestaurants } from "../../utils/fetchRestaurants";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../utils/api";

// HomePage: BBDD + Google cerca de la DIRECCIÓN seleccionada
export default function HomePage({ location, searchTerm, coords }) {
  const { user } = useContext(UserContext);

  const [localRestaurants, setLocalRestaurants] = useState([]);
  const [googleRestaurants, setGoogleRestaurants] = useState([]);

  // 1) Restaurantes locales desde la BBDD
  useEffect(() => {
    const fetchLocalRestaurants = async () => {
      try {
        const localResponse = await api.get("/restaurantes");
        console.log(
          "📦 Restaurantes locales desde BBDD:",
          localResponse.data?.length
        );
        if (localResponse.data?.length) {
          console.log(localResponse.data[0]); // debug
        }
        setLocalRestaurants(localResponse.data || []);
      } catch (error) {
        console.error("❌ Error cargando restaurantes locales:", error);
      }
    };

    fetchLocalRestaurants();
  }, []);

  // 2) Restaurantes de Google cerca de LAS COORDENADAS RECIBIDAS
  useEffect(() => {
    const fetchGoogleRestaurants = async () => {
      if (!coords || !coords.lat || !coords.lng) {
        console.warn(
          "⚠️ HomePage: no hay coords válidas, no se piden restaurantes de Google"
        );
        setGoogleRestaurants([]);
        return;
      }

      try {
        console.log(
          "📡 HomePage: pidiendo restaurantes de Google con coords:",
          coords
        );
        const googleResults = await getNearbyRestaurants(
          coords.lat,
          coords.lng
        );
        console.log(
          "📦 HomePage: restaurantes de Google recibidos:",
          googleResults?.length
        );
        setGoogleRestaurants(googleResults || []);
      } catch (error) {
        console.error("❌ Error cargando restaurantes de Google:", error);
        setGoogleRestaurants([]);
      }
    };

    fetchGoogleRestaurants();
  }, [coords]);

  // ⭐ NORMALIZAMOS LAS IMÁGENES DE GOOGLE (fallback si vienen sin img)
  const DEFAULT_IMG =
    "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const normalizedGoogleRestaurants = googleRestaurants.map((r) => ({
    ...r,
    img: r.img || DEFAULT_IMG,
  }));

  const allRestaurants = [...localRestaurants, ...normalizedGoogleRestaurants];

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
              restaurantes={normalizedGoogleRestaurants}
              gridName={
                coords
                  ? "Opciones populares cerca de tu dirección"
                  : "Opciones populares (elige una dirección)"
              }
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
