import {useEffect, useState} from "react";
import {DAYS} from "../../constants";
import {bodyStyle, controlsStyle, dayNameStyle, headerStyle, titleStyle, weekStyle, wrapperStyle} from "./style.ts";
import DayCell from "../DayCell";
import {useHolidayStore} from "../../store/holidayStore.ts";
import {useTaskStore} from "../../store/taskStore.ts";
import dayjs from "dayjs";
import {css} from "@emotion/react";

function Calendar() {
  const {holidays, fetchHolidays} = useHolidayStore()
  const {tasks: tasksArr} = useTaskStore()

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const year = currentDate.getFullYear();

    if (!(year in holidays)) {
      fetchHolidays(year);
    }
  }, [currentDate]);

  const currentMonthIndex = currentDate.getMonth();

  // get the number of days in the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // get the day of the week for the first day of the current month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // get the number of days in the previous month
  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  // get the current year and month from the current date
  const currentYearMonth = `${currentDate.toLocaleString('en-US', {
    month: 'long',
  })} ${currentDate.getFullYear()}`;

  // function to handle the back and next buttons by incrementing or decrementing the month by 1 (increment = -1 or 1)
  function handleDateChange(increment: number) {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  }

  function handleResetClick() {
    setCurrentDate(new Date());
  }

  const dateBoxes = Array.from(
    { length: Math.ceil((daysInMonth + firstDayOfWeek) / 7) },
    (_, i) => i,
  ).map((week) => (
    <div css={weekStyle} key={week}>
      {Array.from({ length: 7 }, (_, i) => i).map((day) => {
        const date = week * 7 + day + 1 - firstDayOfWeek;
        const isCurrentMonth = currentDate.getMonth() === currentMonthIndex;
        const actualDate = new Date();
        const actualMonth = actualDate.getMonth();
        const isActualMonth = actualMonth === currentMonthIndex;
        const actualYear = actualDate.getFullYear();
        const isActualYear = actualYear === currentDate.getFullYear();
        const isToday = isActualMonth && isActualYear && currentDate.getDate() === date;
        const isInactive = !isCurrentMonth || date < 1 || date > daysInMonth;

        const currentDayDate = new Date(currentDate.getFullYear(), currentMonthIndex, date);
        const formattedDate = dayjs(currentDayDate).format('YYYY-MM-DD');

        const tasks = !isInactive && [
          ...((holidays[actualYear] && holidays[actualYear][formattedDate]) || []),
          ...(tasksArr[formattedDate] || []).sort((a, b) => a.order - b.order)
        ]

        let dateText;
        if (date < 1) {
          dateText = prevMonthLastDay + date;
        } else if (date > daysInMonth) {
          dateText = date - daysInMonth;
        } else {
          dateText = date;
        }

        return <DayCell
          tasks={tasks || []}
          dateText={dateText}
          day={day}
          week={week}
          isInactive={isInactive}
          isToday={isToday}
          key={`${week}-${day}`} />
      })}
    </div>
  ));

  return (
    <div css={wrapperStyle}>
      <div css={headerStyle}>
        <div css={controlsStyle}>
          <button
            onClick={() => handleDateChange(-1)}
            type='button'
          >
            {"<"}
          </button>
          <button
            onClick={() => handleDateChange(1)}
            type='button'
          >
            {">"}
          </button>
        </div>
        <h1 css={titleStyle}>{currentYearMonth}</h1>
        <button
          onClick={handleResetClick}
          type='button'
        >
          Today
        </button>
      </div>
      <div css={bodyStyle}>
        <div css={[
          weekStyle,
          css`
            text-align: center;
          `
        ]}>
          {DAYS.map((day) => (
            <div css={dayNameStyle} key={day}>
              {day}
            </div>
          ))}
        </div>
        {dateBoxes}
      </div>
    </div>
  );
}

export default Calendar;