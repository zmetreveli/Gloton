import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../HeroPage/styles.module.css";
import flagIcon from "../../assets/icons/flag-svgrepo-com.svg";
import compassIcon from "../../assets/icons/location-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

export default function DirectionBar({ setLocation, setCoordinates }) {
  const { register } = useForm();
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ready, setReady] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch suggestions from Places AutocompleteSuggestion API
  useEffect(() => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/autocomplete?input=${encodeURIComponent(
            value
          )}`
        );
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    fetchSuggestions();
  }, [value]);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // 🧭 Usar ubicación actual: ponemos dirección + coords
  const findMyLocation = () => {
    setIsLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Guardamos coords para que HomePage busque alrededor de aquí
        if (setCoordinates) {
          setCoordinates({ lat, lng });
          console.log("📍 Coords desde geolocalización:", { lat, lng });
        }

        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&location_type=ROOFTOP&result_type=street_address&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`
        )
          .then((res) => res.json())
          .then((data) => {
            setIsLocationLoading(false);
            if (data.results && data.results.length > 0) {
              const address = data.results[0].formatted_address;
              setValue(address);
              if (setLocation) {
                // el segundo argumento es el que ya usabas (false)
                setLocation(address, false);
              }
            } else {
              setValue("");
            }
          })
          .catch((err) => {
            console.error("Error en geocoding de geolocalización:", err);
            setIsLocationLoading(false);
          });
      },
      () => {
        setIsLocationLoading(false);
        console.error("Hubo un error al localizar su dispositivo");
      }
    );
  };

  // 🧠 Cuando el usuario hace click en una sugerencia (ej: "Madrid")
  const handleSelect = async (suggestion) => {
    const fullText = suggestion.placePrediction?.text?.text;

    if (!fullText) {
      setValue("Ubicación desconocida");
      return;
    }

    setValue(fullText);
    setSuggestions([]);

    if (setLocation) {
      setLocation(fullText, false);
    }

    // 👉 Ahora pedimos las coords al BACKEND, no a Google directo
    try {
      const res = await fetch(
        `http://localhost:3001/api/geocode?text=${encodeURIComponent(fullText)}`
      );
      const data = await res.json();

      if (res.ok && data.lat && data.lng) {
        const coords = { lat: data.lat, lng: data.lng };
        console.log(
          "📍 Coords desde dirección seleccionada (backend):",
          coords
        );

        if (setCoordinates) {
          setCoordinates(coords); // 🔥 Esto dispara el useEffect de HomePage
        }
      } else {
        console.warn("⚠️ No se pudieron obtener coords para:", fullText, data);
      }
    } catch (err) {
      console.error("❌ Error geocodificando dirección seleccionada:", err);
    }

    setTimeout(() => {
      navigate("/restaurants");
    }, 500);
  };

  const renderSuggestions = () => {
    return suggestions.map((suggestion, index) => {
      const place = suggestion.placePrediction;
      const mainText = place?.structuredFormat?.mainText?.text;
      const fullText = place?.text?.text;

      if (!fullText) return null;

      return (
        <div
          key={index}
          className="suggestion"
          onClick={() => handleSelect(suggestion)}
        >
          <strong>{mainText || "Sin nombre"}</strong>
          <div>{fullText}</div>
        </div>
      );
    });
  };

  return (
    <>
      <motion.div className={styles.textContainer}>
        <motion.div className={styles.onlyTextContainer} layout>
          <h1>Comida a domicilio y más</h1>
          <p>Tiendas, farmacias, todo!</p>
        </motion.div>
        <motion.div layout className={styles.inputBar}>
          <div className={styles.flagIconContainer}>
            <img className={styles.flagIcon} src={flagIcon} alt="" />
          </div>
          <input
            {...register("location", { required: true })}
            autoComplete="off"
            value={value}
            onChange={handleInput}
            disabled={!ready}
            className={styles.addressInput}
            placeholder="Cuál es tu dirección?"
          />
          {!isLocationLoading ? (
            <AnimatePresence>
              {windowWidth > 900 && !value ? (
                <button
                  transition={{ ease: "easeOut", duration: 0.1 }}
                  onClick={findMyLocation}
                  className={styles.useCurrentLocationButton}
                >
                  <div className={styles.compassIconContainer}>
                    <img
                      className={styles.compassIcon}
                      src={compassIcon}
                      alt=""
                    />
                  </div>
                  <motion.p className={styles.useCurrentLocationText}>
                    Usar la ubicación actual
                  </motion.p>
                </button>
              ) : (
                <button
                  onClick={findMyLocation}
                  className={styles.useCurrentLocationButtonSmall}
                >
                  <div className={styles.compassIconContainer}>
                    <img
                      className={styles.compassIcon}
                      src={compassIcon}
                      alt=""
                    />
                  </div>
                </button>
              )}
            </AnimatePresence>
          ) : (
            <div style={{ marginRight: "15px", marginTop: "5px" }}>
              <BeatLoader color="#09827e" size={5} />{" "}
            </div>
          )}
        </motion.div>
        {suggestions.length > 0 && (
          <ul className={styles.listContainer}>{renderSuggestions()}</ul>
        )}
      </motion.div>
    </>
  );
}
