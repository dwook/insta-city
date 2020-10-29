import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "./slice";

const Auth = () => {
  const user = useSelector((state) => state.user.userObj);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logInWithEmailError = useSelector((state) => state.user.logInError);
  const signUpWithEmailError = useSelector((state) => state.user.signUpError);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (user) {
      console.log("로그인", email, password);
      dispatch(userAction.logInWithEmailRequest({ email, password }));
    } else {
      console.log("회원가입", email, password);
      dispatch(userAction.signUpWithEmailRequest({ email, password }));
    }
  };

  return (
    <div className="authContainer">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={user ? "로그인" : "계정생성"} />
        {logInWithEmailError}
        {signUpWithEmailError}
      </form>
    </div>
  );
};

export default Auth;
