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
  const userData = useSelector((store) => store.user);
  

    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
        });
        dispatch(addUser(res.data));

      } catch (error) {
        if(error.response.status === 401){
          navigate("/login");
        }
        console.log(error);
      };
  };

  // After the component is loaded , this useEffect will be called and fetch the user data
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);


  return (
      <div>
          <Navbar />
          <Outlet />
          <Footer />
    </div>
  )
}

export default Body;
