import * as React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import HomePage from "./components/HomePage";
import ResetPass from "./auth/ResetPass";
import Navbar from "./components/Navbar";
import {} from "react-router-dom";
import Profile from "./components/Profile";
import CreateForm from "./components/CreateForm";
function App() {
  const { pathname } = useLocation();
  const routes = ["/", "/profile"];

  return (
    <div className=" w-full h-full flex flex-col ">
      {routes.includes(pathname) && (
        <div className=" sticky top-0 z-50">
          <Navbar />
        </div>
      )}
      <Routes>
        <Route exact element={<HomePage />} path="/" />
        <Route exact element={<Profile />} path="/profile" />
        <Route exact element={<CreateForm />} path="/create/:id" />


        <Route exact element={<Login />} path="/login" />
        <Route exact element={<SignUp />} path="/signup" />
        <Route exact element={<ResetPass />} path="/resetpass" />

      </Routes>
    </div>
  );
}

export default App;
