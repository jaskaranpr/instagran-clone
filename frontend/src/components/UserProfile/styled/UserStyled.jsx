import styled from "@emotion/styled";

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  justify-content: center;
  border-top: var(--border);
`;
export const Button = styled.div`
  display: flex;
  padding: 15px 20px;
  gap: 5px;
  align-items: center;
  opacity: 60%;
  justify-content: center;
  cursor: pointer;
  & h1 {
    font-size: 13px;
    font-weight: 500;
  }
`;
