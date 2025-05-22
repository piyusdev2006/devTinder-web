import React, { useState } from 'react';
import axios from 'axios';
import UserCard from './userCard'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {

    const [firstName, setFirstName] =useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();


  const saveProfile = async () => {
    setError("")
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", 
        {
          firstName,
          lastName,
          age,
          gender, 
          photoUrl,
          about
        },
        {withCredentials:true}
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <>
      <div className="flex justify-center my-20">
        <div className="flex justify-center mx-10">
          <div className="card shadow-xl bg-base-300 w-96">
            <div className="card-body">
              {/* Logo & Title */}
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-primary">
                  Edit Profile
                </div>
                <p className="text-sm mt-2 text-gray-400">
                  Edit your profile information.
                </p>
              </div>

              {/* firstName Input */}
              <label className="form-control w-full max-w-xs ">
                <div className="label mb-2">
                  <span className="label-text">First Name </span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter Your First Name"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label mb-2">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter Your Last Name"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs ">
                <div className="label mb-2">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  placeholder="Enter Your correct Age"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label mb-2">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  placeholder="Enter Your Gender"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label mb-2">
                  <span className="label-text">About </span>
                </div>
                <input
                  type="text"
                  value={about}
                  placeholder="Write something about yourself"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label mb-2">
                  <span className="label-text">PhotoUrl</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="set PhotoUrl"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              {/* update Profile Button */}
              <div className="card-actions justify-center mt-4 ">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Update Profile
                </button>
              </div>

              {/* Forgot Password */}
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, photoUrl }} />
      </div>
      {showToast && (<div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>)}
    </>
  );
}

export default EditProfile;
