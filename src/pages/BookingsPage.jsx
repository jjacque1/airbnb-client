import api from "../api/api";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await api.get("/bookings");
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bookings-page">
      <h1 className="bookings-title">All Bookings</h1>

      {bookings.length === 0 ? (
        <p>No Bookings yet</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <img src={booking.place.photos[0]} alt={booking.place.title} />

              <div className="booking-card-body">
                <h3 className="booking-card-title">{booking.place.title}</h3>
                <p className="booking-card-address">{booking.place.address}</p>

                <p className="booking-card-info">
                  {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </p>

                <p className="booking-card-info">
                  Guests: {booking.numberOfGuests}
                </p>

                <p className="booking-card-info">Total: ${booking.price}</p>

                <span
                  className={`booking-card-status ${
                    booking.status === "cancelled" ? "cancelled" : ""
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
