import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import {useEffect } from "react";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  

  const fetchUser = async () => {
    if (userData) return;
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
        });
        dispatch(addUser(res.data));

      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        console.error("Error fetching user:", error);
      };
  };

  // After the component is loaded, this useEffect will be called and fetch the user data

  useEffect(() => {
    fetchUser();
  },[]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
