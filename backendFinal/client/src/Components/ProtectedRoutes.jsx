import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import ToDo from "../Components/ToDo"

//this file is handling authentication for the routes
const ProtectedRoute = () => {
  let nav = useNavigate();
  useEffect(() => {
    // axios.defaults.withCredentials = true;
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3000/authCheck`,
    })
      .then((res) => {
        console.warn("PROT ROUTE auth res", res);
        if (res.data.msg !== "good login") {
          nav("/");
        }
      })
      .catch((err) => {
        console.log("useAuth err", err);
      });
  }, []);
  return (
    <>
    {console.log("Protected Route hit ")}
      <ToDo/>
    </>
  );
};
export default ProtectedRoute;