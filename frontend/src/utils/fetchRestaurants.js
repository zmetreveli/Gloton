import { api } from "./api";

// Llama a tu backend /nearby y mapea el resultado al formato que usa tu app
export async function getNearbyRestaurants(lat, lng) {
  try {
    const params = { lat, lng };

    console.log("📡 [fetchRestaurants] Llamando a /nearby con:", params);

    const response = await api.get("/nearby", { params });

    const places = response.data || [];

    console.log(
      "📦 [fetchRestaurants] Resultados crudos de Google:",
      places.length
    );

    const mapped = places.map((place) => {
      // Construimos la URL de la foto de Google SOLO si hay photos
      let photoUrl;

      if (place.photos && place.photos.length > 0) {
        const ref = place.photos[0].photo_reference;
        if (ref) {
          photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`;
        }
      }

      const result = {
        _id: place.place_id, // id de Google
        brandName: place.name,
        address: place.vicinity,
        votos: place.user_ratings_total,
        puntuacion: place.rating,
        categoria: "google",
        transporte: "Google API",
        oferta: false,
        img: photoUrl, // 👈 IMPORTANTE: aquí va la de Google o undefined
      };

      console.log("🔍 Google Place result:", result);
      return result;
    });

    return mapped;
  } catch (error) {
    console.error(
      "❌ [fetchRestaurants] Error obteniendo restaurantes:",
      error
    );
    throw error;
  }
}
