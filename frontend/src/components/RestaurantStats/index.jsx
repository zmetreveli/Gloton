import styles from "../RestaurantStats/styles.module.css";

export default function RestaurantStats({ iconSrc, statValue }) {
  return (
    <div className={styles.restaurantStats}>
      <div className={styles.iconContainer}>
        <img src={iconSrc} alt="" />
      </div>
      {statValue}
    </div>
  );
}
