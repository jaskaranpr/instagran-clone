import styled from "styled-components";

export const Main = styled.div`
  width: 1000px;
  margin: auto;
  display: flex;
  height: 80vh;
  border-radius: 5px;
  border: var(--border);
`;
export const Navigation = styled.div`
  width: 40%;
  & h2 {
    padding: 20px;
    cursor: pointer;
  }
  & .userEditAct {
    border-left: 2px solid var(--color);
  }
`;
export const Content = styled.div`
  width: 50%;
`;
