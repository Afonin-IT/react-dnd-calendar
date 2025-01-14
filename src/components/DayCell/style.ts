import {css} from "@emotion/react";

export const dayStyle = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 10px;
  min-height: 150px;
  padding: 10px;
  font-size: 16px;
  background-color: #e3e5e6;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: #d7d7d7;
  }
  
  
  .header {
    display: flex;
    column-gap: 5px;
    align-items: flex-end;
  }
  
  .number {
    font-weight: 700;
  }
  
  .tasks-count {
    font-size: 14px;
    line-height: 16px;
  }
  
  .tasks {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
`

export const inactiveStyle = css`
  color: #a8a8a8;
  background-color: #ebebeb;
  cursor: unset;

  &:hover {
    background-color: #ececec;
  }
`

export const todayStyle = css`
  font-weight: 600;
  background-color: #c1ffc4;

  &:hover {
    background-color: #7adf7e;
  }
`