import React from "react";
import { useForm } from "react-hook-form";
import { RxPerson } from "react-icons/rx";
import styles from "../PerfilUsuario/styles.module.css";
import UserRegisterModal from "../PerfilUsuario/UserRegisterModal";

const UserProfileEditModal = ({
  user,
  editingField,
  fieldTitles,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm();
  const title = fieldTitles[editingField] || "Editar Campo";

  return (
    <form className={styles.formSubmitButton} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.tuNombre}>{title}</h2>
      <RxPerson className={styles.personIcon} />
      <input
        className={styles.input}
        {...register(editingField)}
        defaultValue={user[editingField]}
      />
      <div className={styles.separador}></div>
      <div className={styles.submitButton}>
        <button className={styles.guardarCambios} type="submit">
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default UserProfileEditModal;
