import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Features from "./components/Feature";
import CTA from "./components/CTA";
import SignIn from "./components/FormSignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Fragment>
        <Navbar />
        <Features />
        <CTA />
      </Fragment>
    ),
  },
  {
    path: "/signin",
    element: (
      <Fragment>
        <SignIn />
      </Fragment>
    ),
  },
  {
    path: "/signup",
    element: (
      <Fragment>
        <SignIn />
      </Fragment>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Fragment>
        <Navbar />
      </Fragment>
    ),
  },
  {
    path: "/joke/:id",
    element: (
      <Fragment>
        <Navbar />
      </Fragment>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
