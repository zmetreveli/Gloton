import styles from "../ProductCard/styles.module.css";

export default function ProductCard({
  productName,
  productDescription,
  productPrice,
  productImg,
  setShoppingList,
  shoppingList,
  producto,
  restaurante,
}) {
  const addToCart = () => {
    if (shoppingList.find((e) => e.id === producto._id)) {
      const ProductIndex = shoppingList.findIndex((e) => e.id === producto._id);
      const updatedShoppingList = [...shoppingList];
      updatedShoppingList[ProductIndex].ammount += 1;
      setShoppingList(updatedShoppingList);
    } else {
      setShoppingList([
        ...shoppingList,
        { shop: restaurante._id, id: producto._id, ammount: 1 },
      ]);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.upperContainer}>
        <img
          className={styles.productImg}
          src={producto.img || productImg}
          alt=""
        />
        <div className={styles.textContainer}>
          <h5>{productName}</h5>
          <p className={styles.description}>{productDescription}</p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <aside>{productPrice}</aside>
        <button onClick={addToCart} className={styles.addToCart}>
          +
        </button>
      </div>
    </div>
  );
}
