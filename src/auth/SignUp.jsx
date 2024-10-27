import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdAccountBalance,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { TOKEN, USER } from "../components/constants";
import { FiFileText } from "react-icons/fi";

const SignUp = () => {
  const [initVals, setInitVals] = useState({
    username: "",
    password: "",
    cpassword: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const navigate = useNavigate();
  const emailMatch = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (initVals.password !== initVals.cpassword) {
      toast.error("Passwords do not match");
      return;
    } else if (!emailMatch.test(initVals.email)) {
      toast.error("Invalid Email");
      return;
    } else if (initVals.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const api = await axios.post(`${process.env.REACT_APP_URL}/auth/signup`, {
        username: initVals.username,
        email: initVals.email,
        password: initVals.password,
      });

      if (api?.data) {
        if (api?.data?.message) {
          dispatch({ type: USER, payload: api?.data?.user });
          dispatch({ type: TOKEN, payload: api?.data?.token });
          toast.success(api?.data?.message);
          setInitVals({
            username: "",
            password: "",
            cpassword: "",
            email: ""})
          navigate("/");
        } else if (api?.data?.error) {
          toast.error(api?.data?.error);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center gap-4 mb-8">
          <FiFileText
            className="text-blue-500 hover:text-blue-600 transition-all duration-300 ease-in-out"
            size={55}
            style={{
              padding: "12px",
              backgroundColor: "#eef2f7",
              borderRadius: "50%",
              border: "3px solid #d1d5db",
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
            }}
          />
          <h1 className="text-4xl max-sm:text-3xl font-bold text-blue-800">Fomify</h1>
        </div>

        <h1 className="text-xl font-semibold text-center mb-6">
          Create Your Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              placeholder="abc@gmail.com"
              fullWidth
              size="small"
              required
              value={initVals.email}
              onChange={(e) =>
                setInitVals({ ...initVals, email: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              className="mb-4"
            />
          </div>

          <div>
            <TextField
              label="Username"
              placeholder="Username"
              id="outlined-basic"
              fullWidth
              size="small"
              required
              value={initVals.username}
              onChange={(e) =>
                setInitVals({ ...initVals, username: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              className="mb-4"
            />
          </div>

          <div>
            <TextField
              label="Password"
              placeholder="Enter password"
              type={showPass ? "text" : "password"}
              fullWidth
              size="small"
              required
              value={initVals.password}
              onChange={(e) =>
                setInitVals({ ...initVals, password: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPass((prev) => !prev)}
                      edge="end"
                    >
                      {showPass ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div>
            <TextField
              label="Confirm Password"
              placeholder="Confirm password"
              type={showCPass ? "text" : "password"}
              fullWidth
              size="small"
              required
              value={initVals.cpassword}
              onChange={(e) =>
                setInitVals({ ...initVals, cpassword: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowCPass((prev) => !prev)}
                      edge="end"
                    >
                      {showCPass ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-6"
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            style={{
              backgroundColor: "#2563eb", // Deep blue
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              "Sign Up"
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <strong
                className="text-blue-500 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
