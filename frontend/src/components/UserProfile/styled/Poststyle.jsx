import styled from "styled-components";

export const Main = styled.div`
  width: 1000px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  gap: 20px;
  justify-content: center;
`;

export const PostImage = styled.div`
  aspect-ratio: 1/1;
  background: url("${(prop) => prop.image}");
  background-position: center;
  background-size: cover;
  background-color: black;
  position: relative;
  cursor: pointer;
  & video {
    position: absolute;
    height: 100%;
  }
  & > div {
    position: absolute;
    z-index: 1;
    background: #00000058;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      color: white;
      font-weight: 400;
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
