import {css} from "@emotion/react";
import {TaskType} from "../../interfaces";
import {TASK_COLORS} from "../../constants";


export const cardStyle = css`
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  box-shadow: 1px 2px 3px 0px rgb(0 0 0 / 12%);
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  column-gap: 15px;
  row-gap: 5px;
  flex-wrap: wrap;
  
  &:hover {
    background-color: #f8f8f8;
  }
  
  .content {
    width: 100%;
  }
  
  .name {
    //hyphens: auto;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .actions {
    display: flex;
    transition: opacity .3s;
    margin-left: auto;
  }
`

export const taskStyle = css`
  cursor: move;

  &:hover {
    outline: 1px solid #707070;
  }

  &:not(:hover) .actions {
    opacity: 0;
  }
`

export const editTaskStyle = css`
  outline: 2px solid #008eff;
`

export const textareaStyle = css`
  width: 100%;
  overflow: hidden;
  resize: none;
  padding: 0;
  border: none;
  background: transparent;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  
  &:focus {
    outline: none;
  }
`

export const colorStyle = (type: TaskType) => css`
  background: ${TASK_COLORS[type]};
  height: 6px;
  width: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
`