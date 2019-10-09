import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  function handleChange(e) {
    console.log(e);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    console.log(credentials);
  }

  function login(e) {
    e.preventDefault();
    // axiosWithAuth ==> ?? an axios instance; .post() ==> ?? promise
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        // redirect to the apps main page?
        props.history.push("/protected");
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default Login;