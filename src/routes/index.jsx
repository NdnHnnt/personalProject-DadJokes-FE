import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import SignIn from "../pages/FormSignIn";
import Logout from "../pages/FormLogout";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/HomeProtected";
import SignUp from "../pages/FormSignUp";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/", // This is the protected route wrapper
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/", // This is the landing page for authenticated users
          element: <Dashboard />,
        },
        {
          path: "/kuku", // This is the landing page for authenticated users
          element: <div>Kuku</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  let authenticatedRoutes = routesForPublic; // Start with public routes

  if (token) {
    authenticatedRoutes = routesForAuthenticatedOnly;
  } else {
    authenticatedRoutes = routesForPublic.concat(routesForNotAuthenticatedOnly);
  }
  const router = createBrowserRouter(authenticatedRoutes);

  console.log(token); // This should be placed outside the function call

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
