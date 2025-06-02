import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';


const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const [showButtons, setShowButtons] = useState(true);
  
    const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
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
      // Issue Fixed: Show user-friendly error message
      alert("Failed to process request. Please try again.");
      
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
          dispatch(addRequests([]));
        
        }
    }

    useEffect(() => {
        fetchRequests();
    },[])

    if (requests === null) {
      return (
        <div className="flex justify-center text-white font-semibold my-10">
          <h1>Loading requests...</h1>
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
          // Fixed: Proper destructuring based on request data structure
          // _id comes from the request object itself
          // User details come from request.fromUserId (the user who sent the request)
          const { _id } = request;
          const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

          return (
            <div
              key={_id}
              className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
              <div>
                <img
                  className="w-20 h-20 rounded-full"
                  src={photoUrl}
                  alt="photo"
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
                  onClick={() => reviewRequest("rejected", _id)}>
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest("accepted", _id)}>
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
}

export default Requests;
