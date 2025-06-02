import { Outlet } from "react-router-dom";
import axios from "axios";
import {useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  

    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
        });
        dispatch(addUser(res.data));

      } catch (error) {
        if (error.response?.status === 401) {
          // Only redirect to login if not already on login page
          if (location.pathname !== "/login") {
            navigate("/login");
          }
        }
        console.error("Error fetching user:", error);
      };
  };

  // After the component is loaded , this useEffect will be called and fetch the user data
  // After the component is loaded, this useEffect will be called and fetch the user data
  useEffect(() => {
    // Don't fetch user data if already on login page or if user data already exists
    if (!userData && location.pathname !== "/login") {
      fetchUser();
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Body;
