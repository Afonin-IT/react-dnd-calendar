import {css} from "@emotion/react";
import {DAYS} from "../../constants";

export const wrapperStyle = css`
  //padding: 20px;
`

export const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

export const titleStyle = css`
  font-weight: 700;
  font-size: 23px;
`

export const controlsStyle = css`
  display: flex;
  column-gap: 10px;
`

export const bodyStyle = css`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 20px;
`

export const weekStyle = css`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(${DAYS.length}, 1fr);
  grid-gap: 5px;
`

export const dayNameStyle = css`
  padding: 10px 3px 30px;
  font-weight: 500;
  color: #a5a5a5;
  font-size: 16px;
`