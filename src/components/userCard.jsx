import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const userCard = ({ user }) => {
  const dispatch = useDispatch();
  // Safely destructure user data with fallbacks
  const {
    _id,
    firstName = "Unknown",
    lastName = "",
    photoUrl = "/default-avatar.png",
    age,
    gender,
    about = "No description available",
    skills,
  } = user || {};

  const handleSendRequest = async (status, userId) => {
    if (!userId || !status) {
      console.error("Invalid parameters for request");
      return;
    }

    
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(
        "Error sending request:",
        error.response?.data || error.message
      );
      alert("Failed to send request. Please try again.");
    }
  };

  // Don't render if no user data
  if (!user || !_id) {
    return (
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">No user data available</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="Profile photo"
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {skills && (
          <p>
            <strong>Skills:</strong>{" "}
            {Array.isArray(skills) ? skills.join(", ") : skills}
          </p>
        )}
        {age && gender && (
          <p>
            <strong>Age:</strong> {age} <strong>Gender:</strong> {gender}
          </p>
        )}
        {about && (
          <p className="overflow-auto">
            <strong>About:</strong> {about}
          </p>
        )}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}>
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default userCard;

