import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store => store.user));

  if (!user) {
    return (
      <div className="flex justify-center items-center my-20">
        <div className="text-center">
          <h1 className="text-xl text-white mb-4">Loading profile...</h1>
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  return (
      <div>
        <EditProfile user={user} />
      </div>
    )
}

export default Profile;
