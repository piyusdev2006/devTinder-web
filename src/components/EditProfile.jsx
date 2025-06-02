import React, { useState } from 'react';
import axios from 'axios';
import UserCard from './userCard'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  // Safely initialize state with fallbacks
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age: age ? parseInt(age) : undefined,
          gender,
          photoUrl,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render if no user data
  if (!user) {
    return (
      <div className="flex justify-center my-20">
        <h1 className="text-xl text-white">Loading profile...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start my-20 gap-10">
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
                type="number"
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
              <select
                value={gender}
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label mb-2">
                <span className="label-text">About </span>
              </div>
              <textarea
                value={about}
                placeholder="Write something about yourself"
                className="textarea textarea-bordered w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label mb-2">
                <span className="label-text">PhotoUrl</span>
              </div>
              <input
                type="url"
                value={photoUrl}
                placeholder="set PhotoUrl"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            {/* update Profile Button */}
            <div className="card-actions justify-center mt-4">
              <button
                className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                onClick={saveProfile}
                disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>

            {/* Error Display */}
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </div>

        {/* Preview Card */}
        <div className="flex justify-center">
          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              age: age ? parseInt(age) : undefined,
              gender,
              about,
              _id: user._id,
            }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
