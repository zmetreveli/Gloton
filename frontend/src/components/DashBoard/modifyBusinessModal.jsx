import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../PerfilUsuario/styles.module.css";
import Modal from "react-modal";
import { modifyRestaurant } from "../../utils/api";
import { FileUploader } from "react-drag-drop-files";
import exampleImg from "../../assets/icons/image-picture-svgrepo-com.svg";
import axios from "axios";
import useOnclickOutside from "react-cool-onclickoutside";
import { BeatLoader } from "react-spinners";

export default function ModifyBusinessModal({
  isBusinessModalOpen,
  setIsBusinessModalOpen,
  restaurante,
  setRestaurante,
}) {
  const ref = useOnclickOutside(() => {
    setIsBusinessModalOpen(false);
  });
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fileUploaderStyles = (
    <div className={styles.fileUpload}>
      <p>Arrastra o haz click</p>
      <div>
        <img className={styles.previewImg} src={image || exampleImg} alt="" />
      </div>
    </div>
  );

  useEffect(() => {
    if (!file) return;
    const viewHandler = () => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    };

    viewHandler();
  }, [file]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setRestaurante((prevRestaurante) => ({
      ...prevRestaurante,
      ...data,
    }));

    if (file) {
      const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");

        axios
          .post(
            "https://api.cloudinary.com/v1_1/dakbfqco5/image/upload",
            formData
          )
          .then((res) => {
            const newData = data;
            newData.img = res.data.url;
            modifyRestaurant(newData, restaurante._id);
            setIsBusinessModalOpen(false);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error uploading image:", error.response);
          });
      };
      uploadImage();
    } else {
      modifyRestaurant(data, restaurante._id);
      setIsBusinessModalOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isBusinessModalOpen}
      parentSelector={() => document.querySelector("#root")}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      {" "}
      overlayClassName={styles.modalOverlay}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={styles.everything}
      >
        <motion.form
          initial={{ translateY: 100 }}
          animate={{ translateY: 0 }}
          exit={{ translateY: -100 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className={styles.registerForm}
          ref={ref}
        >
          <h2 className={styles.hola}>Modifica tu negocio</h2>
          {restaurante && (
            <div className={styles.inputContainer}>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("brandName")}
                  type="name"
                  placeholder="Nombre del restaurante"
                  defaultValue={restaurante.brandName}
                  required
                />
              </div>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("city")}
                  type="descripccion"
                  placeholder="Ciudad"
                  defaultValue={restaurante.city}
                  required
                />
              </div>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("category")}
                  type="category"
                  placeholder="Categoría"
                  defaultValue={restaurante.category}
                  required
                />
              </div>

              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("transporte")}
                  type="ingredients"
                  placeholder="Transporte"
                  defaultValue={restaurante.transporte}
                  required
                />
              </div>
              <div className={styles.inputPictureContainer}>
                <input
                  className={styles.firstInput}
                  {...register("oferta")}
                  type="price"
                  placeholder="Oferta"
                  defaultValue={restaurante.oferta}
                  required
                />
              </div>
              <FileUploader
                multiple={false}
                type={["jpeg", "png", "gif", "jpg"]}
                name="file"
                handleChange={(file) => {
                  setFile(file);
                }}
                children={fileUploaderStyles}
                dropMessageStyle={{
                  backgroundColor: "var(--secondary-color)",
                  borderRadius: "20px",
                }}
              />
            </div>
          )}

          <button className={styles.guardarCambios} type="submit">
            {!isLoading ? (
              "Guardar cambios"
            ) : (
              <div style={{ marginTop: "3px", marginRight: "5px" }}>
                <BeatLoader color="#ffffff" size={5} />{" "}
              </div>
            )}
          </button>
        </motion.form>
      </motion.div>
    </Modal>
  );
}
