import axios from 'axios';  
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {

  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    setIsLoading(true);
    setError("");

        try {
          const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials: true,
          });
          if (res?.data?.data && Array.isArray(res.data.data)) {
            dispatch(addConnections(res.data.data));
          } else {
            console.error("Invalid connections data structure:", res?.data);
            dispatch(addConnections([]));
          }
        } catch (error) {
          console.error(
            "Error fetching connections:",
            error.response?.data || error.message
          );
          setError("Failed to load connections. Please refresh the page.");
          dispatch(addConnections([]));
        } finally {
          setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchConnections();
    }, [])

  
    if (isLoading && connections === null) {
      return (
        <div className="flex justify-center text-white font-semibold my-10">
          <h1>Loading connections...</h1>
        </div>
      );
  }
  
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center text-white font-semibold my-10">
        <h1 className="text-red-500 mb-4">{error}</h1>
        <button
          className="btn btn-primary"
          onClick={fetchConnections}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Retry"}
        </button>
      </div>
    );
  }

    if (!Array.isArray(connections) || connections.length === 0) {
      return (
        <h1 className="flex justify-center text-white font-semibold my-10">
          No Connections Found!
        </h1>
      );
    }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Connections</h1>

      {connections.map((connection) => {
        if (!connection || !connection._id) {
          return null;
        }

        const { _id } = connection;
        // Handle multiple possible data structures
        const userInfo =
          connection.user ||
          connection.toUserId ||
          connection.fromUserId ||
          connection;

        const {
          firstName = "Unknown",
          lastName = "",
          photoUrl = "/default-avatar.png",
          age,
          gender,
          about = "No description available",
        } = userInfo || {};

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                className="w-20 h-20 rounded-full object-cover"
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
          </div>
        );
      })}
    </div>
  );
}

export default Connections;