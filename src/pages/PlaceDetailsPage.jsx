import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function PlaceDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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

    if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
      console.log(
        "checkIn, checkOut, numberOfGuests, name, phone are required to book",
      );
      return;
    }

    if (numberOfNights <= 0) {
      console.log("Invalid date range");
      return;
    }

    const bookingData = {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests: Number(numberOfGuests),
      name,
      phone,
      price: totalPrice,
    };

    try {
      const response = await api.post("/bookings", bookingData);
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error);
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

        {/* Booking form */}

        <form className="booking-card" onSubmit={handleBooking}>
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
          <div>
            {numberOfNights > 0 && (
              <p>
                ${place.price} x {numberOfNights} nights = ${totalPrice}
              </p>
            )}
          </div>

          <button type="submit">Reserve</button>
        </form>
      </div>
    </div>
  );
}
