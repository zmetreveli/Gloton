import styles from "../RestaurantGrid/styles.module.css";
import RestaurantCard from "../RestautantCard";
import { BeatLoader } from "react-spinners";

export default function RestaurantGrid({ gridName, restaurantes }) {
  // Mostrar solo los que tienen imagen válida
  const restaurantesConImagen = (restaurantes || []).filter(
    (e) => e.img && e.img.trim() !== ""
  );

  return (
    <div className={styles.mainContainer}>
      <h2>{gridName}</h2>
      <div id="grid" className={styles.restaurantGrid}>
        {restaurantesConImagen.length !== 0 ? (
          restaurantesConImagen.map(
            (e) => (
              console.log(e),
              (
                <RestaurantCard
                  key={e._id}
                  restaurantCardImg={e.img}
                  restaurantCategory={e.categoria}
                  restaurantName={e.brandName}
                  opinionCount={e.votos}
                  likeRatio={e.puntuacion}
                  shipping={e.transporte}
                  id={e._id}
                  img={e.img}
                  transporte={e.transporte}
                  offer={e.oferta}
                />
              )
            )
          )
        ) : (
          <div>
            <BeatLoader color="#09827e" size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
