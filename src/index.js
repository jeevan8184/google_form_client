import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import reducer from "./components/redux/redux";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const rootRducer = combineReducers({ reducer });

const store = configureStore({
  reducer: rootRducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <ToastContainer />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </div>
);

