import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CompareMovies from "./pages/CompareMovies";
import Watchlist from "./pages/Watchlist";
import Watched from "./pages/Watched";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Collections from "./pages/Collections";
import CollectionDetails from "./pages/CollectionDetails";
import PublicCollections from "./pages/PublicCollections";
import SearchCollections from "./pages/SearchCollections";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />

        <Route path="/compare" element={<CompareMovies />} />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watched"
          element={
            <ProtectedRoute>
              <Watched />
            </ProtectedRoute>
          }
        />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

       <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/collections"
  element={
    <ProtectedRoute>
      <Collections />
    </ProtectedRoute>
  }
/>


<Route
  path="/collections/:id"
  element={
    <ProtectedRoute>
      <CollectionDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/public-collections"
  element={
    <ProtectedRoute>
      <PublicCollections />
    </ProtectedRoute>
  }
/>


<Route
  path="/search-collections"
  element={
    <ProtectedRoute>
      <SearchCollections />
    </ProtectedRoute>
  }
/>
      </Routes>
    </>

    
  );
}

export default App;