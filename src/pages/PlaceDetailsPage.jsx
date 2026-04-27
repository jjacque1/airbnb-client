import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function PlaceDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    async function fetchPlace() {
      try {
        const response = await api.get(`/places/${id}`);
        setPlace(response.data.place);
      } catch (error) {
        console.error(error);
        setPlace(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPlace();
  }, [id]);

  if (loading) {
    return (
      <div className="place-details-page">
        <h1 className="place-details-title">Loading listing...</h1>

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

  if (!place) {
    return (
      <div className="place-details-page">
        <h1>Listing not found</h1>
      </div>
    );
  }

  return (
    <div className="place-details-page">
      <h1 className="place-details-title">{place.title}</h1>
      <p className="place-details-address">{place.address}</p>

      <div className="place-details-card">
        <div className="place-img-wrapper">
          <div className="place-detail-main-photo">
            <img src={place.photos[0]} alt={place.title} />
          </div>
        </div>

        <div className="place-details-body">
          <h3>About this place</h3>
          <p>{place.description}</p>

          <h3>Price</h3>
          <p>${place.price} per night</p>

          <h3>Amenities</h3>
          {place.perks.length === 0 ? (
            <p>No amenities listed</p>
          ) : (
            <ul>
              {place.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}