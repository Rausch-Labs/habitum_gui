

export interface Function {
  addDays(days: number): Date;
}

export const addDays = function (date: Date, days: number) {
  var dateC: Date = new Date(date.valueOf());
  dateC.setDate(dateC.getDate() + days);
  return dateC;
}

export const minusDays = function (date: Date, days: number) {
  var dateC: Date = new Date(date.valueOf());
  dateC.setDate(dateC.getDate() - days);
  return dateC;
}


export function getDates(startDate: any, stopDate: any) {
  var dateArray = [];
  var currentDate: Date = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

export const getMonthString = (month: string) => {
  if (parseFloat(month) + 1 <= 9) {
    return '0' + (parseFloat(month) + 1)
  }
  return (parseFloat(month) + 1)
}

export const getDateString = (month: string) => {
  if (parseFloat(month) <= 9) {
    return '0' + parseFloat(month)
  }
  return parseFloat(month)
}

export function groupBy<T>(list: any[], keyGetter: any): Map<symbol, T[]> {
  const map = new Map<symbol, T[]>();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}