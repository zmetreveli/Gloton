import styles from "../RestautantCard/styles.module.css";
import scooterIcon from "../../assets/icons/scooter-svgrepo-com (1).svg";
import likeIcon from "../../assets/icons/like-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GOOGLE_PLACES_BASE = "http://localhost:3001/api/google-places";

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

    // 🔹 Restaurantes de Google → mostrar teléfono o mensaje
    try {
      const res = await fetch(`${GOOGLE_PLACES_BASE}/place/${id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(
          "No se pudo obtener la información de este restaurante. Inténtalo más tarde."
        );
        return;
      }

      if (data.phone) {
        alert(
          `📞 Teléfono de ${data.name}:\n\n${data.phone}\n\nPuedes llamar directamente desde tu móvil.`
        );
      } else {
        let msg = `⚠️ No hay teléfono disponible para ${data.name}.`;

        if (data.open_now === false) {
          msg += "\n\nParece que ahora mismo está cerrado.";
        } else {
          msg += "\n\nPuede estar temporalmente cerrado o sin datos públicos.";
        }

        alert(msg);
      }
    } catch (err) {
      console.error(
        "Error obteniendo detalles del restaurante de Google:",
        err
      );
      alert(
        "No se pudo obtener la información de este restaurante. Inténtalo más tarde."
      );
    }
  };

  return (
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
  );
}
