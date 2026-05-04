import api from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function BookingDetailPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();

  async function handleCancelBooking() {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!isConfirmed) return;

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await api.patch(`/bookings/${id}/cancel`);

      setBooking((prevBooking) => ({ ...prevBooking, status: "cancelled" }));

      setSuccess("Booking cancelled successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to cancel booking. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

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
    <div className="booking-detail-card">
      <div className="booking-detail-image-wrapper">
        <img
          src={booking.place.photos[0]}
          alt={booking.place.title}
          className="booking-detail-image"
        />
      </div>

      <div className="booking-detail-body">
        <div className="booking-detail-header">
          <h2>{booking.place.title}</h2>
          <span
            className={`booking-card-status ${
              booking.status === "cancelled" ? "cancelled" : ""
            }`}
          >
            {booking.status}
          </span>
        </div>

        <p className="booking-detail-address">{booking.place.address}</p>

        <div className="booking-detail-info-grid">
          <p>
            <strong>Check-in:</strong>{" "}
            {new Date(booking.checkIn).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <p>
            <strong>Check-out:</strong>{" "}
            {new Date(booking.checkOut).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <p>
            <strong>Guests:</strong> {booking.numberOfGuests}
          </p>

          <p>
            <strong>Total:</strong> ${booking.price}
          </p>
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        {booking.status === "active" && (
          <button
            type="button"
            className="booking-cancel-btn"
            onClick={handleCancelBooking}
            disabled={submitting}
          >
            {submitting ? "Cancelling..." : "Cancel Booking"}
          </button>
        )}
      </div>
    </div>
  );
}
