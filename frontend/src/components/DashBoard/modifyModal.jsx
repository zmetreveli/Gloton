import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../PerfilUsuario/styles.module.css";
import Modal from "react-modal";
import { modifyProduct } from "../../utils/api";
import { FileUploader } from "react-drag-drop-files";
import exampleImg from "../../assets/icons/image-picture-svgrepo-com.svg";
import axios from "axios";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import useOnclickOutside from "react-cool-onclickoutside";

export default function ModifyProductModal({
  isModifyModalOpen,
  setIsModifyModalOpen,
  producto,
}) {
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

  const ref = useOnclickOutside(() => {
    setIsModifyModalOpen(false);
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

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
            const reqData = {
              nombre: data.name,
              descripcion: data.description,
              precio: data.price,
              categoria: data.category,
              disponibilidad: true,
              ingredientes: data.ingredients,
              img: res.data.url,
            };
            modifyProduct(reqData, producto._id);
          })
          .then(() => {
            setIsLoading(false);
            setIsModifyModalOpen(false);
          })
          .catch((error) => {
            console.error("Error uploading image:", error.response);
          });
      };
      uploadImage();
    } else {
      const reqData = {
        nombre: data.name,
        descripcion: data.description,
        precio: data.price,
        categoria: data.category,
        disponibilidad: true,
        ingredientes: data.ingredients,
      };
      modifyProduct(reqData, producto._id);
      setIsLoading(false);
      setIsModifyModalOpen(false);
    }
  };

  return (
    <Modal
      isOpen={isModifyModalOpen}
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
          <h2 className={styles.hola}>Modifica tu producto</h2>
          <div className={styles.inputContainer}>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("name")}
                type="name"
                placeholder="Nombre del producto"
                defaultValue={producto.nombre}
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("description")}
                type="descripccion"
                placeholder="Descripción"
                defaultValue={producto.descripcion}
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("category")}
                type="category"
                placeholder="Categoría"
                defaultValue={producto.categoria}
                required
              />
            </div>

            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("ingredients")}
                type="ingredients"
                placeholder="Ingredientes"
                defaultValue={producto.ingredientes}
                required
              />
            </div>
            <div className={styles.inputPictureContainer}>
              <input
                className={styles.firstInput}
                {...register("price")}
                type="price"
                placeholder="Precio"
                defaultValue={producto.precio}
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
