import styles from "../NavBar/styles.module.css";
import SearchBar from "../SearchBar";
import logo from "../../assets/icons/logo.svg";
import userIcon from "../../assets/icons/user-svgrepo-com.svg";
import listIcon from "../../assets/icons/list-ul-alt-svgrepo-com.svg";
import locationIcon from "../../assets/icons/location-pin-svgrepo-com.svg";
import { useState, useContext, useEffect } from "react";
import UserRegisterModal from "../PerfilUsuario/UserRegisterModal";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import { useNavigate } from "react-router-dom";
import UserLoginModal from "../PerfilUsuario/UserLoginModal";
import { AnimatePresence, motion } from "framer-motion";
import OrderHistory from "../PerfilUsuario/OrderHistory";
import { UserContext } from "../../contexts/UserContext";
import shopIcon from "../../assets/icons/shop-svgrepo-com.svg";

export default function NavBar({
  location,
  logged,
  setLogged,
  searchTerm,
  setSearchTerm,
}) {
  const navigate = useNavigate();
  const [isPerfilUsuarioModalOpen, setIsPerfilUsuarioModalOpen] =
    useState(false);
  const [isUserRegisterModalOpen, setIsUserRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [historyModalIsOpen, setHistoryModalIsOpen] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    }
  }, []);

  const handleUserModal = () => {
    setIsPerfilUsuarioModalOpen((currentState) => !currentState);
  };

  const handleRegisterModal = () => {
    setIsUserRegisterModalOpen((currentState) => !currentState);
  };

  if (logged === true) {
    return (
      <>
        <motion.nav
          initial={{ translateY: -100 }}
          animate={{ translateY: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className={styles.navBar}
        >
          <div onClick={() => navigate("/")} className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt="" />
          </div>
          <div className={styles.searchBarContainer}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className={styles.rightContainer}>
            {location && (
              <div className={styles.locationContainer}>
                <img
                  className={styles.locationIcon}
                  src={locationIcon}
                  alt=""
                />
                <p>{location}</p>
              </div>
            )}
            <div className={styles.navBarButtons}>
              {user && user.role === "RESTAURANT" && (
                <button onClick={() => navigate("/dashboard")}>
                  <img className={styles.userIcon} src={shopIcon} alt="" />
                </button>
              )}
              <button onClick={handleUserModal}>
                <img className={styles.userIcon} src={userIcon} alt="" />
              </button>

              <button
                onClick={() => {
                  setHistoryModalIsOpen(true);
                }}
              >
                <img className={styles.listIcon} src={listIcon} alt="" />
              </button>
            </div>
          </div>
        </motion.nav>

        <PerfilUsuario
          modalState={isPerfilUsuarioModalOpen}
          changeModalState={handleUserModal}
          setLogged={setLogged}
          setIsPerfilUsuarioModalOpen={setIsPerfilUsuarioModalOpen}
        />

        <OrderHistory
          historyModalIsOpen={historyModalIsOpen}
          setHistoryModalIsOpen={setHistoryModalIsOpen}
          modalState={isPerfilUsuarioModalOpen}
          changeModalState={handleUserModal}
          setLogged={setLogged}
          setIsPerfilUsuarioModalOpen={setIsPerfilUsuarioModalOpen}
        />
      </>
    );
  } else {
    return (
      <>
        <motion.nav
          initial={{ translateY: -100 }}
          animate={{ translateY: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          exit={{ translateY: -100 }}
          className={styles.navBar}
        >
          <div
            onClick={() => navigate("/")}
            className={styles.logoContainerUnlogged}
          >
            <img className={styles.logoUnlogged} src={logo} alt="" />
          </div>
          <div className={styles.getStartedContainer}>
            <button
              className={styles.getStartedButton}
              onClick={handleRegisterModal}
            >
              Empieza aquí
            </button>
          </div>
        </motion.nav>
        <AnimatePresence>
          {isUserRegisterModalOpen && (
            <UserRegisterModal
              modalState={isUserRegisterModalOpen}
              changeModalState={handleRegisterModal}
              setLogged={setLogged}
              setLoginModalOpen={setLoginModalOpen}
              setIsUserRegisterModalOpen={setIsUserRegisterModalOpen}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          <UserLoginModal
            setLogged={setLogged}
            loginModalOpen={loginModalOpen}
            setLoginModalOpen={setLoginModalOpen}
          />
        </AnimatePresence>
      </>
    );
  }
}
