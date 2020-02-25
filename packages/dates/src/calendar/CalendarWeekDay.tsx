import { Typography } from '@material-ui/core';
import React from 'react';
import { WeekdayElementProps } from 'react-day-picker';

const weekdaysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function CalendarWeekDay({
  weekday,
  className,
  localeUtils,
}: WeekdayElementProps) {
  return (
    <Typography
      variant="h5"
      component="abbr"
      className={className}
      title={localeUtils.formatWeekdayLong(weekday)}
    >
      {weekdaysShort[weekday]}
    </Typography>
  );
}