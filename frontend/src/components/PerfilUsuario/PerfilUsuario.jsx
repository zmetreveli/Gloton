import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import {
  getStorageObject,
  getUserSession,
} from "../../utils/localStorage.utils.js";
import {
  deleteStorageObject,
  setStorageObject,
} from "../../utils/localStorage.utils.js";
import { handleProfileUpdateSubmit } from "../../utils/Usercrud.js";
import { UserContext } from "../../contexts/UserContext.js";
import pencilIcon from "../../assets/icons/pencil-svgrepo-com.svg";
import checkIcon from "../../assets/icons/checkmark-svgrepo-com.svg";
import AddressModal from "../AddressModal";
import useOnclickOutside from "react-cool-onclickoutside";
import CreditCardModal from "../CreditCardModal/index.jsx";
import ChangePasswordModal from "../ChangePasswordModal";
import { handlePasswordChangeSubmit } from "../../utils/Usercrud.js";

Modal.setAppElement("#root");

function PerfilUsuario({
  modalState,
  changeModalState,
  setLogged,

  setIsPerfilUsuarioModalOpen,
}) {
  const { user, setLocalUser } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);
  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const { register, handleSubmit, setValue, reset } = useForm();
  const [userInfo, setUserInfo] = useState("");
  const ref = useOnclickOutside(() => {
    setIsPerfilUsuarioModalOpen(false);
  });

  useEffect(() => {
    const userDataFromToken = getStorageObject("token");
    const userData = getStorageObject("user");

    if (userDataFromToken !== null) {
      setLocalUser(userData);
      setUserInfo(userData);
    }
  }, []);

  const handleEditClick = (field) => {
    setIsEditing(true);
    setEditingField(field);
  };

  const handleSaveClick = async () => {
    try {
      if (!user._id) {
        console.error("ID del usuario no está definido");
        return;
      }

      const token = getStorageObject("token");
      if (!token) {
        console.error("No se encontró el token de autenticación");
        return;
      }

      const updateData = { [editingField]: userInfo[editingField] };

      const updatedUser = await handleProfileUpdateSubmit(
        editingField,
        updateData,
        user._id,
        token
      );

      if (updatedUser) {
        setLocalUser(updatedUser.updatedUser);

        deleteStorageObject("user");
        setStorageObject("user", updatedUser.updatedUser);
      } else {
        throw new Error("No se recibieron datos actualizados del usuario.");
      }

      setIsEditing(false);
      setEditingField(null);
    } catch (error) {
      console.error(
        "Hubo un error al actualizar la información del usuario:",
        error
      );
    }
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true);
    changeModalState(true);
  };

  const handleChange = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [editingField]: e.target.value,
    }));
  };

  const renderEditableField = (field) => {
    if (isEditing && editingField === field) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.userInfoModDiv}
        >
          <input
            className={styles.userInfoModInput}
            type="text"
            value={userInfo[field]}
            onChange={handleChange}
          />
          <button className={styles.saveUserMod} onClick={handleSaveClick}>
            <img className={styles.checkIcon} src={checkIcon} alt="" />
          </button>
        </motion.div>
      );
    } else {
      return (
        <>
          <p className={styles.campoP2} onClick={() => handleEditClick(field)}>
            {userInfo[field] || "Agrega tu teléfono"}
          </p>
          <img className={styles.pencilIcon} src={pencilIcon} alt="" />
        </>
      );
    }
  };

  const handleSaveClickAddress = async (formattedAddress) => {
    try {
      if (!user._id) {
        console.error("ID del usuario no está definido");
        return;
      }

      const token = getStorageObject("token");
      if (!token) {
        console.error("No se encontró el token de autenticación");
        return;
      }

      const updateData = { ["address"]: formattedAddress };

      const updatedUser = await handleProfileUpdateSubmit(
        "address",
        updateData,
        user._id,
        token
      );

      if (updatedUser) {
        setLocalUser(updatedUser.updatedUser);

        deleteStorageObject("user");
        setStorageObject("user", updatedUser.updatedUser);
      } else {
        throw new Error("No se recibieron datos actualizados del usuario.");
      }
      setIsEditing(false);
      setEditingField(null);
    } catch (error) {
      console.error(
        "Hubo un error al actualizar la información del usuario:",
        error
      );
    }
  };

  const handleSaveClickCard = async (cardObject) => {
    try {
      if (!user._id) {
        console.error("ID del usuario no está definido");
        return;
      }

      const token = getStorageObject("token");
      if (!token) {
        console.error("No se encontró el token de autenticación");
        return;
      }

      const updateData = { ["creditCard"]: cardObject };

      const updatedUser = await handleProfileUpdateSubmit(
        "creditCard",
        updateData,
        user._id,
        token
      );

      if (updatedUser) {
        setLocalUser(updatedUser.updatedUser);
        deleteStorageObject("user");
        setStorageObject("user", updatedUser.updatedUser);
      } else {
        throw new Error("No se recibieron datos actualizados del usuario.");
      }
      setIsEditing(false);
      setEditingField(null);
    } catch (error) {
      console.error(
        "Hubo un error al actualizar la información del usuario:",
        error
      );
    }
  };

  const handleFormSubmit = (formData) => {
    setIsUserProfileEditModal(false);
  };

  const closeUserSession = () => {
    deleteStorageObject("user");
    deleteStorageObject("token");
    setLogged(false);
  };

  const handlePasswordChange = async (data) => {
    const user = getUserSession();
    if (!user) {
      console.error("Usuario no encontrado");
      return;
    }

    try {
      await handlePasswordChangeSubmit(data, user, () =>
        setIsChangePasswordModalOpen(false)
      );
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalState}
        onRequestClose={() => changeModalState(false)}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        parentSelector={() => document.querySelector("#root")}
      >
        {" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.everything}
        >
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className={styles.profile}
            ref={ref}
          >
            <div className={styles.flecha}></div>
            {user && (
              <h2 className={styles.profileHeader}>
                ¡Hola{" "}
                {user &&
                  user.firstName.substring(0, user.firstName.indexOf(" "))}
                !
              </h2>
            )}
            <button
              className={styles.logoutButton}
              onClick={() => closeUserSession()}
            >
              Cerrar sesión
            </button>
            <div className={styles.separadorHeader}></div>
            <div className={styles.userInfoContainer}>
              <div className={styles.campoP}>
                <b className={styles.userProfileBold}>Nombre:</b>{" "}
                {renderEditableField("firstName")}
                <br />
              </div>
            </div>
            <div className={styles.userInfoContainer}>
              <div className={styles.campoP}>
                <b className={styles.userProfileBold}>Email:</b>{" "}
                {renderEditableField("email")}
                <br />
              </div>
            </div>
            <div className={styles.userInfoContainer}>
              <p className={styles.campoP}>
                <b className={styles.userProfileBold}>Teléfono:</b>{" "}
                {renderEditableField("phone")}
              </p>
            </div>
            <div className={styles.userInfoContainer}>
              <p className={styles.campoP}>
                <b className={styles.userProfileBold}>Dirección:</b>{" "}
                <p
                  className={styles.campoP2}
                  onClick={() => {
                    setAddressModalIsOpen(true);
                    changeModalState();
                  }}
                >
                  {(user && user.address) || "Agrega tu dirección"}
                </p>
                <img className={styles.pencilIcon} src={pencilIcon} alt="" />
              </p>
            </div>
            <div className={styles.userInfoContainer}>
              <p className={styles.campoP}>
                <b className={styles.userProfileBold}>Tarjeta de crédito:</b>{" "}
                <p
                  className={styles.campoP2}
                  onClick={() => {
                    setCardModalIsOpen(true);
                    changeModalState();
                  }}
                >
                  {user && user.creditCard
                    ? "•••• •••• •••• " + user.creditCard.number.slice(-4)
                    : "Agrega tu tarjeta"}
                </p>
                <img className={styles.pencilIcon} src={pencilIcon} alt="" />
              </p>
            </div>
            <div className={styles.userInfoContainer}>
              <p
                className={styles.campoP2}
                onClick={() => {
                  setIsChangePasswordModalOpen(true);
                  setIsPerfilUsuarioModalOpen(false);
                }}
              >
                <b className={styles.userProfileBold}>Contraseña: •••••••••</b>
              </p>
              <img className={styles.pencilIcon} src={pencilIcon} alt="" />
            </div>
            <div className={styles.separador}></div>
            <div className={styles.preferenceContainer}>
              <div className={styles.preferenceTextContainer}>
                <div className={styles.campoP}>
                  <b className={styles.userProfileBold}>
                    Gestionar preferencias
                  </b>
                </div>
                <p className={styles.managePreferences}>
                  Usamos los datos de clientes para mejorar la experiencia de
                  nuestro servicio y mostrar promociones relevantes.
                </p>
              </div>
              <div className={styles.campoP}>
                <p className={styles.preferenceDescription}>
                  Glotón puede compartir datos de usuario (como teléfonos,
                  identificadores de dispositivos o e-mails cifrados) con
                  Facebook y plataformas similares para personalizar los
                  anuncios y contenidos, medir su eficacia y crear audiencias.
                  Siempre puedes optar por no recibir este tipo de
                  comunicaciones desactivando esta opción.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Modal>

      <AddressModal
        addressModalIsOpen={addressModalIsOpen}
        closeAddressModal={() => setAddressModalIsOpen(false)}
        handleSaveClickAddress={handleSaveClickAddress}
        changeModalState={changeModalState}
      />

      <CreditCardModal
        cardModalIsOpen={cardModalIsOpen}
        closeCardModal={() => setCardModalIsOpen(false)}
        handleSaveClickCard={handleSaveClickCard}
      />

      <ChangePasswordModal
        isChangePasswordModalOpen={isChangePasswordModalOpen}
        closeChangePasswordModal={() => setIsChangePasswordModalOpen(false)}
        handleSubmitChangePassword={handlePasswordChange}
      />
    </>
  );
}

export default PerfilUsuario;
