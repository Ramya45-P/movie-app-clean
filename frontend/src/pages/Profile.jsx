import ProfileStats from "../components/ProfileStats";
import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useToast } from "../context/ToastContext";
import API from "../services/api";
import GenrePreferences from "../components/GenrePreferences";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await API.get("/profile/");

        setProfile(profileResponse.data);
        setUsername(profileResponse.data.username);
        setEmail(profileResponse.data.email);

        const statsResponse = await API.get("/profile/stats");
        setStats(statsResponse.data);
      } catch (error) {
        showToast("Failed to load profile data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [showToast]);

  const updateProfile = async () => {
    try {
      const response = await API.put("/profile/", {
        username,
        email,
      });

      setProfile(response.data);
      setEditMode(false);

      showToast("Profile updated successfully");
    } catch (error) {
      showToast("Failed to update profile", "error");
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      showToast(
        "New Password and Confirm Password do not match",
        "error"
      );
      return;
    }

    if (newPassword.length < 6) {
      showToast(
        "Password must be at least 6 characters",
        "error"
      );
      return;
    }

    try {
      await API.put("/profile/change-password", {
        old_password: oldPassword,
        new_password: newPassword,
      });

      showToast("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showToast("Failed to change password", "error");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">

      <h1>👤 My Profile</h1>

      {/* Profile Header */}

      <div className="profile-header">

        <div className="avatar">
          👤
        </div>

        <div className="profile-info">

          <h2>Profile Information</h2>

          <p>
            <b>ID:</b> {profile.id}
          </p>

          {editMode ? (
            <>
              <label>Username</label>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <br />
              <br />

              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <br />
              <br />

              <button onClick={updateProfile}>
                Save
              </button>

              <button
                onClick={() => setEditMode(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>
                <b>Username:</b> {profile.username}
              </p>

              <p>
                <b>Email:</b> {profile.email}
              </p>

              <button onClick={() => setEditMode(true)}>
                ✏ Edit Profile
              </button>
            </>
          )}

        </div>

      </div>

      <br />

      <ProfileStats stats={stats} />
      {/* Genre Preferences */}

      <GenrePreferences />

      {/* Change Password */}

      <div
        style={{
          marginTop: "30px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <h2>🔒 Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <br />
        <br />

        <button onClick={changePassword}>
          Update Password
        </button>
      </div>

      {/* Account Section */}

      <div
        style={{
          marginTop: "30px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <h2>⚙️ Account</h2>

        <p>
          Logged in as <b>{profile.email}</b>
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={{
            background: "#dc3545",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Profile;