import { useState } from "react";

export default function AddPlacePage() {
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

  return (
    <form>
      <header>
        <h1>Create a Listing</h1>
      </header>
      <div>
        <label htmlFor="photoLink">Photos: </label>
        <input
          type="text"
          id="photoLink"
          placeholder="Add image URL"
          value={photoLink}
          onChange={(event) => setPhotoLink(event.target.value)}
        />
        <button type="button" onClick={handleAddPhoto}>Add Photo</button>
        <p>{JSON.stringify(photos)}</p>
      </div>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          placeholder="add title"
          type="text"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="address">Address: </label>
        <input
          placeholder="add address"
          type="text"
          id="address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <textarea
          placeholder="add description"
          id="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <div>
        <p>Amenities:</p>
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
      </div>
      <div>
        <label htmlFor="extraInfo">Extra Info: </label>
        <textarea
          placeholder="additional info"
          id="extraInfo"
          value={extraInfo}
          onChange={(event) => {
            setExtraInfo(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="checkIn">Check in: </label>
        <input
          id="checkIn"
          placeholder="check in time"
          type="number"
          value={checkIn}
          onChange={(event) => {
            setCheckIn(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="checkOut">Check out: </label>
        <input
          id="checkOut"
          placeholder="check out time"
          type="number"
          value={checkOut}
          onChange={(event) => {
            setCheckOut(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="maxGuests">Max Guests: </label>
        <input
          placeholder="max guests"
          type="number"
          value={maxGuests}
          id="maxGuests"
          onChange={(event) => {
            setMaxGuests(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="price">Price: </label>
        <input
          placeholder="add price"
          type="number"
          value={price}
          id="price"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
      </div>
    </form>
  );
}
