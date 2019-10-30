import { Theme } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import { ClassNames } from 'react-day-picker';

import { Color } from '../theme/Color';

function makeNavButton(type: 'prev' | 'next'): CSSProperties {
  return {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    color: Color.Grey500,

    top: '1em',
    position: 'absolute',
    left: type === 'prev' ? 0 : undefined,
    right: type === 'next' ? 0 : undefined,

    '&:hover': {
      cursor: 'pointer',
      color: Color.Blue300,
    },

    '&:after': {
      content: '""',
      display: 'block',
      width: '10px',
      height: '10px',
      border: 'solid currentColor',
      transform: 'rotate(45deg)',
      borderWidth: type === 'prev' ? '0 0 2px 2px' : '2px 2px 0 0',
    },
  };
}

export const useCalendarStyles = makeStyles<Theme, {}, keyof ClassNames>(
  {
    container: {
      display: 'inline-block',
      fontSize: '1rem',
    },

    wrapper: {
      userSelect: 'none',
      position: 'relative',
      flexDirection: 'row',
      paddingBottom: '1em',
    },

    interactionDisabled: {
      // display: 'none',
    },

    navBar: {
      margin: '0 1em',
      position: 'relative',
    },
    navButtonPrev: makeNavButton('prev'),
    navButtonNext: makeNavButton('next'),
    navButtonInteractionDisabled: {
      // display: 'none',
    },

    months: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' },
    month: { margin: '0 1em', marginTop: '1em', userSelect: 'none' },

    caption: {
      padding: '0 0.5em',
      textAlign: 'center',
      marginBottom: '0.5em',
      display: 'table-caption',
    },

    weekdays: { marginTop: '1em', display: 'table-header-group' },
    weekdaysRow: { margin: '8px 0', display: 'flex' },
    weekday: {
      margin: '1px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      color: Color.Grey300,
    },
    weekNumber: {
      display: 'table-cell',
      padding: '0.5em',
      minWidth: '1em',
      borderRight: '1px solid #EAECEC',
      color: '#8B9898',
      verticalAlign: 'middle',
      textAlign: 'right',
      fontSize: '0.75em',
      cursor: 'pointer',
    },

    body: {
      display: 'flex',
      flexDirection: 'column',
    },

    week: { display: 'flex' },
    day: {
      margin: '1px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      color: Color.Grey500,
      position: 'relative',
      cursor: 'pointer',
    },
    footer: { padding: '1em' },
    todayButton: {
      border: 'none',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      boxShadow: 'none',
      color: '#4A90E2',
      fontSize: '0.875em',
      cursor: 'pointer',
    },

    today: { color: Color.Blue300 },
    selected: {},
    disabled: {},
    outside: { visibility: 'hidden' },
  },
  { name: 'Calendar' },
);