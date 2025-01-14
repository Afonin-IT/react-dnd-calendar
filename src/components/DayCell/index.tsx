import {dayStyle, inactiveStyle, todayStyle} from "./style.ts";

interface Props {
  dateText: number | string
  day: number | string
  week: number | string
  isInactive: boolean
  isToday: boolean
}

const DayCell = ({dateText, day, week, isInactive, isToday}: Props) => {
  return <div
    css={[
      dayStyle,
      isInactive && inactiveStyle,
      isToday && todayStyle,
    ]}
    key={`${week}-${day}`}
  >
    <div className='number'>{dateText}</div>
  </div>
}

export default DayCell;