import { useState } from "react";
import styles from "../RestautantCard/styles.module.css";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import likeIcon from "../../assets/icons/like-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// const GOOGLE_PLACES_BASE = "http://localhost:3001/api/google-places";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const GOOGLE_PLACES_BASE = `${API_BASE_URL}/api/google-places`;

export default function RestaurantCard({
  restaurantName,
  restaurantCategory,
  opinionCount,
  likeRatio,
  offer,
  shipping,
  id,
  img,
}) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleClick = async () => {
    // 🔹 Restaurantes de tu BBDD → navegar a la ficha normal
    if (restaurantCategory !== "google") {
      if (id) {
        navigate("/restaurant/" + id);
      } else {
        console.warn("❗ ID del restaurante no definido. No se puede navegar.");
      }
      return;
    }

    // 🔹 Restaurantes de Google → abrir modal con detalles
    try {
      setLoadingDetails(true);
      const res = await fetch(`${GOOGLE_PLACES_BASE}/place/${id}`);
      const data = await res.json();
      setLoadingDetails(false);

      if (!res.ok) {
        console.error("Error detalles Google:", data);
        setDetails(null);
        setShowModal(true);
        return;
      }

      setDetails(data);
      setShowModal(true);
    } catch (err) {
      console.error(
        "Error obteniendo detalles del restaurante de Google:",
        err
      );
      setLoadingDetails(false);
      setDetails(null);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const phoneHref = details?.phone ? `tel:${details.phone}` : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        layout
        className={styles.mainContainer}
        onClick={handleClick}
      >
        <div className={styles.imgContainer}>
          <img
            src={img}
            className={styles.restaurantCardImg}
            alt={`Foto de ${restaurantName}`}
          />
          {restaurantCategory && (
            <p className={styles.restaurantCategory}>{restaurantCategory}</p>
          )}
          {offer && <p className={styles.offer}>{offer}</p>}
        </div>

        <div className={styles.restaurantText}>
          {restaurantName && <h3>{restaurantName}</h3>}
          <div className={styles.secondLine}>
            {likeRatio && (
              <img className={styles.likeIcon} src={likeIcon} alt="like icon" />
            )}
            {likeRatio && <p className={styles.likePercentage}>{likeRatio}</p>}
            {opinionCount && (
              <p className={styles.opinionCounter}>({opinionCount})</p>
            )}
            {shipping && (
              <aside className={styles.scooterAside}>
                <img
                  className={styles.scooterIcon}
                  src={scooterIcon}
                  alt="scooter"
                />
                {shipping}
              </aside>
            )}
          </div>
        </div>
      </motion.div>

      {/* 🟢 MODAL PARA RESTAURANTES DE GOOGLE */}
      {restaurantCategory === "google" && showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              maxWidth: "420px",
              width: "90%",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0, marginBottom: "8px" }}>
              {details?.name || restaurantName}
            </h2>

            <p
              style={{
                margin: 0,
                marginBottom: "8px",
                color: "#555",
                fontSize: "0.9rem",
              }}
            >
              {details?.address || "Dirección no disponible"}
            </p>

            {/* Rating de Google */}
            {details?.rating && (
              <p style={{ margin: "8px 0" }}>
                ⭐ {details.rating} / 5{" "}
                {details.user_ratings_total
                  ? `(${details.user_ratings_total} opiniones)`
                  : ""}
              </p>
            )}

            {/* Estado abierto/cerrado */}
            {details?.open_now !== null && (
              <p
                style={{
                  margin: "4px 0 10px",
                  color: details.open_now ? "#0a8754" : "#c0392b",
                  fontWeight: 600,
                }}
              >
                {details.open_now ? "Abierto ahora" : "Cerrado ahora"}
              </p>
            )}

            {/* Horario */}
            {details?.schedule && details.schedule.length > 0 && (
              <div
                style={{
                  maxHeight: "120px",
                  overflowY: "auto",
                  marginBottom: "12px",
                  borderTop: "1px solid #eee",
                  paddingTop: "8px",
                }}
              >
                {details.schedule.map((line, idx) => (
                  <p key={idx} style={{ margin: "2px 0", fontSize: "0.85rem" }}>
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Teléfono / mensaje */}
            {loadingDetails ? (
              <p>Cargando detalles…</p>
            ) : details?.phone ? (
              <a
                href={phoneHref}
                style={{
                  display: "inline-block",
                  padding: "10px 16px",
                  backgroundColor: "#09827e",
                  color: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                📞 Llamar para reservar
              </a>
            ) : (
              <p style={{ marginTop: "8px" }}>
                ⚠️ No hay teléfono disponible. Puede estar temporalmente cerrado
                o sin datos públicos en Google.
              </p>
            )}

            <button
              onClick={closeModal}
              style={{
                marginTop: "16px",
                background: "transparent",
                border: "none",
                color: "#555",
                cursor: "pointer",
                fontSize: "0.9rem",
                textDecoration: "underline",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// terminado por fin
