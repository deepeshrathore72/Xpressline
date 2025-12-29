import React from "react";
import { Route } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

export default function ProtectedRoutes({ component: Component, ...rest }) {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      element={<Component cookies={cookies} navigate={navigate} />}
    />
  );
}
