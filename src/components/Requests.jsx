import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';


const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
    const reviewRequest = async (status, _id) => {

      if (!_id || !status) {
        setError("Invalid request data");
        return;
      }

      setIsLoading(true);
      setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeRequest(_id));
      }
    } catch (error) {
      console.error(
        "Error reviewing request:",
        error.response?.data || error.message
      );
      setError("Failed to process request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received",
                {withCredentials: true}
          );
          
            if (res?.data?.data && Array.isArray(res.data.data)) {
              dispatch(addRequests(res.data.data));
            } else {
              console.error("Invalid requests data structure:", res?.data);
              dispatch(addRequests([]));
            }
       
        } catch (error) {
          console.error(
            "Error fetching requests:",
            error.response?.data || error.message
          );
          setError("Failed to load requests. Please refresh the page.");
            dispatch(addRequests([]));
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchRequests();
    },[])

    if (isLoading && requests === null) {
      return (
        <div className="flex justify-center text-white font-semibold my-10">
          <h1>Loading requests...</h1>
        </div>
      );
   }
  
   if (error) {
     return (
       <div className="flex flex-col justify-center items-center text-white font-semibold my-10">
         <h1 className="text-red-500 mb-4">{error}</h1>
         <button
           className="btn btn-primary"
           onClick={fetchRequests}
           disabled={isLoading}>
           {isLoading ? "Loading..." : "Retry"}
         </button>
       </div>
     );
   }

    
    if (!Array.isArray(requests) || requests.length === 0) {
      return (
        <h1 className="flex justify-center text-white font-semibold my-10">
          No Requests Found!
        </h1>
      );
    }

    return (
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl text-white">Connection Requests</h1>

        {requests.map((request) => {
          if (!request || !request._id) {
            return null;
          }

          const { _id } = request;
          const userInfo = request.fromUserId || request.user || {};
          const {
            firstName = "Unknown",
            lastName = "",
            photoUrl = "/default-avatar.png",
            age,
            gender,
            about = "No description available",
          } = userInfo;

          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
              <div>
                <img
                  className="w-20 h-20 rounded-full"
                  src={photoUrl}
                  alt="photo"
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => reviewRequest("rejected", _id)}
                  disabled={isLoading}>
                  {isLoading ? "..." : "Reject"}
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest("accepted", _id)}
                  disabled={isLoading}>
                  {isLoading ? "..." : "Accept"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
}

export default Requests;
