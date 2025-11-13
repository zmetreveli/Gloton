import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

export const getNearbyRestaurants = async () => {
  if (!navigator.geolocation) {
    console.warn("Geolocalización no disponible en este navegador.");
    return [];
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        const radius = 2000;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKey}`;

        try {
          const response = await axios.get(url);
          const results = response.data.results || [];

          console.log("Google API results:", results);

          const mapped = results.map((place) => ({
            _id: place.place_id,
            brandName: place.name,
            address: place.vicinity,
            rating: place.rating,
            votos: place.user_ratings_total || 0,
            transporte: "Google API",
            oferta: false,
            isExternal: true,
            img: place.photos
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${apiKey}`
              : "https://via.placeholder.com/400x200?text=Restaurante",
          }));

          resolve(mapped);
        } catch (error) {
          console.error("Error fetching nearby restaurants:", error);
          resolve([]);
        }
      },
      (error) => {
        console.error("No se pudo obtener la ubicación del usuario:", error);
        resolve([]);
      }
    );
  });
};

export default getNearbyRestaurants;
