import {css} from "@emotion/react";

export const dayStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 150px;
  padding: 10px;
  font-size: 14px;
  background-color: #e3e5e6;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: #d7d7d7;
  }
  
  .number {
    font-weight: 700;
    f
  }
`

export const inactiveStyle = css`
  color: #a8a8a8;
  background-color: #ebebeb;
  cursor: unset;

  &:hover {
    background-color: #e4e4e4;
  }
`

export const todayStyle = css`
  font-weight: 600;
  background-color: #99ff9d;

  &:hover {
    background-color: #7adf7e;
  }
`