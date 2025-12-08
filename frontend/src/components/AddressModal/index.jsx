import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function AddressModal({
  addressModalIsOpen,
  closeAddressModal,
  handleSaveClickAddress,
  optional,
}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (addressModalIsOpen) {
      setValue("");
      setSuggestions([]);
    }
  }, [addressModalIsOpen]);

  useEffect(() => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/autocomplete?input=${encodeURIComponent(value)}`
        );
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error("Error fetching suggestions (AddressModal):", err);
      }
    };

    fetchSuggestions();
  }, [value]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelectSuggestion = (suggestion) => {
    const fullText = suggestion.placePrediction?.text?.text;

    if (!fullText) {
      setValue("");
      return;
    }

    setValue(fullText);
    setSuggestions([]);

    handleSaveClickAddress(fullText);
    closeAddressModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    setIsSubmitting(true);
    handleSaveClickAddress(value);
    setIsSubmitting(false);
    closeAddressModal();
  };

  const renderSuggestions = () => {
    return suggestions.map((suggestion, idx) => {
      const place = suggestion.placePrediction;
      const mainText = place?.structuredFormat?.mainText?.text;
      const fullText = place?.text?.text;

      if (!fullText) return null;

      return (
        <div
          key={idx}
          className={styles.suggestionItem}
          onClick={() => handleSelectSuggestion(suggestion)}
        >
          <strong>{mainText || "Sin nombre"}</strong>
          <div>{fullText}</div>
        </div>
      );
    });
  };

  return (
    <Modal
      isOpen={addressModalIsOpen}
      onRequestClose={closeAddressModal}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      parentSelector={() => document.querySelector("#root")}
    >
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={closeAddressModal}>
          ×
        </button>

        <h2 className={styles.title}>
          {optional ? "Añadir dirección de entrega" : "Tu dirección"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            autoComplete="off"
            placeholder="Escribe tu dirección"
            value={value}
            onChange={handleInputChange}
            className={styles.input}
          />

          {suggestions.length > 0 && (
            <div className={styles.suggestionsContainer}>
              {renderSuggestions()}
            </div>
          )}

          <button
            type="submit"
            className={styles.saveButton}
            disabled={!value || isSubmitting}
          >
            Guardar dirección
          </button>
        </form>
      </div>
    </Modal>
  );
}
