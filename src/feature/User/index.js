import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "./slice";
import { Description } from "components/atoms/Typography";
import { Input, Label } from "components/atoms/Input";
import { Button } from "components/atoms/Button";

const Auth = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const logInWithEmailError = useSelector((state) => state.user.logInError);
  const signUpWithEmailError = useSelector((state) => state.user.signUpError);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpMode, setSignUpMode] = useState(false);

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

  const onSignUpSubmit = (event) => {
    event.preventDefault();
    console.log("회원가입", email, password);
    dispatch(userAction.signUpWithEmailRequest({ email, password }));
  };

  const onLoginSubmit = (event) => {
    event.preventDefault();
    console.log("로그인", email, password);
    dispatch(userAction.logInWithEmailRequest({ email, password }));
  };

  return (
    <Container>
      {userInfo && (
        <div>
          <div>안녕하세요.</div>
          <div>{userInfo.email}</div>
          <Link>로그아웃</Link>
        </div>
      )}
      {!userInfo && (
        <div>
          <Description>
            <div>계정을 만들면 장소들을 등록하고 모을 수 있어요!</div>
            {!signUpMode && (
              <div>
                아직 계정이 없나요?
                <Link onClick={() => setSignUpMode(true)}>회원가입</Link>
              </div>
            )}
          </Description>
          <FormContainer onSubmit={signUpMode ? onSignUpSubmit : onLoginSubmit}>
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
            <Button>{signUpMode ? "회원가입" : "로그인"}</Button>
          </FormContainer>
        </div>
      )}

      {logInWithEmailError && (
        <ErrorContainer>logInWithEmailError</ErrorContainer>
      )}
      {signUpWithEmailError && (
        <ErrorContainer>signUpWithEmailError </ErrorContainer>
      )}
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
  cursor: pointer;
`;

const FormContainer = styled.form`
  display: flex;
  ${Input} {
    margin-right: 0.5em;
  }
`;

const ErrorContainer = styled.div`
  background: #ffc9c9;
  color: #f03e3e;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.2rem;
`;
