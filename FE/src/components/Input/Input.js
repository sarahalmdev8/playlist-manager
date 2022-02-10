import React from "react";
import styled from "styled-components";

const Input = styled.input`
  flex: 1;
  border: 0;
  color: #444;
  display: flex;
  height: 1.5rem;
  font-size: 14px;
  margin: 0 0.125rem;
  background-color: #fff;
`;

const Wrapper = styled.div`
  width: 40ch;
  height: 2rem;
  display: flex;
  margin: 0 0.5rem;
  padding: 0 0.25rem;
  flex-direction: row;
  align-items: center;
  border-radius: 0.25rem;
  box-shadow: 0px 1px 2px #8888;
  justify-content: space-between;
`;

export default ({ leftIcon, rightIcon, ...props}) => (
  <Wrapper>
    {leftIcon}
    <Input {...props} />
    {rightIcon}
  </Wrapper>
);
