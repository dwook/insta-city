import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "./slice";
import { Description } from "components/atoms/Typography";
import { Input, Label } from "components/atoms/Input";
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
      <Description>
        <div>계정을 만들면 장소들을 등록하고 모을 수 있어요!</div>
        <div>
          아직 계정이 없나요? <Link>회원가입</Link>
        </div>
      </Description>
      <form onSubmit={onSubmit}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <Label htmlFor="password">패스워드</Label>
        <Input
          id="password"
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

const Link = styled.a`
  color: #9245ff;
`;
