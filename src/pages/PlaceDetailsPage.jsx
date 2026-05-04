import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDifference = checkOutDate - checkInDate;

    numberOfNights = timeDifference / (1000 * 60 * 60 * 24);
  }

  const totalPrice = numberOfNights * place?.price;

  async function handleBooking(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
      setError("Please fill out all booking fields.");
      return;
    }

    if (numberOfNights <= 0) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const bookingData = {
      place: id,
      checkIn,
      checkOut,
      numberOfGuests: Number(numberOfGuests),
      name,
      phone,
      price: totalPrice,
    };

    try {
      await api.post("/bookings", bookingData);
      setSuccess("Booking created successfully!");
      setCheckIn("");
      setCheckOut("");
      setNumberOfGuests(1);
      setName("");
      setPhone("");

      setTimeout(() => {
        navigate("/user/bookings");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  }

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
    return <Loading/>
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

        <form className="booking-form-card" onSubmit={handleBooking}>
          <h3>
            From ${place.price} <span> per night</span>
          </h3>

          <div>
            <label htmlFor="check-in">
              CHECK-IN
              <input
                type="date"
                id="check-in"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </label>

            <label htmlFor="check-out">
              CHECK-OUT
              <input
                type="date"
                id="check-out"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </label>

            <label htmlFor="guests">
              GUESTS
              <input
                type="number"
                id="guests"
                min={1}
                placeholder="1 guest"
                value={numberOfGuests}
                onChange={(event) => setNumberOfGuests(event.target.value)}
              />
            </label>

            <label htmlFor="name">
              NAME
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label htmlFor="phone">
              PHONE
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
          </div>

          {numberOfNights > 0 && (
            <p className="booking-price-summary">
              ${place.price} x {numberOfNights} nights = ${totalPrice}
            </p>
          )}

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <button type="submit">Reserve</button>
        </form>
      </div>
    </div>
  );
}
