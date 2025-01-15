import {dayStyle, inactiveStyle, todayStyle} from "./style.ts";
import {Task} from "../../interfaces";
import HolidayCard from "../cards/HolidayCard.tsx";
import TaskCard from "../cards/TaskCard.tsx";
import IconButton from "../IconButton";
import {useTaskStore} from "../../store/taskStore.ts";
import EditTaskCard from "../cards/EditTaskCard.tsx";
import {useContext} from "react";
import {CalendarContext} from "../../contexts/CalendarContext.tsx";

interface Props {
  holidays?: Task[]
  tasks?: Task[]

  dateText: number | string
  date: string
  isInactive: boolean
  isToday: boolean
}

const DayCell = ({holidays, tasks, dateText, date, isInactive, isToday}: Props) => {
  const {editingTask, setEditingTask} = useContext(CalendarContext)
  const {add} = useTaskStore()

  const cardsCount = (holidays?.length || 0) + (tasks?.length || 0);

  const handleAdd = () => {
    const newId = add(date, {
      name: 'New Task'
    });

    setEditingTask(newId)
  }

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

      {cardsCount > 0 && (
        <div className="tasks-count">
          {cardsCount} card
        </div>
      )}

      {!isInactive && (
        <div className="add-button">
          <IconButton onClick={handleAdd} type={'plus'} />
        </div>
      )}
    </div>

    {holidays?.length ? (
      <div className="cards-wrapper">
        {holidays.map(task => <HolidayCard task={task} key={task.id} />)}
      </div>
    ) : null}

    {tasks?.length ? (
      <div className="cards-wrapper">
        {tasks.map(task =>
          task.id === editingTask
            ? <EditTaskCard task={task} key={task.id} />
            : <TaskCard task={task} key={task.id} />
        )}
      </div>
    ) : null}

  </div>
}

export default DayCell;