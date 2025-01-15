import {useEffect, useState} from "react";
import {DAYS} from "../../constants";
import {bodyStyle, controlsStyle, dayNameStyle, headerStyle, titleStyle, weekStyle, wrapperStyle} from "./style.ts";
import DayCell from "../DayCell";
import {useHolidayStore} from "../../store/holidayStore.ts";
import {useTaskStore} from "../../store/taskStore.ts";
import dayjs from "dayjs";
import {css} from "@emotion/react";
import Spinner from '../../assets/spinner.svg'

function Calendar() {
  const {holidays, fetchHolidays, isLoading} = useHolidayStore()
  const {tasks: tasksArr, searchText} = useTaskStore()

  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    const year = currentDate.year();

    if (!(year in holidays)) {
      fetchHolidays(year);
    }
  }, [currentDate]);

  const currentMonthIndex = currentDate.month();

  const daysInMonth = currentDate.daysInMonth();

  // (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayOfWeek = currentDate.startOf('month').day();

  const prevMonthLastDay = currentDate.subtract(1, 'month').daysInMonth();

  const currentYearMonth = currentDate.format('MMMM YYYY');

  function handleDateChange(increment: number) {
    const newDate = currentDate.add(increment, 'month');
    setCurrentDate(newDate);
  }

  function handleResetClick() {
    setCurrentDate(dayjs());
  }

  const dateBoxes = Array.from(
    { length: Math.ceil((daysInMonth + firstDayOfWeek) / 7) },
    (_, i) => i,
  ).map((week) => (
    <div css={weekStyle} key={week}>
      {Array.from({ length: 7 }, (_, i) => i).map((day) => {
        const date = week * 7 + day + 1 - firstDayOfWeek;

        const isInactive = date < 1 || date > daysInMonth || currentDate.month() !== currentMonthIndex;
        const isToday = currentDate.isSame(dayjs(), 'day') && date === currentDate.date();

        const currentDayDate = currentDate.date(date);
        const formattedDate = currentDayDate.format('YYYY-MM-DD');

        const currentHolidays = (holidays[currentDayDate.year()] && holidays[currentDayDate.year()][formattedDate]);
        let currentTasks = tasksArr[formattedDate] || [];

        if (searchText) {
          currentTasks = currentTasks.filter(task => task.name.toLowerCase().includes(searchText.toLowerCase()))
        }

        const tasks = !isInactive && [
          ...(currentHolidays || []),
          ...(currentTasks).sort((a, b) => a.order - b.order)
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
          key={formattedDate} />
      })}
    </div>
  ));

  return (
    <div css={wrapperStyle}>
      <div css={headerStyle}>
        <div css={controlsStyle}>
          <button
            className="button"
            onClick={() => handleDateChange(-1)}
            type='button'
          >
            {"<"}
          </button>
          <button
            className="button"
            onClick={() => handleDateChange(1)}
            type='button'
          >
            {">"}
          </button>
        </div>
        <h1 css={titleStyle}>
          {currentYearMonth}

          {isLoading && <img src={Spinner} alt="Loading..."/>}
        </h1>
        <button
          className="button"
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