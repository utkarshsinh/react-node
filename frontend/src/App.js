/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { Context } from "./context";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
// import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import View from "./pages/View";
const RequireAuth = ({ children }) => {
  const { state } = useContext(Context);
  console.log(state.auth, "required auth");
  console.log("Full state in RequireAuth:", state);
  return state.auth ? children : <Navigate to="/login" replace />;
};

const OnlyNotAuth = ({ children }) => {
  const { state } = useContext(Context);
  return !state.auth ? children : <Navigate to="/" replace />;
};

// const Home = () => {
//   const { state } = useContext(Context);
//   console.log(state);
//   return <h1>Hello, {state.user.username}!</h1>;
// };

const App = () => {
  // localStorage.clear()
  console.log("App component rendered");
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    console.log("User JSON from localStorage:", userJSON);
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON);
        console.log("Parsed User Object:", user);
        if (user && typeof user === "object") {
          dispatch({
            type: "LOGIN",
            payload: {
              user: user,
              token: user.token || "",
            },
          });
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    } else {
      console.log("No user found in localStorage, auth will be set to false.");
    }
  }, [dispatch]);
  
  
  return (
    <>
      <Navbar auth={state.auth} />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/signup"
          element={
            <OnlyNotAuth>
              <Signup />
            // </OnlyNotAuth>
          }
        />
         <Route
          path="/upload"
          element={
            
              <Upload />
           
          }
        />
              <Route
          path="/view"
          element={
            
              <View />
            
          }
        />

        <Route
          path="/login"
          element={
            <OnlyNotAuth>
              <Login />
            </OnlyNotAuth>
          }
        />
        {/* <Route
          path="/verify/:confirmationToken"
          element={
            <OnlyNotAuth>
              <Confirmation />
            </OnlyNotAuth>
          }
        /> */}
      </Routes>
    </>
  );
};

export default App;