import axios from "axios";

export const getNearbyRestaurants = async () => {
  if (!navigator.geolocation) {
    console.warn("Geolocalización no disponible en este navegador.");
    return [];
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;

        try {
          const response = await axios.get(
            `http://localhost:3001/api/google-places/nearby?lat=${latitude}&lng=${longitude}`
          );
          const results = response.data || [];

          const mapped = results.map((place, i) => {
            console.log("🔍 Google Place result:", place); // <-- LOGEA CADA RESULTADO

            return {
              _id: place?.place_id ?? `google-${i}`,
              brandName: place?.name ?? place.brandName,
              address: place?.vicinity ?? "Sin dirección",
              puntuacion: place?.rating,
              votos: place?.user_ratings_total,
              isExternal: true,
              categoria: "google",
              transporte: place.address,
              oferta: false,
              img: place?.photos?.photo_reference
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${
                    place.photos[0].photo_reference
                  }&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
                : place.img || "https://via.placeholder.com/150",
            };
          });

          resolve(mapped);
        } catch (error) {
          console.error(
            "❌ Error al obtener restaurantes desde el backend:",
            error
          );
          resolve([]);
        }
      },
      (error) => {
        console.error("❌ Error al obtener ubicación:", error);
        resolve([]);
      }
    );
  });
};
