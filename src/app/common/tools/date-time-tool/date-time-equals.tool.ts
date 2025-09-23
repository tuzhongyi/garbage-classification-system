import { TimeUnit } from '../../enum/time-unit.enum';

export class DateTimeEqualsTool {
  today(date: Date): boolean {
    return this.equals.day(date, new Date());
  }
  unit(date: Date, unit: TimeUnit) {
    switch (unit) {
      case TimeUnit.Day:
        return this.today(date);
      case TimeUnit.Week:
        return this.equals.week(date, new Date());
      case TimeUnit.Month:
        return this.equals.month(date, new Date());
      case TimeUnit.Year:
        return this.equals.year(date, new Date());

      default:
        return false;
    }
  }
  equals = new EqualsTool();
}

class EqualsTool {
  week(date1: Date, date2: Date) {
    let day1 = date1.getDay();
    if (day1 === 0) {
      day1 = 7;
    }
    let day2 = date2.getDay();
    if (day2 === 0) {
      day2 = 7;
    }
    let diff = date1.getDate() - day1 - (date2.getDate() - day2);
    return this.day(
      date1,
      new Date(date2.getFullYear(), date2.getMonth(), date2.getDate() + diff)
    );
  }
  year(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear();
  }
  month(date1: Date, date2: Date): boolean {
    return this.year(date1, date2) && date1.getMonth() === date2.getMonth();
  }
  day(date1: Date, date2: Date): boolean {
    return this.month(date1, date2) && date1.getDate() === date2.getDate();
  }
}
