import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { useEffect, useState } from 'react';


const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  
  const reviewRequest = async (status, _id) => {

    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(
        "Error reviewing request:",
        error.response?.data || error.message
      );
    }
  }


    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/received",
          { withCredentials: true }
        );
        dispatch(addRequests(res.data.data));
      } catch (error) {
        console.error(
          "Error fetching requests:",
          error.response?.data || error.message
        );
      }
    }

    useEffect(() => {
        fetchRequests();
    },[])

    if (!requests) return;
  
    if (requests.length === 0)
      return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

    return (
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl text-white">Connection Requests</h1>

        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
          


          return (
            <div
              key={_id}
              className="flex justify-around items-center m-4 p-5 rounded-lg bg-base-300 w-2/3 mx-auto">
              <div>
                <img
                  className="w-20 h-25 rounded-full"
                  src={photoUrl}
                  alt="photo"
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>
              <div className="text-center mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => reviewRequest("rejected", request._id)}>
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest("accepted", request._id)}>
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
