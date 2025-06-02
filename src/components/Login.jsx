import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

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
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, email, password },
        {withCredentials: true}
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");

    } catch (error) {
      setError(error?.response?.data || "Signup failed. Please try again."); 
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center my-20">
      <div className="card shadow-xl bg-base-300 w-96">
        <div className="card-body">
          {/* Logo & Title */}
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-primary">
              {isLoginForm ? "🌐Login" : "🌐SignUp"}
            </div>
            <p className="text-sm mt-2 text-gray-400">
              Your dev community is just a login away
            </p>
          </div>

          {/* firstName Input */}
          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs ">
                <div className="label mb-2">
                  <span className="label-text">FirstName </span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter Your FirstName"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              {/* lastName input */}
              <label className="form-control w-full max-w-xs ">
                <div className="label mb-2">
                  <span className="label-text">LastName</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter Your lastName"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

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
              type="passsword"
              value={password}
              placeholder="Enter password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Login Button */}
          <div className="card-actions justify-center mt-4 ">
            <button
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={isLoading}>
              {isLoading ? "Processing..." : isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>

          <p
            className="mx-auto cursor-pointer underline py-2"
            onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm
              ? "New User! signup here "
              : "Existing user login here"}
          </p>

          {/* Error Display */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <div className="text-center">
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
