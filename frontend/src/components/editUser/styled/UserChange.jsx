import styled from "styled-components";

export const Main = styled.div`
  padding: 20px;
`;
export const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  & img {
    width: 50px;
    border-radius: 50%;
    &:hover {
      border: 1px solid #7c7c7c;
    }
  }
  & .editProfileImage {
    & p {
      border: 0px;
      color: rgba(0, 149, 246, 1);
      display: inline-block;
      font-size: 13px;
      font-weight: 500;
      padding: 0px;
      cursor: pointer;
      position: relative;
    }
    & h2 {
      padding: 0 2px;
      line-height: 25px;
      font-size: 23px;
    }
  }
`;
export const Editfields = styled.div`
  display: flex;
  padding: 20px;
  gap: 30px;
  justify-content: flex-end;
  & > button {
    border-radius: 4px;
    color: #fff;
    padding: 3px 10px;
    background: rgba(0, 149, 246, 1);
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    & img {
      width: 30px;
    }
    &:disabled {
      opacity: 60%;
    }
  }
  & > div {
    flex-direction: column;
    display: flex;
    align-items: flex-end;
    gap: 20px;
    & input,
    textarea {
      border: var(--border);
      width: 350px;
      padding: 3px 5px;
      background: var(--background);
    }
    & textarea:focus {
      outline: none;
    }
    & p {
      width: 350px;
      color: gray;
      font-size: 13px;
    }
  }
`;
