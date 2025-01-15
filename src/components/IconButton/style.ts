import {css} from "@emotion/react";

export const iconButtonStyle = css`
  margin-left: auto;
  align-self: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: .3s;
  border-radius: 4px;
  height: 20px;
  width: 24px;
  display: grid;
  place-content: center;

  &:hover {
    background: #0000001f;
  }
  
  & > img {
    max-height: 100%;
    max-width: 100%;
  }
`