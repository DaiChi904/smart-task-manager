export type CalendarType = {
    date: {
        year: number,
        month: number,
        day: number,
        dayOfWeek: number,
    },
    todos: null | {
        title: string,
        content: string,
        startDate: string[] | null,
        dueDate: string[] | null,
        cheacked: boolean,
        isInProgress: boolean,
        isExpired: boolean,
        isStartDate: boolean,
    }[],
    status: {
        isToday: boolean,
        isShowLimitActive: boolean,
    }
    limitedTodos: string[] | null,
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

export type DateType = {
    year: number,
    month: number,
    day: number,
    dayOfWeek: number,
}