import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function MapsComponent({ coordinates }) {
  const position = coordinates;

  return (
    <>
      <APIProvider
        libraries={["places"]}
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      >
        <Map disableDefaultUI={true} center={position} zoom={15}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </>
  );
}

export default MapsComponent;
