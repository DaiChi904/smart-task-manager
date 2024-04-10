import { useEffect, useState } from "react";
import { todosAtom } from "../Memo_card/TodoApp";
import { useAtom } from "jotai";
import "./expeliment.css";
import { getBeforeMonth, getFirstDate, getLastDay } from "../../utils/date";

type Day = {
  day: number;
  todos: null | string[];
  isToday: boolean;
};

export default function ExpCalendar() {
  // Get Atom
  const [todos, setTodos] = useAtom(todosAtom);
  const [currentMonth, setCurrentMonth] = useState<Day[]>([]);
  const [beforeMonth, setBeforeMonth] = useState<Day[]>([]);
  const [afterMonth, setAfterMonth] = useState<Day[]>([]);
  // Date which is selected
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    // Get day of week of first day
    //        ↓Typo
    const dayOdWeekOfFirstDate = getFirstDate(currentDate).getDay();

    // Array of day of manth before currentMonth
    const newBeforeMonth = [...Array(dayOdWeekOfFirstDate)]
      .map((_, i) => {
        const day = getBeforeMonth(currentDate);

        // 日付を逆に取得
        day.setDate(getLastDay(day.getMonth()) - i);

        return {
          day: day.getDate(),
          todos: null,
          isToday: false,
        };
      })
      .reverse();
    setBeforeMonth(newBeforeMonth);

    // Array of day of current Month
    const newCurrentRenderArray: Day[] = [
      ...Array(getLastDay(currentDate.getMonth())),
    ].map((_, i) => {
      const filteredTodos = todos.filter((todo) => {
        if (typeof todo.dueDate !== "string") return false;
        const dueDate = new Date(todo.dueDate);
        return dueDate.getDate() === i;
      });

      // append from head
      return {
        day: i + 1,
        todos: filteredTodos.map((todo) => todo.cardTitle),
        isToday: false,
      };
    });
    setCurrentMonth(newCurrentRenderArray);

    // Array of day of manth after currentMonth
    const nextWeekCount = 2;
    const newAfterMonth = [
      ...Array(7 * nextWeekCount + 1 - currentDate.getDay()),
    ].map((_, i) => {
      return {
        day: i + 1,
        todos: null,
        isToday: false,
      };
    });
    setAfterMonth(newAfterMonth);
  }, [todos]);

  return (
    <>
      <div>{formatDate(currentDate)}</div>
      <div className="container">
        <CalendarHeader />

        {[...beforeMonth, ...currentMonth, ...afterMonth].map((renderArray) => (
          <div className={renderArray.isToday ? "testTrue" : "testFalse"}>
            {renderArray.day}
            {renderArray.todos &&
              renderArray.todos.map((todos) => (
                <div className="test">{todos}</div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

const CalendarHeader = () => (
  <>
    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div className="Calendar-DateBox">{day}</div>
    ))}
  </>
);

const formatDate = (date: Date) =>
  `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDay()}`;
