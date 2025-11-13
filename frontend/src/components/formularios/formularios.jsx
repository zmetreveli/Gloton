import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import {
  emailValidator,
  passwordValidator,
  phoneValidator,
  validateCity,
} from "./validators";
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import Modal from "react-modal";
import useOnclickOutside from "react-cool-onclickoutside";
import { UserContext } from "../../contexts/UserContext";
import { handleInitialRegistrationSubmit } from "../../utils/Usercrud";
import { deleteStorageObject } from "../../utils/localStorage.utils.js";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader } from "react-spinners";

export const Formulario = ({
  formulariosIsOpen,
  setFormulariosIsOpen,
  logged,
  setLogged,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setLocalUser } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const ref = useOnclickOutside(() => {
    setFormulariosIsOpen(false);
  });

  const navigate = useNavigate();
  const discountCode = watch("discountCode");
  const [restaurant, setRestaurant] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const closeUserSession = () => {
    deleteStorageObject("user");
    deleteStorageObject("token");
    setLogged(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    closeUserSession();

    const userData = {
      firstName: data.firstName,
      email: data.email,
      password: data.password,
      role: "RESTAURANT",
      phone: data.phone,
    };

    handleInitialRegistrationSubmit(
      userData,
      (newUser) => {
        setLocalUser(newUser);
        postRestaurantData(newUser._id, data);
        setLogged(true);
      },
      () => {
        // if (typeof closeModal === "function") {
        //   closeModal();
        // }
        // if (typeof changeModalState === "function") {
        //   changeModalState();
        // }
      }
    ).catch((error) => {
      console.error("Error en el registro inicial:", error);
    });
  };

  const postRestaurantData = async (userId, formData) => {
    const modData = { ...formData, transporte: "FREE" };

    try {
      console.log(modData);
      const response = await api.post(`/restaurantes/${userId}`, modData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Respuesta del API", response.data);
    } catch (error) {
      console.error("Error:", error);
      setSubmitError("Error al guardar restaurante.");
    } finally {
      setIsSubmitting(false);
      setFormulariosIsOpen(false);
      setIsLoading(false);
      navigate("../dashboard");
    }
  };

  return (
    <AnimatePresence>
      <Modal
        parentSelector={() => document.querySelector("#root")}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        isOpen={formulariosIsOpen}
      >
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
            ref={ref}
            className={styles.formContainer}
          >
            <h2>Empieza a vender con Gloton</h2>
            <p>
              Registrarse en Gloton nunca ha sido tan fácil. Hazte Partner
              ahora. {watch("")}
            </p>
            <form
              className={styles.formObject}
              onSubmit={handleSubmit(onSubmit)}
            >
              {submitError && <p className={styles.error}>{submitError}</p>}
              <div>
                <label></label>
                <select className={styles.options} {...register("country")}>
                  <option className={styles.individualOption} value="ES">
                    🇪🇸 España
                  </option>
                  <option className={styles.individualOption} value="GEO">
                    🇬🇪 Georgia
                  </option>
                  <option className={styles.individualOption} value="FR">
                    🇫🇷 Francia
                  </option>
                  <option className={styles.individualOption} value="VE">
                    🇻🇪 Venezuela
                  </option>
                </select>
              </div>
              <div>
                <label className={styles.ciudad}></label>
                <input
                  type="text"
                  placeholder="Ciudad"
                  {...register("city", {
                    validate: validateCity,
                  })}
                />
                {errors["city"] && <p>{errors["city"].message}</p>}
              </div>
              <div>
                <label className={styles.negocio}></label>
                <input
                  type="text"
                  placeholder="Nombre del negocio"
                  {...register("brandName")}
                />
              </div>
              <div className={styles.nombreApellidos}>
                <div>
                  <label className={styles.nombre}></label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    {...register("firstName")}
                  />
                </div>
                <div>
                  <label className={styles.apellidos}></label>
                  <input
                    type="text"
                    placeholder="Apellidos"
                    {...register("lastName")}
                  />
                </div>
              </div>
              <div>
                <label className={styles.mail}></label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { validate: emailValidator })}
                />
                {errors["email"] && <p>{errors["email"].message}</p>}
              </div>
              <div>
                <label className={styles.telefono}></label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    validate: passwordValidator,
                  })}
                />
                {errors["password"] && <p>{errors["password"].message}</p>}
              </div>
              <div>
                <label className={styles.telefono}></label>
                <input
                  type="text"
                  placeholder="Teléfono"
                  {...register("phone", {
                    validate: phoneValidator,
                  })}
                />
                {errors["phone"] && <p>{errors["phone"].message}</p>}
              </div>
              <label></label>
              <select
                className={styles.options}
                {...register("category", {
                  required: "Debe seleccionar una categoría",
                })}
              >
                <option className={styles.individualOption} value="category">
                  Tipo de establecimiento
                </option>
                <option className={styles.individualOption} value="restaurante">
                  Restaurante
                </option>
              </select>
              {errors.category && <p>{errors.category.message}</p>}
              <div className={styles.bottomContainer}>
                <div className={styles.codigo}>
                  <input type="checkbox" {...register("discountCode")} />
                  <label className={styles.bottomLabels}>
                    ¿Tienes un código promocional?
                  </label>
                </div>
                {discountCode && (
                  <div className={styles.aplicar}>
                    <input
                      className={styles.codigoPromocionalInput}
                      type="text"
                      placeholder="Codigo Promocional"
                      {...register("discountCode", {})}
                    />
                    <button className={styles.aplicarbtn}>Aplicar</button>
                  </div>
                )}
                <div className={styles.whatsapp}>
                  <input type="checkbox" {...register("whatsapp")} />
                  <label className={styles.bottomLabels}>
                    Acepto recibir actualizaciones de Gloton a través de
                    WhatsApp o plataformas similares
                  </label>
                </div>
                <div className={styles.privacidad}>
                  <input
                    id="privacy"
                    type="checkbox"
                    {...register("privacy", {
                      required: "Debe aceptar la política de privacidad",
                    })}
                  />
                  <label className={styles.bottomLabels}>
                    Acepto la politica de privacidad
                  </label>
                </div>
                {errors.privacy && <p>{errors.privacy.message}</p>}
              </div>
              <div className={styles.submit}>
                <button
                  id={styles.miInputId}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {!isLoading ? (
                    "Registrarse"
                  ) : (
                    <div style={{ marginTop: "3px" }}>
                      <BeatLoader color="#ffffff" size={5} />{" "}
                    </div>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
};

export default Formulario;
