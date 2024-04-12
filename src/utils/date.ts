/**
 * 月初めの日付を取得する関数
 * @param currentYear 年
 * @param currentMonth 月
 * @returns
 */
export function getFirstDate(date: Date) {
  const firstDate = new Date(date);
  firstDate.setDate(1);
  return firstDate;
}

/**
 * Get year and manth of before month from current month
 * */
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

// Get year and manth of before month from current month
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

/**
 *
 * @todo TODO: It should add leapYear Array
 */
const YEARLASTDAY: { [key: number]: number } = {
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

export const getLastDay = (month: number) => YEARLASTDAY[month];
