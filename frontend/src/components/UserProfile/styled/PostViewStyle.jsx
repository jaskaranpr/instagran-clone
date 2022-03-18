import styled from "styled-components";
export const Main = styled.div`
  width: auto;
  background-color: white;
  position: fixed;
  top: 50%;
  z-index: 999;
  left: 50%;
  display: flex;
  height: auto;
  min-width: 900px;
  min-height: 400px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  & svg {
    cursor: pointer;
  }
`;
export const BG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #00000073;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  & .postCross {
    position: fixed;
    top: 30px;
    right: 30px;
    transform: scale(1.5);
    cursor: pointer;
  }
`;
export const Image = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color);
  height: auto;
  & img {
    width: auto;
    object-fit: cover;
  }
  & #videoDivHome {
    position: relative;
    video {
      width: 100%;
    }
    & #play {
      position: absolute;
      width: 120px;
      height: 100px;
      background-position: 10px 20px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      background: url("https://www.instagram.com/static/bundles/es6/sprite_video_2fdc79aa66b0.png/2fdc79aa66b0.png");
    }
    & #muteBtn {
      cursor: pointer;
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: black;
    }
  }
`;
export const TextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 400px;
  flex-direction: column;
  background: var(--background);
`;

export const Left = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  background: white;
  z-index: 999;
  width: 30px;
  height: 30px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
export const Right = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  background: white;
  z-index: 999;
  width: 30px;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
export const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  padding: 10px;

  & .userProfileInPost {
    display: flex;
    gap: 10px;
    & .profile-image {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      & img {
        height: 100%;
      }
    }
  }
`;
export const HR = styled.div`
  width: 100%;
  height: 1px;
  margin: 5px 0;
  background: #80808094;
`;
export const Caption = styled.div`
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 15px;
  & .userProfileInPost {
    display: flex;
    gap: 10px;
    position: relative;
    & .profile-image {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      & img {
        height: 100%;
      }
    }
    &::before {
      content: "";
      width: 5px;
      height: 5px;
      background: var(--color);
      position: absolute;
      right: -10px;
      top: 50%;
      opacity: 60%;
      transform: translateY(-50%);
      border-radius: 50%;
    }
  }
`;
export const Dot = styled.div`
  width: 5px;
  height: 5px;
  margin-bottom: -5px;
  background: var(--color);
  opacity: 60%;
  border-radius: 50%;
`;
export const RightTextTop = styled.div``;
export const BottomCommentInput = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  & svg {
    width: 25px;
    cursor: pointer;
  }
  & input {
    width: 100%;
    background: transparent;
  }
  & input:focus {
    outline: none;
  }
  & p {
    color: rgba(var(--d69, 0, 149, 246), 1);
    font-weight: 500;
    cursor: pointer;
  }
  & .emoji-picker-react {
    position: absolute;
    bottom: 50px;
    z-index: 9999;
  }
`;
export const EmojiBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
`;

export const RightTextComments = styled.div`
  height: 100%;
  max-height: 350px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 10px;
  & .userProfileInPost {
    display: flex;
    gap: 10px;
    padding: 10px 0px;
    align-items: center;
    & .profile-image {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      & img {
        height: 100%;
      }
    }
  }
`;
export const LikeDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  & div {
    padding: 10px;
    gap: 10px;
    display: flex;
    & .liked-svg {
      animation: liked;
      animation-duration: 0.5s;
      animation-timing-function: 1;
    }
    @keyframes liked {
      from {
        transform: scale(1.2);
      }
      to {
        transform: scale(1);
      }
    }
  }
`;
