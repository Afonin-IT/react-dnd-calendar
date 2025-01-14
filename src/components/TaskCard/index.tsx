import {Task} from "../../interfaces";
import {colorStyle, taskStyle} from "./style.ts";

interface Props {
  task: Task
}

const TaskCard = ({task}: Props) => {
  return <div css={taskStyle}>
    <div css={colorStyle(task.type)}></div>

    <div className="name">
      {task.name}
    </div>
  </div>
}

export default TaskCard;