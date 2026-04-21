import api from "../api/api";
import { useState, useEffect } from "react";

export default function UserPlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchUserPlaces() {
      try {
        const response = await api.get("/places/user-places");
        setPlaces(response.data.places);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserPlaces();
  }, []);

  return (
    <div className="user-places-page">
      <h1 className="user-places-title">User Listings</h1>

      <div className="user-places-list">
        {places.length === 0 ? (
          <p className="user-places-empty">No listings yet</p>
        ) : (
          places.map((place) => (
            <div key={place._id} className="place-card">
              <img
                src={place.photos[0]}
                alt={place.title}
                className="place-card-image"
              />
              <div className="place-card-body">
                <h3 className="place-card-title">{place.title}</h3>
                <p className="place-card-address">{place.address}</p>
                <p className="place-card-price">${place.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
