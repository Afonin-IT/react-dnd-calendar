import {Task} from "../../interfaces";
import {cardStyle, colorStyle} from "./style.ts";

interface Props {
  task: Task
}

const HolidayCard = ({task}: Props) => {
  return <div css={cardStyle}>
    <div className="content">
      <div css={colorStyle(task.type)}></div>

      <div className="name">
        {task.name}
      </div>
    </div>
  </div>
}

export default HolidayCard;