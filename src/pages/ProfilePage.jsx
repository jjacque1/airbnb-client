import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleCreateUserListing() {
    navigate("/user/places/new");
  }

  function handleAllUserListings() {
    navigate("/user/places");
  }

  function handlebookings(){
    navigate("/user/bookings")
  }

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-page">
      <h1>Welcome {user.fullName}</h1>
      <p>Email: {user.email}</p>

      <div className="profile-page-actions">
        <button onClick={handleCreateUserListing}>Create a Listing</button>
        <button onClick={handleAllUserListings}>Listings</button>
        <button onClick={handlebookings}>Bookings</button>
      </div>
    </div>
  );
}
