import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "./slice";
import { Description } from "components/atoms/Typography";
import { Input } from "components/atoms/Input";
import { Button } from "components/atoms/Button";

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userObj);
  const logInWithEmailError = useSelector((state) => state.user.logInError);
  const signUpWithEmailError = useSelector((state) => state.user.signUpError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <Container>
      <Description>계정을 만들고 장소를 모아보세요!</Description>
      <form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <Button>로그인</Button>
        {logInWithEmailError}
        {signUpWithEmailError}
      </form>
    </Container>
  );
};

export default Auth;

const Container = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
`;
