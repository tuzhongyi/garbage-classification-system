import { TimeUnit } from '../../enum/time-unit.enum';
import { Duration } from '../../network/model/garbage-station/duration.model';
import { DateTimeEqualsTool } from './date-time-equals.tool';
import { DateTimeDayTool } from './datetime-day.tool';
import { DateTimeMonthTool } from './datetime-month.tool';
import { DateTimeWeekTool } from './datetime-week.tool';

export class DateTimeTool {
  static formatter = {
    yyyyMMddHHmmss: 'yyyy-MM-dd HH:mm:ss',
    yyyyMMdd: 'yyyy-MM-dd',
    HHmmss: 'HH:mm:ss',
    HHmm: 'HH:mm',
  };

  static day = new DateTimeDayTool();
  static week = new DateTimeWeekTool();
  static month = new DateTimeMonthTool();
  static is = new DateTimeEqualsTool();

  static TimeUnit(unit: TimeUnit, date: Date, firstDay = 1): Duration {
    switch (unit) {
      case TimeUnit.Year:
        return this.allYear(date);
      case TimeUnit.Month:
        return this.allMonth(date);
      case TimeUnit.Week:
        return this.allWeek(date, firstDay);
      case TimeUnit.Hour:
      case TimeUnit.Day:
      default:
        return this.allDay(date);
    }
  }
  static allYear(date: Date): Duration {
    let duration = {
      begin: new Date(),
      end: new Date(),
    };
    duration.begin = new Date(date.getFullYear(), 0, 1);
    let next = new Date(duration.begin.getTime());
    next.setFullYear(next.getFullYear() + 1);
    next.setMilliseconds(-1);
    duration.end = next;
    return duration;
  }
  static allMonth(date: Date): Duration {
    let duration = {
      begin: new Date(),
      end: new Date(),
    };
    duration.begin = new Date(date.getFullYear(), date.getMonth(), 1);
    let next = new Date(duration.begin.getTime());
    next.setMonth(next.getMonth() + 1);
    next.setMilliseconds(-1);
    duration.end = next;
    return duration;
  }
  static allDay(date: Date = new Date()): Duration {
    let duration = {
      begin: new Date(),
      end: new Date(),
    };
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    duration.begin = new Date(year, month, day);
    let next = new Date(duration.begin.getTime());
    next.setDate(next.getDate() + 1);
    next.setMilliseconds(-1);
    duration.end = next;
    return duration;
  }
  static allWeek(date: Date, firstDay = 1): Duration {
    let duration = {
      begin: new Date(),
      end: new Date(),
    };
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let weekDay = date.getDay() - firstDay;

    if (weekDay < 0) {
      weekDay = weekDay + 7;
    }

    let begin = new Date(year, month, day);
    begin.setDate(begin.getDate() - weekDay);
    begin.toISOString;
    duration.begin = begin;
    let next = new Date(begin.getTime());
    next.setDate(next.getDate() + 7);
    next.setMilliseconds(-1);
    duration.end = next;
    return duration;
  }

  static beforeOrAfter(date: Date, seconds: number = 30): Duration {
    let duration = {
      begin: new Date(),
      end: new Date(),
    };

    let begin = new Date(date.getTime());
    begin.setSeconds(begin.getSeconds() - seconds);
    duration.begin = new Date(begin.getTime());

    let end = new Date(date.getTime());
    end.setSeconds(end.getSeconds() + seconds);
    duration.end = end;

    return duration;
  }
  static second(date: Date, before: number, after: number): Duration {
    let duration = {
      begin: new Date(date.getTime()),
      end: new Date(date.getTime()),
    };
    duration.begin.setSeconds(duration.begin.getSeconds() + before);
    duration.end.setSeconds(duration.end.getSeconds() + after);
    return duration;
  }
  static before(date: Date, seconds: number = 30): Duration {
    let duration = {
      begin: new Date(),
      end: new Date(date.getTime()),
    };

    let begin = new Date(date.getTime());
    begin.setSeconds(begin.getSeconds() - seconds);
    duration.begin = new Date(begin.getTime());

    return duration;
  }
  static beforeDay(date: Date, day: number = 7): Duration {
    let duration = {
      begin: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - day
      ),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    };
    duration.end.setMilliseconds(-1);
    return duration;
  }
}
