import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("singhpiyush@gmail.com");
  const [password, setPassword] = useState("Strong@356");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card shadow-xl bg-base-300 w-96">
        <div className="card-body">
          {/* Logo & Title */}
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-primary">🌐DevSphere</div>
            <p className="text-sm mt-2 text-gray-400">
              Your dev community is just a login away
            </p>
          </div>

          {/* Email Input */}
          <label className="form-control w-full max-w-xs ">
            <div className="label mb-2">
              <span className="label-text">Email address </span>
            </div>
            <input
              type="email"
              value={email}
              placeholder="Enter Your email"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Password Input */}
          <label className="form-control w-full max-w-xs my-2">
            <div className="label mb-2">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Login Button */}
          <div className="card-actions justify-center mt-4 ">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>

          {/* Forgot Password */}
          <p className="text-red-500">{error}</p>
          <div className="text-center mt-2">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
