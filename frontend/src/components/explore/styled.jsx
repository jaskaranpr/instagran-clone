import styled from "styled-components";

export const Main = styled.div`
  width: 1000px;
  margin: auto;
  & .css-7rtvwf-MuiImageListItem-root {
    position: relative;
    cursor: pointer;
  }
`;
export const HoverDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(71, 71, 71, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  span {
    color: white;
  }
  & div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  & svg {
    filter: none;
  }
`;
