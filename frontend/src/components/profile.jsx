import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser) {
      fetch(`http://localhost:5000/users/${storedUser.id}`)
        .then((res) => res.json())
        .then(setUserDetails);
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
