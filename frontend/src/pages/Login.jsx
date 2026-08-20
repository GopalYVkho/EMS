import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>Employee Management System</p>
      <p>Login</p>
      <div>
        <label htmlFor="">Email</label>
        <br />
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>

      <div>
        <label htmlFor="password">password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="***********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
