import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import styles from "./styles.module.css";

// Icono básico para los markers (para evitar problemas de path)
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapView({ center, restaurants }) {
  // Solo los restaurantes que tengan coords
  const placesWithLocation = (restaurants || []).filter(
    (r) =>
      r.location &&
      typeof r.location.lat === "number" &&
      typeof r.location.lng === "number"
  );

  // Centro por defecto: si no hay coords del user, usamos el primer restaurante
  const mapCenter =
    center && center.lat && center.lng
      ? [center.lat, center.lng]
      : placesWithLocation.length > 0
      ? [placesWithLocation[0].location.lat, placesWithLocation[0].location.lng]
      : [41.3851, 2.1734]; // Barcelona de fallback

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={mapCenter}
        zoom={14}
        scrollWheelZoom={true}
        className={styles.mapContainer}
      >
        <TileLayer
          // Puedes cambiar el proveedor si quieres otro mapa
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        {placesWithLocation.map((r) => (
          <Marker
            key={r._id}
            position={[r.location.lat, r.location.lng]}
            icon={defaultIcon}
          >
            <Popup>
              <strong>{r.brandName}</strong>
              <br />
              {r.address}
              <br />
              {r.puntuacion
                ? `⭐ ${r.puntuacion} (${r.votos || 0} opiniones)`
                : "Sin rating"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
