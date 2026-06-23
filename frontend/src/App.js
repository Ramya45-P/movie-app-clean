import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />

        {/* 🔒 Protected Route */}
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;