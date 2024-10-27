import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { FiFileText } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TOKEN, USER } from "../components/constants";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [initVals, setInitVals] = useState({
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const emailMatch = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailMatch.test(initVals.email)) {
      toast.error("Invalid Email");
      return;
    } else if (initVals.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);

      const api = await axios.post(`${process.env.REACT_APP_URL}/auth/login`, {
        email: initVals.email,
        password: initVals.password,
      });

      if (api?.data) {
        if (api?.data?.message) {
          dispatch({ type: USER, payload: api?.data?.user });
          dispatch({ type: TOKEN, payload: api?.data?.token });
          toast.success(api?.data?.message);
          navigate("/");
        } else if (api?.data?.error) {
          toast.error(api?.data?.error);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setTimeout(()=> {
        setIsLoading(false);
      },500);
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
          <h1 className="text-4xl font-bold text-blue-800">Fomify</h1>
        </div>

        <h1 className="text-xl font-semibold text-center mb-6">Login to Your Account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Email"
              id="outlined-basic"
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

          <div className=" w-full flex-end">
            <p
              className="text-blue-500 text-sm font-medium cursor-pointer hover:underline w-fit"
              onClick={() => navigate("/resetpass")}
            >
              Forgot password?
            </p>
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-6"
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              "Login"
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <strong
                className="text-blue-500 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
