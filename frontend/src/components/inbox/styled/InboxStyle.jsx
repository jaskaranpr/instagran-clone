import styled from "styled-components";

export const Main = styled.div`
  width: 1000px;
  margin-top: -20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 89vh;
  border-radius: 5px;
  display: flex;
  background: var(--background);
  border: var(--border);
`;
export const UserSec = styled.div`
  width: 35%;
  height: 100%;
  /* border: 1px solid red; */
  & .userChatHeader {
    display: flex;
    position: relative;
    height: 60px;
    align-items: center;
    justify-content: center;
    border: var(--border);
    border-top: none;
    border-left: none;
    & h1 {
      font-weight: 500;
    }
    & svg {
      position: absolute;
      right: 20px;
    }
  }
  & .userSecBody {
    width: 100%;
    border-right: var(--border);
    height: calc(100% - 60px);
    overflow-y: scroll;
    padding: 20px;
    padding-bottom: 100px;
    & .userShowDiv {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
      cursor: pointer;
    }
    & .imageDivInChatUsers {
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      & img {
        height: 100%;
      }
    }
    & h1 {
      font-weight: 500;
    }
    & h2 {
      color: gray;
    }
  }
`;
export const ChatSec = styled.div`
  width: 65%;
  position: relative;
  & .chatMainHeader {
    display: flex;
    position: relative;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
    height: 60px;
    border-bottom: var(--border);
    & .imageDivInChatHeader {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;
      & img {
        height: 100%;
      }
    }
  }
  & .chatMainBody {
    width: 100%;
    border-right: var(--border);
    height: calc(100% - 150px);
    overflow-y: scroll;
    padding: 20px;
    padding-bottom: 100px;

    & div {
      display: flex;
      margin-bottom: 10px;
    }
  }
`;
export const ChatInput = styled.div`
  width: 100%;
  left: 0;
  bottom: 20px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  & .emoji-picker-react {
  }
  & > div {
    display: flex;
    gap: 10px;
    border: var(--border);
    width: 90%;
    padding: 10px;
    border-radius: 30px;
    position: relative;
    & > .emoji-picker-react {
      position: absolute;
      z-index: 2;
      bottom: calc(100% + 20px);
      left: 0;
    }
    & > input {
      width: 100%;
    }
    & button {
      color: var(--blue);
    }
  }
`;
export const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
`;

export const UsersForChatSec = styled.div`
  position: fixed;
  z-index: 999;
  width: 300px;
  height: 400px;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--background);
  border: var(--border);
  & > h1 {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: var(--border);
  }
  & > div {
    padding: 10px;
    overflow-y: scroll;

    height: calc(100% - 50px);

    &::-webkit-scrollbar {
      display: none;
    }
    & > div {
      cursor: pointer;
      margin-bottom: 15px;
      display: flex;
      gap: 10px;
      & .imageDivInChatUsers {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }
      & .textDivInChatUsers {
        & h1 {
          font-weight: 500;
        }
        & h2 {
          color: gray;
        }
      }
      & img {
        height: 100%;
      }
    }
  }
`;
export const BgForUsers = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99;
  background: rgba(0, 0, 0, 0.65);
  top: 0;
  left: 0;
`;
