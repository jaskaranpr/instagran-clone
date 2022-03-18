import styled from "styled-components";

export const Header = styled.header``;
export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
export const Icon = styled.div`
  cursor: pointer;
  & svg {
    transform: scale(1.1);
  }
  & img {
    width: 30px;
  }
`;
