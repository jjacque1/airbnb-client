import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function EditPlacePage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handlePerksChange(event) {
    const { checked, name } = event.target;

    if (checked) {
      setPerks((prevPerks) => [...prevPerks, name]);
    } else {
      setPerks((prevPerks) => prevPerks.filter((perk) => perk !== name));
    }
  }

  function handleAddPhoto(event) {
    event.preventDefault();

    if (!photoLink) return;

    setPhotos((prevPhotos) => [...prevPhotos, photoLink]);
    setPhotoLink("");
  }

  function handleRemovePhoto(indexToRemove) {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      if (
        !title ||
        !address ||
        !description ||
        !checkIn ||
        !checkOut ||
        !maxGuests ||
        !price ||
        photos.length === 0
      ) {
        setError("Please fill out all fields.");
        setSubmitting(false);
        return;
      }

      const updatedPlace = {
        title,
        address,
        description,
        perks,
        extraInfo,
        checkIn: Number(checkIn),
        checkOut: Number(checkOut),
        maxGuests: Number(maxGuests),
        price: Number(price),
        photos,
      };

      await api.patch(`/places/${id}`, updatedPlace);
      setSuccess("Listing edited successfully");

      setTimeout(() => {
        navigate("/user/places");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    async function fetchUserPlace() {
      try {
        const response = await api.get(`/places/${id}`);
        const placeData = response.data.place;

        setTitle(placeData.title);
        setAddress(placeData.address);
        setDescription(placeData.description);
        setPerks(placeData.perks || []);
        setExtraInfo(placeData.extraInfo);
        setCheckIn(placeData.checkIn);
        setCheckOut(placeData.checkOut);
        setMaxGuests(placeData.maxGuests);
        setPrice(placeData.price);
        setPhotos(placeData.photos);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    }

    fetchUserPlace();
  }, [id]);

  return (
    <form className="add-place-page" onSubmit={handleSubmit}>
      <h1>Edit Listing</h1>

      {/* Photos */}
      <div className="add-place-form-group">
        <label htmlFor="photoLink">Photos</label>

        <div className="add-photo-row">
          <input
            type="text"
            id="photoLink"
            placeholder="Add image URL"
            value={photoLink}
            onChange={(event) => setPhotoLink(event.target.value)}
          />
          <button type="button" onClick={handleAddPhoto}>
            Add Photo
          </button>
        </div>

        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo} alt="place" className="placeIMG" />

            <button
              type="button"
              className="remove-photo-btn"
              onClick={() => handleRemovePhoto(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="add-place-form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Add title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      {/* Address */}
      <div className="add-place-form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="Add address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>

      {/* Description */}
      <div className="add-place-form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Add description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      {/* Perks */}
      <div className="add-place-form-group">
        <p>Amenities</p>

        <div className="perks-grid">
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={perks.includes("wifi")}
              onChange={handlePerksChange}
            />
            Wifi
          </label>

          <label>
            <input
              type="checkbox"
              name="parking"
              checked={perks.includes("parking")}
              onChange={handlePerksChange}
            />
            Parking
          </label>

          <label>
            <input
              type="checkbox"
              name="tv"
              checked={perks.includes("tv")}
              onChange={handlePerksChange}
            />
            TV
          </label>
          <label>
            <input
              type="checkbox"
              name="pets"
              checked={perks.includes("pets")}
              onChange={handlePerksChange}
            />
            Pets allowed
          </label>

          <label>
            <input
              type="checkbox"
              name="entrance"
              checked={perks.includes("entrance")}
              onChange={handlePerksChange}
            />
            Private entrance
          </label>

          <label>
            <input
              type="checkbox"
              name="kitchen"
              checked={perks.includes("kitchen")}
              onChange={handlePerksChange}
            />
            Kitchen
          </label>

          <label>
            <input
              type="checkbox"
              name="ac"
              checked={perks.includes("ac")}
              onChange={handlePerksChange}
            />
            Air conditioning
          </label>

          <label>
            <input
              type="checkbox"
              name="pool"
              checked={perks.includes("pool")}
              onChange={handlePerksChange}
            />
            Pool
          </label>

          <label>
            <input
              type="checkbox"
              name="washer"
              checked={perks.includes("washer")}
              onChange={handlePerksChange}
            />
            Washer
          </label>
        </div>
      </div>

      {/* Extra Info */}
      <div className="add-place-form-group">
        <label htmlFor="extraInfo">Extra Info</label>
        <textarea
          id="extraInfo"
          placeholder="Additional info"
          value={extraInfo}
          onChange={(event) => setExtraInfo(event.target.value)}
        />
      </div>

      {/* Check In */}
      <div className="add-place-form-group">
        <label htmlFor="checkIn">Check in</label>
        <input
          type="number"
          id="checkIn"
          min={0}
          value={checkIn}
          onChange={(event) => setCheckIn(event.target.value)}
        />
      </div>

      {/* Check Out */}
      <div className="add-place-form-group">
        <label htmlFor="checkOut">Check out</label>
        <input
          type="number"
          id="checkOut"
          min={0}
          value={checkOut}
          onChange={(event) => setCheckOut(event.target.value)}
        />
      </div>

      {/* Guests */}
      <div className="add-place-form-group">
        <label htmlFor="maxGuests">Max Guests</label>
        <input
          type="number"
          id="maxGuests"
          min={0}
          value={maxGuests}
          onChange={(event) => setMaxGuests(event.target.value)}
        />
      </div>

      {/* Price */}
      <div className="add-place-form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          min={0}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <button type="submit" className="form-submit-btn" disabled={submitting}>
        {submitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
