import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function btnlogin(event) {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/logintoken",
      data: {
        email: loginForm.email,
        password: loginForm.password
      }
    })
      .then((response) => {
        console.log(response);
        // Store token in local storage
        props.setToken(response.data.access_token);
        localStorage.setItem('access_token', response.data.access_token);
        alert("Successfully Logged In");
        localStorage.setItem('email', loginForm.email);  // Store email as well for user tracking (optional)
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      });

    // Reset form after submission
    setloginForm({
      email: "",
      password: ""
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  let imgs = [
    "https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg"
  ];

  return (
    <div>
      <div className="container h-50">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={imgs[0]} className="img-fluid" alt="Login" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={handleChange}
                    name="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    name="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={btnlogin}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                    <Link to="/register" className="link-danger">Register</Link> {/* Use Link instead of <a> */}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
