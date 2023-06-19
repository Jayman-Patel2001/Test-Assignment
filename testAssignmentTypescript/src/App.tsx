import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ForgetPass from "./components/ForgetPass";
import Form from "./components/Form";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (email, password, setEmail, setPassword) => {
    //! Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/i;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    //! Password validation
    if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    //! Make a POST request to the login API
    fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Login Sucessfull");

          //! Reset form fields
          setIsLoggedIn(true);
          setLoginError("");
          setEmail("");
          setPassword("");
          navigate("/form");
        } else {
          setLoginError("Invalid Credentials");
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute authenticated={isLoggedIn} />}>
          <Route
            path="/form"
            element={<Form isLoggedIn={isLoggedIn} />}
            exact
          />
          <Route path="*" element={<Navigate to="/form" />} />
        </Route>
        <Route path="/forpass" element={<ForgetPass />} />
        <Route
          path="/"
          element={
            <Login
              handleLogin={handleLogin}
              loginError={loginError}
              setLoginError={setLoginError}
              setPasswordError={setPasswordError}
              passwordError={setPasswordError}
              setEmailError={setEmailError}
              emailError={emailError}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
