import styled from "styled-components";
export const SuggestionsDiv = styled.div`
  position: fixed;
  width: 100%;
`;
export const UserSec = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-bottom: 20px;
  & .id-of-user {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    & img {
      height: 100%;
    }
  }
  & .user-textDiv {
    & h1 {
      line-height: 15px;
      font-weight: 500;
    }
    & h2 {
      font-weight: 400;
      color: var(--gray);
    }
  }
`;
export const UserSug = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  padding: 10px 5px;
  & .id-of-user-sug {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    & img {
      height: 100%;
    }
  }
  & .user-textDiv-sug {
    & h1 {
      color: var(--color);
      line-height: 15px;
      font-weight: 500;
    }
    & h2 {
      font-weight: 400;
      color: var(--gray);
    }
  }
`;
export const SuggestionsSec = styled.div`
  width: 100%;
  & h1 {
    color: var(--gray);
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }
`;
