import styles from "../RestaurantGrid/styles.module.css";
import RestaurantCard from "../RestautantCard";
import { BeatLoader } from "react-spinners";

export default function RestaurantGrid({ gridName, restaurantes }) {
  const DEFAULT_IMG =
    "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=800&auto=format&fit=crop";

  const lista = restaurantes || [];

  return (
    <div className={styles.mainContainer}>
      <h2>{gridName}</h2>

      <div id="grid" className={styles.restaurantGrid}>
        {lista.length > 0 ? (
          lista.map((e) => {
            const finalImg = e.img ? e.img : DEFAULT_IMG;

            return (
              <RestaurantCard
                key={e._id}
                restaurantCardImg={finalImg}
                restaurantCategory={e.categoria}
                restaurantName={e.brandName}
                opinionCount={e.votos}
                likeRatio={e.puntuacion}
                shipping={e.transporte}
                id={e._id}
                img={finalImg}
                transporte={e.transporte}
                offer={e.oferta}
              />
            );
          })
        ) : (
          <div>
            <BeatLoader color="#09827e" size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
