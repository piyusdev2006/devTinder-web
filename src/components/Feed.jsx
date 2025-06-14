import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";



const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return <div>Loading...</div>;;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));

    } catch (error) {
      console.error(
        "Error fetching feed:",
        error.response?.data || error.message
      );
    }
  };


  useEffect(() => {
    getFeed();
  }, []);

  // Add this temporarily for debugging
  console.log("Feed from Redux store:", feed);

  if (!feed) return;
  
  
  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  
  
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
