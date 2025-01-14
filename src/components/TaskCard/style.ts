import {css} from "@emotion/react";
import {TaskType} from "../../interfaces";
import {TASK_COLORS} from "../../constants";

export const taskStyle = css`
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  box-shadow: 1px 2px 3px 0px rgb(0 0 0 / 12%);
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;

  &:hover {
    background-color: #f9f9f9;
  }
`

export const colorStyle = (type: TaskType) => css`
  background: ${TASK_COLORS[type]};
  height: 6px;
  width: 40px;
  border-radius: 10px;
  margin-bottom: 5px;
`