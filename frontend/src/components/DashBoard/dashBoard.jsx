import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { api } from "../../utils/api";
import DashProductCard from "./dashProductCard.jsx";
import productExampleImg from "../../assets/images/productexampleimg.avif";
import ProductModal from "./menuModal.jsx";
import { UserContext } from "../../contexts/UserContext";
import ModifyBusinessModal from "./modifyBusinessModal.jsx";
import { BeatLoader } from "react-spinners";

const DashBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurante, setRestaurante] = useState();
  const [productos, setProductos] = useState([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [areProductsLoading, setAreProductsLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    const obtenerRestaurante = async () => {
      try {
        const response = await api.get(`/restaurantes/${user._id}`);
        setRestaurante(response.data[0]);
      } catch (error) {
        console.error("Error al obtener los datos de los productos:", error);
      }
    };
    obtenerRestaurante();
  }, [user]);

  useEffect(() => {
    if (!restaurante) return;
    const obtenerProductosDelRestaurante = async () => {
      try {
        const response = await api.get(
          "/restaurantes/" + restaurante._id + "/products"
        );
        setProductos(response.data);
        setAreProductsLoading(false);
      } catch (error) {
        console.error(
          "Error al obtener los datos de los productos del restaurante:",
          error
        );
      }
    };

    obtenerProductosDelRestaurante();
  }, [restaurante, productos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurantProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {user && user.role === "RESTAURANT" ? (
        <div className={styles.container}>
          <div
            className={styles.box1}
            onClick={() => setIsBusinessModalOpen(true)}
          >
            {restaurante && (
              <>
                <h2 className={styles.yourBrand}>Tu Negocio</h2>
                <div className={styles.businessItemsContainer}>
                  <div className={styles.businessItemContainer}>
                    <p>Ciudad</p>
                    <input
                      className={styles.leftBoxItem}
                      value={restaurante.city}
                      readOnly
                    />
                  </div>
                  <div className={styles.businessItemContainer}>
                    <p>Categoría</p>
                    <input
                      className={styles.leftBoxItem}
                      value={restaurante.category}
                      readOnly
                    />
                  </div>
                  <div className={styles.businessItemContainer}>
                    <p>Nombre del restaurante</p>
                    <p></p>
                    <input
                      className={styles.leftBoxItem}
                      value={restaurante.brandName}
                      readOnly
                    ></input>
                  </div>
                  <div className={styles.businessItemContainer}>
                    <p>Tasas de transporte</p>
                    <input
                      className={styles.leftBoxItem}
                      value={restaurante.transporte}
                      readOnly
                    />
                  </div>
                  <div className={styles.businessItemContainer}>
                    <p>Oferta</p>
                    <input
                      className={styles.leftBoxItem}
                      value={restaurante.oferta}
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.divFondoPantalla}>
            <div className={styles.buttons}>
              <input
                className={styles.input}
                type="text"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                onClick={() => {
                  setIsMenuModalOpen(true);
                }}
                className={styles.addButton}
              >
                +
              </button>
            </div>

            <div className={styles.carrouselContainer}>
              {productos && productos.length !== 0 ? (
                filteredRestaurantProducts.map((e) => {
                  return (
                    <DashProductCard
                      className={styles.productCard}
                      productos={productos}
                      key={e._id}
                      productName={e.nombre}
                      productDescription={e.descripcion}
                      productPrice={`${e.precio}€`}
                      productImg={productExampleImg}
                      producto={e}
                    />
                  );
                })
              ) : areProductsLoading ? (
                <div>
                  <BeatLoader color="#09827e" size={20} />
                </div>
              ) : (
                <h3>Tus productos aparecerán aqui</h3>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          {" "}
          <div
            style={{ height: "90vh", display: "flex", alignItems: "center" }}
          >
            <h1>Oops! Aqui no hay nada</h1>
          </div>
        </div>
      )}
      <ProductModal
        productos={productos}
        restaurante={restaurante}
        isMenuModalOpen={isMenuModalOpen}
        setIsMenuModalOpen={setIsMenuModalOpen}
        setProductos={setProductos}
      />
      <ModifyBusinessModal
        restaurante={restaurante}
        isBusinessModalOpen={isBusinessModalOpen}
        setIsBusinessModalOpen={setIsBusinessModalOpen}
        setRestaurante={setRestaurante}
      />
    </>
  );
};

export default DashBoard;
