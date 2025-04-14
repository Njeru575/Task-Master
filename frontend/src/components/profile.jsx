import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  // Get the logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser && storedUser.id) {
      fetch(`http://localhost:5000/api/users/${storedUser.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user details");
          return res.json();
        })
        .then(setUserDetails)
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [storedUser]);

  if (!storedUser) {
    return <p>Please log in to view your profile.</p>;
  }

  if (!userDetails) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      <p><strong>Username:</strong> {userDetails.username}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
    </div>
  );
};

export default Profile;
