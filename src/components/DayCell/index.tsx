import {addButtonStyle, dayStyle, inactiveStyle, todayStyle} from "./style.ts";
import {Task} from "../../interfaces";
import TaskCard from "../TaskCard";
import IconPlus from '../../assets/icon-plus.svg';
import {css} from "@emotion/react";

interface Props {
  tasks?: Task[]

  dateText: number | string
  day: number | string
  week: number | string
  isInactive: boolean
  isToday: boolean
}

const DayCell = ({tasks, dateText, isInactive, isToday}: Props) => {
  return <div
    css={[
      dayStyle,
      isInactive && inactiveStyle,
      isToday && todayStyle,
    ]}
  >
    <div className="header">
      <div className='number'>
        {dateText}
      </div>

      {tasks?.length ? (
        <div className="tasks-count">
          {tasks.length} card
        </div>
      ) : null}

      {!isInactive ? (
        <button css={addButtonStyle} className="add-button">
          <img css={css`
          width: 10px;
        `} src={IconPlus} alt=""/>
        </button>
      ) : null}
    </div>

    {tasks?.length ? (
      <div className="tasks">
        {tasks.map(task => <TaskCard task={task} key={task.id} />)}
      </div>
    ) : null}
  </div>
}

export default DayCell;