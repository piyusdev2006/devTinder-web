import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useDispatch } from 'react-redux';

const userCard = ({ user }) => {

  
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId))
    } catch (error) {
      console.log(error);
      
    }
  }

    return (
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={user?.photoUrl} alt="Profile photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p className='overflow-auto'>{photoUrl}</p>
          {skills && <p>{skills}</p>}
          {age && gender && (
            <p>
              Age: {age} Gender: {gender}
            </p>
          )}
          {about && <p>{about}</p>}
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

