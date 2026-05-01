import api from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function BookingDetailPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await api.get(`/bookings/${id}`);
        setBooking(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setBooking(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!booking) {
    return <p>Booking not found</p>;
  }

  return (
  <div className="booking-detail-page">
    <h1>Booking Details</h1>

    <div className="booking-detail-card">
      <img
        src={booking.place.photos[0]}
        alt={booking.place.title}
        className="booking-detail-image"
      />

      <div className="booking-detail-body">
        <h2>{booking.place.title}</h2>
        <p>{booking.place.address}</p>

        <p>
          Check-in:{" "}
          {new Date(booking.checkIn).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p>
          Check-out:{" "}
          {new Date(booking.checkOut).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <p>Guests: {booking.numberOfGuests}</p>
        <p>Total price: ${booking.price}</p>

        <span
          className={`booking-card-status ${
            booking.status === "cancelled" ? "cancelled" : ""
          }`}
        >
          {booking.status}
        </span>
      </div>
    </div>
  </div>
);
}
