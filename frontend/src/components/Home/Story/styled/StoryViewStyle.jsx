import styled from "styled-components";

export const Main = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  background: #1a1a1a;
  z-index: 999;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  & svg {
    filter: none;
  }
`;
export const Body = styled.div`
  width: 100%;
  height: 80vh;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
export const Story = styled.div`
  position: absolute;
  height: 100%;
  left: -2%;
  aspect-ratio: 9/16;
  left: 50%;
  transform: translateX(-50%);
  & .storyFlex {
    display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
    transition: left 0.5s ease;

    & .active-story {
      transform: scale(-100%) rotate(180deg);
      filter: contrast(100%);
    }
    & > div {
      transform: scale(-50%) rotate(180deg);
      border-radius: 10px;
      overflow: hidden;
      filter: contrast(60%);
      transition: all 0.5s ease;
      object-fit: cover;
      height: 100%;
      & img {
        height: 100%;
      }
    }
  }

  & .storyBtn {
    position: absolute;
    top: 50%;
    background: white;
    border-radius: 50%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    transform: scale(-50%) translateY(-50%);
    cursor: pointer;
    opacity: 70%;
    z-index: 999;
    &:hover {
      opacity: 100%;
    }
  }
  & .storyBtnLeft {
    left: -80px;
  }
  & .storyBtnRight {
    right: -80px;
  }

  & .storyProcess {
    position: absolute;
    top: 10px;
    left: 50%;
    border-radius: 5px;
    width: 95%;
    transform: translateX(-50%);
    height: 4px;
    background: gray;
    &::before {
      content: "";
      border-radius: 5px;
      width: 100%;
      left: 0;
      top: 0;
      height: 100%;
      position: absolute;
      background-color: white;
      animation: timer 10s linear;

      @keyframes timer {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }
    }
  }
  & .profileOnStory {
    position: absolute;
    top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 10px;
    & .logoOnStory {
      object-fit: cover;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    & h2 {
      font-weight: bold;
      color: white;
    }
  }

  & .logoOnStoryHidden {
    position: absolute;
    width: 150px;
    height: 150px;
    object-fit: cover;
    overflow: hidden;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid red;
  }
`;
