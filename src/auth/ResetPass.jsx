import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const emailMatch = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [initVals, setInitVals] = useState({
    form1: true,
    form2: false,
    form3: false,
  });
  const [initPass, setInitPass] = useState({ password: "", cpassword: "" });
  const [textotp, setTextotp] = useState("");
  const [otp, setOtp] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  let newText = "";

  useEffect(() => {
    if (params.get("email")) {
      setEmail(params.get("email"));
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailMatch.test(email)) {
      toast.error("Invalid Email");
      return;
    }
    newText = "";
    for (let i = 0; i < 6; i++) {
      const char = Math.floor(Math.random() * 10);
      newText += char.toString();
    }
    setOtp(newText);

    try {
      setIsLoading2(true);
      const checkMail = await axios.get(
        `${process.env.REACT_APP_URL}/auth/checkMail?email=${email}`
      );
      if (checkMail.data.error) {
        toast.error(checkMail.data.error);
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/sendMail`,
        {
          email: email,
          msg: `Your one time password is ${newText}`,
        }
      );

      if (response) {
        toast.success("OTP sent to your email : " + newText);
        setInitVals({ form1: false, form2: true, form3: false });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading2(false);
    }
  };

  const handleVerify = () => {
    setIsLoading(true);
    if (!textotp) {
      toast.error("Enter OTP");
      return;
    }
    if (textotp.trim() === otp.trim()) {
      setTimeout(() => {
        setInitVals({ form1: false, form2: false, form3: true });
      }, 1000);
    } else {
      toast.error("Wrong OTP");
    }

    setIsLoading(false);
  };

  const handlePassword = async () => {
    if (initPass.password !== initPass.cpassword) {
      toast.error("Passwords do not match");
      return;
    } else if (initPass.password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      setIsLoading1(true);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/auth/reset`,
        {
          email: email,
          password: initPass.password,
        }
      );
      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      toast.success(response.data.success);
      navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading1(false);
    }
  };

  return (
    <div className="w-full h-full flex-center min-h-screen  bg-gradient-to-r from-blue-100 to-blue-200">
      <div className=" ">
        <div
          className={` px-10 py-12  bg-white p-8 rounded-xl shadow-lg w-full max-w-md ${
            initVals.form1 ? "" : "hidden"
          }`}
        >
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
          <p className="mb-3 mt-2 font-medium text-center">
            Welcome to Fomify
          </p>
          <p>Enter your email address associated with Fomify account</p>
          <TextField
            id="outlined-basic"
            placeholder="abc@gmail.com"
            label="Email"
            InputLabelProps={{shrink: true}}
            fullWidth
            size="small"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-8"
            style={{ marginBottom: 6,marginTop:24, height: "50px" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-10"
            onClick={handleSubmit}
            disabled={isLoading2}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              textTransform: "none",
              marginTop: 13 
            }}
          >
            {isLoading2 ? <CircularProgress size={24} style={{ color: "#fff" }}  /> : "Submit"}
          </Button>
        </div>

        {/* Part 2 */}
        <div
          className={`px-10 py-12  bg-white p-8 rounded-xl shadow-lg w-full max-w-md ${
            initVals.form2 ? "" : "hidden"
          }`}
        >
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
          <p className="mb-3 mt-2 font-medium text-center">
            Welcome to Fomify
          </p>
          <p className="font-semibold text-[17px] mb-2">Verification</p>
          <p>Enter your OTP sent to your mail for verification</p>
          <TextField
            id="outlined-basic"
            label="OTP"
            InputLabelProps={{shrink: true}}
            fullWidth
            required
            size="small"
            value={textotp}
            onChange={(e) => setTextotp(e.target.value)}
            className="mt-4"
            style={{ marginBottom: 10,marginTop:24, height: "50px" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-10"
            onClick={handleVerify}
            disabled={isLoading}
            style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                textTransform: "none",
                marginTop: 13 
              }}
          >
            {isLoading ? <CircularProgress style={{ color: "#fff" }}  size={24} /> : "Verify"}
          </Button>
        </div>

        {/* Part 3 */}
        <div
          className={`px-10 py-12  bg-white p-8 rounded-xl shadow-lg w-full max-w-md ${
            initVals.form3 ? "" : "hidden"
          }`}
        >
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
          <p className="mb-3 mt-2 font-medium text-center">
            Welcome to Fomify
          </p>
          <p className="font-semibold text-[17px] mb-2">Reset Password</p>
          <p>Reset your password by entering a strong password</p>
          <div className="flex flex-col mt-4 mb-2">
            <TextField
              placeholder="password"
              type={showPass ? "text" : "password"}
              label="password"
              InputLabelProps={{shrink: true}}
              required
              fullWidth
              size="small"
              value={initPass.password}
              onChange={(e) =>
                setInitPass({ ...initPass, password: e.target.value })
              }
              className="mt-4"
              style={{ marginBottom: 20,marginTop:10 }}
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
            <TextField
              placeholder="confirm password"
              type={showCPass ? "text" : "password"}
              label="confirm password"
              InputLabelProps={{shrink: true}}
              fullWidth
              size="small"
              required
              value={initPass.cpassword}
              onChange={(e) =>
                setInitPass({ ...initPass, cpassword: e.target.value })
              }
              className="mt-4"
              style={{ marginBottom: 10 }}
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
            className="mt-10"
            onClick={handlePassword}
            disabled={isLoading1}
            style={{
                backgroundColor: "#2563eb",
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                textTransform: "none",
                marginTop: 13 
              }}
          >
            {isLoading1 ? <CircularProgress style={{ color: "#fff" }}  size={24} /> : "Change password"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
