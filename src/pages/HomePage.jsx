import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Loading from "../components/Loading";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchAllPlaces() {
      try {
        const response = await api.get(`/places?page=${currentPage}&limit=8`);
        setPlaces(response.data.places);
        console.log(response.data);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPlaces();
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
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
      <div className="pagination-controls">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
