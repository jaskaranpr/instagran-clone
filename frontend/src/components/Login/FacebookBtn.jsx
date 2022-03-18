import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #0095f6;
  background-color: rgba(var(--d69, 0, 149, 246), 1);
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  color: rgba(var(--eca, 255, 255, 255), 1);
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: inherit;
  & span {
    display: inline-block;
    margin-right: 8px;
    position: relative;
    background-repeat: no-repeat;
    top: 3px;
    background-position: -414px -259px;
    height: 16px;
    width: 16px;
    background-image: url(https://www.instagram.com/static/bundles/es6/sprite_core_32f0a4f27407.png/32f0a4f27407.png);
  }
`;

export const FacebookBtn = () => {
  return (
    <Button>
      {" "}
      <span></span> Log in with Facebook
    </Button>
  );
};
