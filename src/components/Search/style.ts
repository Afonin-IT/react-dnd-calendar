import {css} from "@emotion/react";

export const searchStyle = css`
  display: flex;
  border-radius: 5px;
  background: #fff;
  width: 350px;
  height: 40px;

  input {
    background: transparent;
    border: none;
    flex: 1;
    padding-left: 15px;
    font-size: 16px;
  }
  
  svg {
    width: 20px;
    margin: 15px;
    height: fit-content;
  }
`