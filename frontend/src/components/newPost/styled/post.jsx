import styled from "styled-components";

export const Main = styled.div`
  width: 1000px;
  position: fixed;
  background: var(--background);
  height: 600px;
  z-index: 999;
  left: 50%;
  border-radius: 15px;
  top: 50%;
  transform: translate(-50%, -50%);

  & .con {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    & h1 {
      font-size: 24px;
      line-height: 26px;
      margin: 10px 0;
      font-weight: 100;
    }
  }
`;
export const BG = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: var(--color);
  opacity: 40%;
  position: fixed;
  z-index: 99;
`;
export const Button = styled.button`
  background-color: #0095f6;
  background-color: rgba(var(--d69, 0, 149, 246), 1);
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 9px;
  margin-top: 20px;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: inherit;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  color: rgba(var(255, 255, 255, 255, 255, 255), 1);
  position: relative;

  &:disabled {
    opacity: 50%;
  }
`;
export const Img = styled.div`
  height: 100%;
  display: flex;
  gap: 20px;
  & .left-img {
    height: 555px;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${(prop) => prop.img});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  & #caption {
    border: none;
    margin-top: 10px;
    font-size: 18px;
    padding: 10px;
    background: transparent;
    &:focus {
      outline: none;
    }
  }
  & video {
    height: 100%;
  }
`;
export const Top = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-weight: 400;
  text-align: center;
  border-bottom: var(--border);
  & span {
    color: var(--blue);
    cursor: pointer;
  }
`;
export const ProgressDiv = styled.div`
  width: 100%;
  height: 3px;
  position: absolute;
  left: 0;
  top: 42px;
  background: linear-gradient(
    45deg,
    #f17c58,
    #e94584,
    #24aadb,
    #27dbb1,
    #ffdc18,
    #ff3706
  );
  background-size: 600% 100%;
  animation: gradient 2s linear infinite;
  animation-direction: alternate;
  @keyframes gradient {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }
  & > span {
    position: absolute;
    right: 0;
    font-weight: bold;
  }
`;
