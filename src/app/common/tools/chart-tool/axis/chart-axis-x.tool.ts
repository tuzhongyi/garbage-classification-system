import { TimeUnit } from '../../../enum/time-unit.enum';

export class ChartAxisXTool {
  weeks(first = 1) {
    let numbers = ['日', '一', '二', '三', '四', '五', '六'];
    let weeks = [];
    for (let i = first; i < numbers.length; i++) {
      weeks.push(`周${numbers[i]}`);
    }

    for (let i = 0; i < first; i++) {
      weeks.push(`周${numbers[i]}`);
    }
    return weeks;
  }
  hours(end = true) {
    let hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i < 10 ? `0${i}:00` : `${i}:00`);
    }

    if (end) {
      hours.push('24:00');
    }

    return hours;
  }
  dates(date = new Date()) {
    let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let dates = [];
    for (let i = 1; i <= days; i++) {
      dates.push(i < 10 ? `0${i}` : `${i}`);
    }
    return dates;
  }
  months() {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(i < 10 ? `0${i}` : `${i}`);
    }
    return months;
  }

  unit(unit: TimeUnit, opts?: { end?: boolean; date?: Date; first?: number }) {
    switch (unit) {
      case TimeUnit.Day:
        return this.hours(opts?.end);
      case TimeUnit.Week:
        return this.weeks(opts?.first);
      case TimeUnit.Month:
        return this.dates(opts?.date);
      case TimeUnit.Year:
        return this.months();
      default:
        return [];
    }
  }
}
