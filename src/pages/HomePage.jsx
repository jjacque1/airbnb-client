import { useState, useEffect } from "react";
import api from "../api/api";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchAllPlaces() {
      try {
        const response = await api.get("/places");
        setPlaces(response.data.places);
      } catch (error) {
        console.error(error);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPlaces();
  }, []);

  if (loading) {
    return (
      <div className="place-details-page">
        <div className="place-card skeleton-card">
          <div className="place-card-image skeleton-image"></div>

          <div className="place-card-body">
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text skeleton-address"></div>
            <div className="skeleton-text skeleton-price"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>All Listings</h1>
      {places?.length === 0 ? (
        <p>No listings available yet</p>
      ) : (
        <div>
          {places.map((place) => (
            <div key={place._id} className="place-card">
              <img src={place.photos[0]} alt={place.title} />
              <div className="place-card-body">
                <h3 className="place-card-title">{place.title}</h3>
                <p className="place-card-address">{place.address}</p>
                <p className="place-card-price">${place.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
