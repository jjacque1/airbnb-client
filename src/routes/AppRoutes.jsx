import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import AddPlacePage from "../pages/AddPlacePage";
import UserPlacesPage from "../pages/UserPlacesPage";
import EditPlacePage from "../pages/EditPlacePage";
import PlaceDetailsPage from "../pages/PlaceDetailsPage";
import BookingPage from "../pages/BookingsPage";
import BookingDetailPage from "../pages/BookingDetailPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route index element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/places/new"
          element={
            <ProtectedRoute>
              <AddPlacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/places"
          element={
            <ProtectedRoute>
              <UserPlacesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/places/:id/edit"
          element={
            <ProtectedRoute>
              <EditPlacePage />
            </ProtectedRoute>
          }
        />
        <Route path="places/:id" element={<PlaceDetailsPage />} />
        <Route
          path="/user/bookings"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <BookingDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
