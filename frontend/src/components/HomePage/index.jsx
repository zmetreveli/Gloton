import React, { useContext, useEffect, useState } from "react";
import styles from "../HomePage/styles.module.css";
import BorderImg from "../../assets/images/curve-main--mobile.svg";
import RestaurantGrid from "../RestaurantGrid";
import { getNearbyRestaurants } from "../../utils/fetchRestaurants";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import { api } from "../../utils/api";

// 🔹 Función helper para calcular distancia en METROS entre dos puntos (lat/lng)
function getDistanceMeters(lat1, lng1, lat2, lng2) {
  const toRad = (x) => (x * Math.PI) / 180;

  const R = 6371000; // radio de la Tierra en metros
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// HomePage: BBDD + Google cerca del usuario
export default function HomePage({ location, searchTerm }) {
  const { user } = useContext(UserContext);

  const [localRestaurants, setLocalRestaurants] = useState([]);
  const [googleRestaurants, setGoogleRestaurants] = useState([]);

  const [coordinates, setCoordinates] = useState(null);
  const [isGeoLoading, setIsGeoLoading] = useState(true);

  // 🔹 Filtros para Google
  const [filterType, setFilterType] = useState("all"); // all | restaurant | cafe | bar | bakery
  const [minRating, setMinRating] = useState(0); // 0, 3, 4, 4.5...
  const [priceFilter, setPriceFilter] = useState("any"); // any | cheap | medium | expensive
  const [sortBy, setSortBy] = useState("rating"); // rating | reviews | distance
  const [distanceFilter, setDistanceFilter] = useState("any"); // any | 500 | 1000 | 2000 ...

  // 1) Geolocalización del navegador (solo si aún no tenemos coords)
  useEffect(() => {
    if (coordinates) {
      // Ya tenemos coords → no pedimos otra vez
      setIsGeoLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      console.warn("⚠️ Geolocalización no soportada por este navegador");
      setIsGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        console.log("📍 Coords desde geolocalización:", coords);
        setCoordinates(coords);
        setIsGeoLoading(false);
      },
      (err) => {
        console.error("❌ Error obteniendo geolocalización:", err);
        setIsGeoLoading(false);
      }
    );
  }, [coordinates]);

  // 2) Restaurantes locales desde la BBDD
  useEffect(() => {
    const fetchLocalRestaurants = async () => {
      try {
        const localResponse = await api.get("/restaurantes");
        console.log(
          "📦 Restaurantes locales desde BBDD:",
          localResponse.data?.length
        );
        setLocalRestaurants(localResponse.data || []);
      } catch (error) {
        console.error("❌ Error cargando restaurantes locales:", error);
      }
    };

    fetchLocalRestaurants();
  }, []);

  // 3) Restaurantes de Google cerca del usuario (en bruto)
  useEffect(() => {
    const fetchGoogleRestaurants = async () => {
      if (!coordinates) {
        console.warn(
          "⚠️ HomePage: no hay coords válidas, no se piden restaurantes de Google"
        );
        setGoogleRestaurants([]);
        return;
      }

      try {
        console.log(
          "📡 HomePage: pidiendo restaurantes de Google con coords:",
          coordinates
        );
        const googleResults = await getNearbyRestaurants(
          coordinates.lat,
          coordinates.lng
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

    if (!isGeoLoading) {
      fetchGoogleRestaurants();
    }
  }, [coordinates, isGeoLoading]);

  // 4) Aplicar filtros + distancia a los restaurantes de Google
  const filteredGoogleRestaurants = React.useMemo(() => {
    if (!googleRestaurants || googleRestaurants.length === 0) return [];

    // 4.1 Añadimos distancia (si hay coords y location en el item)
    const withDistance = googleRestaurants.map((r) => {
      if (
        coordinates &&
        r.location &&
        typeof r.location.lat === "number" &&
        typeof r.location.lng === "number"
      ) {
        const dist = getDistanceMeters(
          coordinates.lat,
          coordinates.lng,
          r.location.lat,
          r.location.lng
        );
        return { ...r, distance: dist };
      }
      return { ...r, distance: null };
    });

    // 4.2 Aplicamos filtros
    return withDistance
      .filter((r) => {
        // Filtro por tipo
        if (filterType === "all") return true;
        const types = r.types || [];

        if (filterType === "restaurant") {
          return types.includes("restaurant");
        }
        if (filterType === "cafe") {
          return types.includes("cafe") || types.includes("coffee_shop");
        }
        if (filterType === "bar") {
          return types.includes("bar");
        }
        if (filterType === "bakery") {
          return types.includes("bakery");
        }
        return true;
      })
      .filter((r) => {
        // Filtro por rating mínimo
        const rating = r.puntuacion || 0;
        return rating >= minRating;
      })
      .filter((r) => {
        // Filtro por nivel de precio
        if (priceFilter === "any") return true;
        const lvl = r.price_level;
        if (lvl == null) return true; // si no sabemos el precio, no lo excluimos

        if (priceFilter === "cheap") return lvl <= 1;
        if (priceFilter === "medium") return lvl === 2;
        if (priceFilter === "expensive") return lvl >= 3;

        return true;
      })
      .filter((r) => {
        // Filtro por distancia máxima
        if (distanceFilter === "any") return true;
        const maxDistMeters = parseInt(distanceFilter, 10); // 500, 1000, 2000...
        if (!r.distance && r.distance !== 0) return true; // si no sabemos distancia, no excluimos
        return r.distance <= maxDistMeters;
      })
      .sort((a, b) => {
        // Ordenar
        if (sortBy === "rating") {
          return (b.puntuacion || 0) - (a.puntuacion || 0);
        }
        if (sortBy === "reviews") {
          return (b.votos || 0) - (a.votos || 0);
        }
        if (sortBy === "distance") {
          const da = a.distance ?? Infinity;
          const db = b.distance ?? Infinity;
          return da - db; // de más cerca a más lejos
        }
        return 0;
      });
  }, [
    googleRestaurants,
    coordinates,
    filterType,
    minRating,
    priceFilter,
    sortBy,
    distanceFilter,
  ]);

  const allRestaurants = [...localRestaurants, ...filteredGoogleRestaurants];

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

        {/* 🔹 Barra de filtros solo para resultados de Google */}
        {!searchTerm && (
          <div
            style={{
              margin: "12px 0 20px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
              fontSize: "0.9rem",
            }}
          >
            <span style={{ fontWeight: 600 }}>Filtrar por:</span>

            {/* Tipo de negocio */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="restaurant">Restaurantes</option>
              <option value="cafe">Cafeterías / Coffee</option>
              <option value="bar">Bares</option>
              <option value="bakery">Panaderías</option>
            </select>

            {/* Rating mínimo */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
            >
              <option value={0}>Rating: cualquiera</option>
              <option value={3}>⭐ 3.0+</option>
              <option value={4}>⭐ 4.0+</option>
              <option value={4.5}>⭐ 4.5+</option>
            </select>

            {/* Precio */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="any">Precio: cualquiera</option>
              <option value="cheap">💸 Barato</option>
              <option value="medium">💶 Medio</option>
              <option value="expensive">💰 Caro</option>
            </select>

            {/* Distancia */}
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
            >
              <option value="any">Distancia: cualquiera</option>
              <option value="500">≤ 500 m</option>
              <option value="1000">≤ 1 km</option>
              <option value="2000">≤ 2 km</option>
            </select>

            {/* Orden */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rating">Ordenar por rating</option>
              <option value="reviews">Ordenar por nº de opiniones</option>
              <option value="distance">Ordenar por distancia</option>
            </select>
          </div>
        )}

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
              restaurantes={filteredGoogleRestaurants}
              gridName={
                coordinates
                  ? "Opciones populares a tu alrededor"
                  : "Opciones populares (sin ubicación precisa)"
              }
            />
          </>
        )}
      </div>
    </motion.div>
  );
}
