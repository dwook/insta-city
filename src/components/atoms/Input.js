import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

export const Input = styled.input`
  padding: 0.5rem;
  border: 0px;
  border-radius: 0.2rem;
  margin: 0;
  transition: box-shadow 0.08s ease-in 0s, color 0.08s ease-in 0s;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 0px 0px 1px,
    rgba(50, 50, 93, 0.05) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  appearance: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.05),
      0 0 0 4px rgba(0, 0, 0, 0.1);
  }
`;

export const Label = styled.label`
  position: absolute;
  font-size: 0;
`;

export const SearchInput = ({
  type,
  name,
  label,
  value,
  onSubmit,
  onChange,
  children,
}) => {
  return (
    <div>
      <SearchInputContainer>
        <form onSubmit={onSubmit}>
          <Label htmlFor={name}>{label}</Label>
          <SearchIcon />
          <Input
            type={type}
            id={name}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
        </form>
        <SelectContainer>{children}</SelectContainer>
      </SearchInputContainer>
    </div>
  );
};

const SearchInputContainer = styled.div`
  position: relative;
  ${Input} {
    width: 100%;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  z-index: 10;
`;

const SelectContainer = styled.div`
  max-height: 230px;
  overflow: scroll;
  position: absolute;
  width: 100%;
  background-color: #fff;
  top: 33px;
  left: 0;
  z-index: 100;
  border-radius: 0.2rem;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 0px 0px 1px,
    rgba(50, 50, 93, 0.05) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  &:empty {
    box-shadow: none;
  }
`;
