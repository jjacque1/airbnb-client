import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Loading from "../components/Loading";

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
    return <Loading/>
  }

  return (
    <div>
      <h1>Destinations and Stays</h1>

      {places.length === 0 ? (
        <p>No listings available yet</p>
      ) : (
        <div className="user-places-list">
          {places.map((place) => (
            <Link
              key={place._id}
              to={`/places/${place._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="place-card">
                <img src={place.photos[0]} alt={place.title} />
                <div className="place-card-body">
                  <h3 className="place-card-title">{place.title}</h3>
                  <p className="place-card-address">{place.address}</p>
                  <p className="place-card-price">
                    ${place.price}
                    <span className="place-card-price-span"> per night</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
