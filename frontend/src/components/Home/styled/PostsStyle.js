import styled from "styled-components";
export const PostsDiv = styled.div`
  border: var(--border);
  margin-bottom: 20px;
  border-radius: 5px;
  background: var(--background);
`;
export const UserSec = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;

  & a > :nth-child(1) {
    display: flex;
    align-items: center;
    gap: 10px;
    & > div {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      & img {
        height: 100%;
      }
    }
    & h2 {
      font-size: 15px;
      font-weight: 500;
    }
  }
`;
export const ImageSec = styled.div`
  position: relative;
  & img {
    width: 100%;
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

  & .videoLoading {
    position: absolute;
    bottom: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--dark-loading),
      var(--dark-loading),
      var(--dark-loading),
      var(--dark-loading),
      var(--dark-loading),
      var(--dark-loading),
      var(--light-loading),
      var(--dark-loading),
      var(--dark-loading),
      var(--dark-loading),
      var(--dark-loading),
      var(--dark-loading)
    );
    background-size: 400% 100%;
    animation: loading 1s infinite;
  }
  @keyframes loading {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
  }
`;
export const LikeDiv = styled.div`
  & svg {
    cursor: pointer;
  }
  display: flex;
  justify-content: space-between;
  & div {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
  }
`;

export const CommentDiv = styled.div`
  padding: 0px 13px;
  padding-bottom: 10px;
  & .commentDivBottom {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    & h2 {
      font-weight: 500;

      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -10px;
        width: 5px;
        border-radius: 50%;
        height: 5px;
        background: var(--color);
      }
    }
  }
`;

export const Faded = styled.div`
  font-size: 10px;
  color: gray;
  & p {
    font-size: 16px;
    padding: 10px 0;
    cursor: pointer;
  }
`;
export const BottomCommentInput = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  position: relative;
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
