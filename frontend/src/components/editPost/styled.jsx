import styled from "styled-components";

export const Main = styled.div`
  position: fixed;
  width: 350px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--background);
  color: var(--color);
  z-index: 99999;
  & h1 {
    border-bottom: 1px solid rgb(182, 182, 182);
    text-align: center;
    font-weight: 500;
    padding: 10px;
    cursor: pointer;
  }
  & .red {
    color: red;
  }
  & .blue {
    color: var(--blue);
  }
`;

export const Bg = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #000;
  z-index: 9999;
  opacity: 50%;
`;
