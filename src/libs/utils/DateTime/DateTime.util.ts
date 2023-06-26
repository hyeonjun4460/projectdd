import {
  convert,
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  nativeJs,
} from '@js-joda/core';

export class DateTimeUtil {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(
    'yyyy-MM-dd HH:mm:ss',
  );

  // js-joda를 string으로
  static toString(localDate: LocalDate | LocalDateTime): string {
    if (!localDate) {
      return '';
    }

    if (localDate instanceof LocalDate) {
      return localDate.format(DateTimeUtil.DATE_FORMATTER);
    }
    return localDate.format(DateTimeUtil.DATE_TIME_FORMATTER);
  }

  // js-joda를 date로
  static toDate(localDate: LocalDate | LocalDateTime): Date {
    if (!localDate) {
      return null;
    }

    return convert(localDate).toDate();
  }

  // date를 js-joda로
  static toLocalDate(date: Date): LocalDate {
    if (!date) {
      return null;
    }
    return LocalDate.from(nativeJs(date));
  }

  // date를 js-joda로
  static toLocalDateTime(date: Date): LocalDateTime {
    if (!date) {
      return null;
    }
    return LocalDateTime.from(nativeJs(date));
  }

  // string을 js-joda로
  static fromStringToLocalDate(strDate: string): LocalDate {
    if (!strDate) {
      return null;
    }

    return LocalDate.parse(strDate, DateTimeUtil.DATE_FORMATTER);
  }

  // string을 js-joda로
  static fromStringTotoLocalDateTime(strDate: string): LocalDateTime {
    if (!strDate) {
      return null;
    }

    return LocalDateTime.parse(strDate, DateTimeUtil.DATE_TIME_FORMATTER);
  }
}
