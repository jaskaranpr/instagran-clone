import styled from "styled-components";
export const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  left: 0;
  height: 60px;
  background: var(--background);
  border-bottom: var(--border);
  z-index: 99;
`;
export const Nav = styled.nav`
  width: 975px;
  height: 100%;

  display: flex;
`;
export const Logo = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  padding-top: 10px;
`;
export const Search = styled.div`
  width: 30%;
  position: relative;
  display: flex;
  align-items: center;
  & .search-box {
    display: flex;
    align-items: center;
    cursor: text;
  }
  & .search-icon {
    transform: scale(1.2);
  }
  & input {
    background: transparent;
    font-size: 17px;
    padding: 10px;
    border: none;
    color: var(--gray);
  }
  & input:focus {
    color: var(--color);
    outline: none;
  }
  & [type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    height: 13px;
    width: 13px;
    cursor: pointer;
    opacity: 40%;
    background-image: url(${(prop) => prop.cross});
    background-size: 13px 13px;
  }
`;
export const NavBtn = styled.div`
  margin-top: 10px;
  margin-left: 8%;
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Icon = styled.div`
  cursor: pointer;
  & svg {
    width: 50px;
    transform: scale(1.1);
  }
  & img {
    width: 25px;
  }
  & .notificationCount {
    position: absolute;
    top: 150%;
    background-color: #ed4956;
    width: 50px;
    height: 40px;
    border-radius: 20%;
    color: white;
    display: flex;
    transform: scale(0);
    gap: 3px;
    align-items: center;
    justify-content: center;
    padding: 10px;
    transition: transform 0.5s ease;
    & svg {
      transform: scale(-90%) rotate(180deg);
    }
    &::before {
      content: "";
      position: absolute;
      top: -10px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #ed4956;
    }
  }
  & .notificationActive {
    transform: scale(1);
  }
`;
export const NotifyDot = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background: #ed4956;
`;
export const ProfileMenu = styled.div`
  width: 170px;
  background: var(--background);
  position: absolute;
  right: 0;
  border-radius: 5px;
  padding-top: 10px;
  & div {
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 8px 0;
    & svg {
      width: 28px;
    }
  }
`;

export const LogOut = styled.div`
  border: var(--border);
  margin-top: 8px;

  border-bottom: none;
  border-right: none;
  border-left: none;
`;
