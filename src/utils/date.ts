// !Important
// In this app, date is defined as below.
// Year: Same as we know, Month: 0 ~ 11, Day: Same as we know, dayOfWeek: (Sun = 0) ~ (Sat = 6); Month needs to be plased one when it is displayed as UIs.

/**
 * List of last day in common year each month.
 * @todo TODO: It should add one more list in leap year.
 */
const yearLastDay: {[key: number]: number} = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
};
/**
 * Get last day of selected month from yearLastDay.
 * 
 * Month: 0 ~ 11
 */
export const getLastDay = (month: number) => yearLastDay[month];
/**
 * Get first day of month.
 * 
 * Month: 0 ~ 11
 */
export function getFirstDay(date: Date) {
    const firstDate = new Date(date);
    firstDate.setDate(1);
    return firstDate
}
/**
 * Get day of week.
 */
export function getDayOfWeek(date: Date) {
  const dayOfWeek = new Date(date).getDay();
  return dayOfWeek;
}

/**
 * Get year and manth of before month from current month.
 * 
 * Month: 0 ~ 11
 */
export function getBeforeMonth(current: Date) {
    if (current.getMonth() === 0) {
        const changedYearNum: number = current.getFullYear() - 1;
        const changedMonthNum: number = 11;
        const backedDate = new Date(changedYearNum, changedMonthNum);
        return backedDate;
      } else {
        const changedMonthNum: number = current.getMonth() - 1;
        const backedDate = new Date(current.getFullYear(), changedMonthNum);
        return backedDate;
      }
}

/**
 * Get year and manth of next month from current month
 * 
 * Month: 0 ~ 11
 */
export function getNextMonth(current: Date) {
    if (current.getMonth() === 11) {
      const changedYearNum: number = current.getFullYear() + 1;
      const changedMonthNum: number = 0;
      const advancedDate = new Date(changedYearNum, changedMonthNum);
      return advancedDate;
    } else {
      const changedMonthNum: number = current.getMonth() + 1;
      const advancedDate = new Date(current.getFullYear(), changedMonthNum);
      return advancedDate;
    }
  }