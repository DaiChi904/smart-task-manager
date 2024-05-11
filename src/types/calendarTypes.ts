export type CalendarType = {
    date: DateType,
    todos: null | TodosInfoType[],
    status: {
        isToday: boolean,
        isShowLimitActive: boolean,
    }
    limitedTodos: null | LimitedTodosType[],
}

export type DateType = {
    year: number,
    month: number,
    day: number,
    dayOfWeek: number,
}

export type TodosInfoType = {
    title: string,
    content: string,
    startDate: string[] | null,
    dueDate: string[] | null,
    cheacked: boolean,
    isInProgress: boolean,
    isExpired: boolean,
    isStartDate: boolean,
}

export type LimitedTodosType = {
    content: string,
    isStartDate: boolean,
}

export type AllCalendarType = {
    lastMonth: CalendarType[],
    currentMonth: CalendarType[],
    nextMonth: CalendarType[],
}

export type YearMonthType = {
    year: number,
    month: number,
}
