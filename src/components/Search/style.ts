import {css} from "@emotion/react";

export const searchStyle = css`
  --height: 40px;
  
  display: flex;
  border-radius: 5px;
  background: #fff;
  width: 350px;
  height: var(--height);

  input {
    background: transparent;
    border: none;
    flex: 1;
    padding-left: 15px;
    font-size: 16px;
    
    &:focus {
      outline: none;
    }
  }
  
  svg {
    width: var(--height);
    height: var(--height);
    padding: 10px;
  }
`