import api from "../api/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPlacesPage() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

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

  async function handleDeletePlace(placeId) {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this listing?",
      );

      if (!isConfirmed) return;

      await api.delete(`/places/${placeId}`);

      setPlaces((prevPlace) =>
        prevPlace.filter((place) => place._id !== placeId),
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditPlace(placeId) {
    navigate(`/user/places/${placeId}/edit`);
  }

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
                <button
                  onClick={() => handleDeletePlace(place._id)}
                  className="place-card-delete-btn"
                >
                  Delete listing
                </button>
                <button
                  onClick={() => handleEditPlace(place._id)}
                  className="place-card-edit-btn"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
