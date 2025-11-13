import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getZipCode,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AutoCompleteAdrressInput = ({
  register,
  setFormValue,
  setCoordinates,
  coordinates,
  onRestaurantsFound, // ✅ NUEVA PROP
}) => {
  const [postalCode, setPostalCode] = useState("");
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      componentRestrictions: { country: "es" },
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
    if (!e.target.value) {
      setCoordinates();
    }
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setFormValue("address", description);
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const zipCode = getZipCode(results[0], false);
        if (zipCode) {
          setPostalCode(zipCode);
        } else {
          setPostalCode("");
        }

        const { lat, lng } = getLatLng(results[0]);
        setCoordinates({ lat, lng });

        // ✅ Llamada al backend con coordenadas
        fetch(`/api/google/nearby?lat=${lat}&lng=${lng}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("🍽 Restaurantes encontrados:", data);
            if (onRestaurantsFound) {
              onRestaurantsFound(data);
            }
          })
          .catch((err) => {
            console.error("❌ Error al buscar restaurantes:", err);
          });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <AnimatePresence key={place_id}>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className={styles.individualPlace}
            onClick={handleSelect(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </motion.li>
        </AnimatePresence>
      );
    });

  return (
    <div ref={ref}>
      <input
        {...register("address")}
        autoComplete="off"
        type="text"
        placeholder="Dirección"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        required
      />

      <AnimatePresence>
        {status === "OK" && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", maxHeight: "28%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            className={styles.listContainer}
          >
            {renderSuggestions()}
          </motion.ul>
        )}
      </AnimatePresence>

      {coordinates && (
        <>
          <div className={styles.extraInputs}>
            <input
              {...register("cp")}
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Código postal"
              required
            />
            <input
              {...register("number")}
              type="text"
              placeholder="Número"
              required
            />
          </div>
          <input
            {...register("extra")}
            type="text"
            placeholder="Piso, puerta, indicaciones"
          />
        </>
      )}
    </div>
  );
};

export default AutoCompleteAdrressInput;
