import styled from "styled-components";
import { ImSpinner } from "react-icons/im";

export const Loading = () => {
  return (
    <LoadingWrapper>
      <ImSpinner />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: rgba(0, 0, 0, 0.5);
  animation: icon-spin 1s infinite steps(8);
  @keyframes icon-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`;
