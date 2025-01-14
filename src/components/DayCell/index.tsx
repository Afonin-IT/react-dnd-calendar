import {dayStyle, inactiveStyle, todayStyle} from "./style.ts";
import {Task} from "../../interfaces";
import TaskCard from "../TaskCard";

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
    </div>

    {tasks?.length ? (
      <div className="tasks">
        {tasks.map(task => <TaskCard task={task} />)}
      </div>
    ) : null}
  </div>
}

export default DayCell;