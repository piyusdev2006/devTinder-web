import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";



const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getFeed = async () => {
    if (feed && Array.isArray(feed) && feed.length > 0) return;

    setIsLoading(true);
    setError("");


    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      if (res?.data && Array.isArray(res.data)) {
        dispatch(addFeed(res.data));
      } else {
        console.error("Invalid feed data received:", res?.data);
      }
    } catch (error) {
      console.error(
        "Error fetching feed:",
        error.response?.data || error.message
      );
      dispatch(addFeed([]));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);
  
  if (isLoading && feed === null) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-xl text-white">Loading feed...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center my-10">
        <h1 className="text-xl text-red-500 mb-4">{error}</h1>
        <button
          className="btn btn-primary"
          onClick={getFeed}
          disabled={isLoading}>
          {isLoading ? "Loading..." : "Retry"}
        </button>
      </div>
    );
  }

  if (!Array.isArray(feed) || feed.length <= 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-3xl font-bold">No more users to show</h1>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
  
}

export default Feed;
