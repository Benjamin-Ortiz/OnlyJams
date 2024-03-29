// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  //todo check if username already exists
  //const users = s

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
         // console.log(data.message, 'FROM COMPONENT');
          if (data && data.errors) setErrors(data.errors);
          if (data && data.message) setErrors([data.message]);
          if (data && data.error) setErrors(data.errors.values());

          history.push('/')
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };






  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <ul>
        {errors && errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>

      <div className="labels-container">
      <label>
        First Name
      <input
          type={'text'}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>



      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      </div>

      <button className="submit-button" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
