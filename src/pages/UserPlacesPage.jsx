import api from "../api/api";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function UserPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserPlaces() {
      try {
        const response = await api.get("/places/user-places");

        setPlaces(response.data.places);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <Loading/>
  }

  if (places.length === 0) {
    return <p>No listings yet</p>;
  }

  return (
    <div className="user-places-page">
      <h1 className="user-places-title">My Listings</h1>

      <div className="user-places-list">
        {places.map((place) => (
          <div key={place._id} className="place-card">
            <Link
              to={`/places/${place._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
            </Link>

            <div className="place-card-actions">
              <button onClick={() => handleEditPlace(place._id)}>Edit</button>

              <button
                onClick={() => handleDeletePlace(place._id)}
                className="place-card-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
