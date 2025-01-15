import {Task} from "../../interfaces";
import {cardStyle, colorStyle, taskStyle} from "./style.ts";
import IconButton from "../IconButton";
import {useTaskStore} from "../../store/taskStore.ts";
import {useContext} from "react";
import {CalendarContext} from "../../contexts/CalendarContext.tsx";

interface Props {
  task: Task
}

const TaskCard = ({task}: Props) => {
  const {setEditingTask} = useContext(CalendarContext)
  const {remove} = useTaskStore()

  const handleEdit = () => {
    setEditingTask(task.id)
  }

  const handleRemove = () => {
    if (window.confirm("Do you really want to remove task?")) {
      remove(task.id)
    }
  }

  return <div css={[cardStyle, taskStyle]}>
    <div className="content">
      <div css={colorStyle(task.type)}></div>

      <div className="name" onDoubleClick={handleEdit}>
        {task.name}
      </div>
    </div>

    <div className="actions">
      <IconButton onClick={() => handleEdit()} type={'edit'} />
      <IconButton onClick={() => handleRemove()} type={'remove'} />
    </div>
  </div>
}

export default TaskCard;