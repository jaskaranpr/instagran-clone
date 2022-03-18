import styled from "styled-components";
export const StoryDiv = styled.div`
  background: var(--background);
  border: var(--border);
  border-radius: 3px;
  margin-bottom: 24px;
  margin-top: 0;
  padding: 16px 0;
  height: 119px;
  padding: 10px 20px;
  position: relative;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  display: flex;

  & p {
    display: block;
    max-width: 64px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 200;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }

  & .story-arrows {
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 20px;
    position: absolute;
    right: 10px;
    cursor: pointer;
    top: 36%;
    & svg {
      width: 12px;
    }
  }
  & #story-left-arrow {
    z-index: 1;
    left: 10px;
  }
`;
export const StoryImage = styled.div`
  width: 60px;
  border-radius: 50%;
  height: 60px;
  background: linear-gradient(red, red, red, #d8a600);
  padding: 2px;
  cursor: pointer;
  & > div {
    background-image: url(${(prop) => prop.img});
    background-size: cover;
    width: 100%;
    border-radius: 50%;
    height: 100%;
    background-position: center;
    border: 1px solid var(--background);
  }
`;
