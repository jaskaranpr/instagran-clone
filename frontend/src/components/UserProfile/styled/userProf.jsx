import styled from "styled-components";

export const Main = styled.div`
  & > div {
    display: flex;
    align-items: center;
  }
`;

export const LogoDiv = styled.div`
  margin-left: 10%;
  overflow: hidden;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  & img {
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export const TextDiv = styled.div`
  margin-left: 10%;
  & > div {
    display: flex;
    width: 100%;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  }
  & > .user-activity {
    width: 260px;
    margin: 30px 0px;
  }
  & h1 {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color);
    font-size: 28px;
    line-height: 32px;
    margin: -5px 0 -6px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
    font-weight: 300;
  }
  & svg {
    cursor: pointer;
  }
  & .userId-section a button {
    background-color: transparent;
    border: var(--border);
    color: #262626;
    padding: 2px 5px;
    border-radius: 4px;
    color: var(--color);
  }
`;
export const FollowBtn = styled.button`
  color: white;
  padding: 5px 30px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;
