import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useToast } from "../context/ToastContext";
import API from "../api/axios";
import GenrePreferences from "../components/GenrePreferences";

function Profile() {

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  // Edit Profile
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Change Password
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

        showToast(
          "Failed to load profile data",
          "error"
        );

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


      showToast(
        "Profile updated successfully"
      );


    } catch (error) {

      showToast(
        "Failed to update profile",
        "error"
      );

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

      await API.put(
        "/profile/change-password",
        {
          old_password: oldPassword,
          new_password: newPassword,
        }
      );


      showToast(
        "Password changed successfully"
      );


      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");


    } catch (error) {


      showToast(
        "Failed to change password",
        "error"
      );

    }

  };



  if (loading) {

    return <h2>Loading...</h2>;

  }
    return (

    <div className="profile-container">
    

      <h1>👤 My Profile</h1>


      {/* Profile Header */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >

        <h2>Profile Information</h2>


        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "45px",
            marginBottom: "20px",
          }}
        >
          👤
        </div>


        <p>
          <b>ID:</b> {profile.id}
        </p>


        {editMode ? (

          <>

            <label>Username</label>

            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              style={{
                padding:"10px",
                width:"100%"
              }}
            />


            <br/><br/>


            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{
                padding:"10px",
                width:"100%"
              }}
            />


            <br/><br/>


            <button onClick={updateProfile}>
              Save
            </button>


            <button
              onClick={()=>setEditMode(false)}
              style={{
                marginLeft:"10px"
              }}
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


            <button
              onClick={()=>setEditMode(true)}
            >
              ✏ Edit Profile
            </button>


          </>

        )}

      </div>



      {/* Statistics */}


      <div
        style={{
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"20px",
          marginBottom:"30px"
        }}
      >

        <h2>📊 Statistics</h2>


        {stats && (

          <div className="stats-container">


            <div className="stat-card">
              <h3>❤️</h3>
              <p>Favorites</p>
              <h2>{stats.favorites_count}</h2>
            </div>


            <div className="stat-card">
              <h3>📌</h3>
              <p>Watchlist</p>
              <h2>{stats.watchlist_count}</h2>
            </div>


            <div className="stat-card">
              <h3>✅</h3>
              <p>Watched</p>
              <h2>{stats.watched_count}</h2>
            </div>


            <div className="stat-card">
              <h3>⭐</h3>
              <p>Reviews</p>
              <h2>{stats.reviews_count}</h2>
            </div>


          </div>

        )}

      </div>



      {/* Genre Preferences */}

      <GenrePreferences />



      {/* Change Password */}


      <div
        style={{
          marginTop:"30px",
          border:"1px solid #ddd",
          borderRadius:"10px",
          padding:"20px"
        }}
      >

        <h2>🔒 Change Password</h2>


        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e)=>setOldPassword(e.target.value)}
          style={{
            padding:"10px",
            width:"100%"
          }}
        />


        <br/><br/>


        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          style={{
            padding:"10px",
            width:"100%"
          }}
        />


        <br/><br/>


        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          style={{
            padding:"10px",
            width:"100%"
          }}
        />


        <br/><br/>


        <button onClick={changePassword}>
          Update Password
        </button>


      </div>


    </div>

  );

}


export default Profile;