import {
  Button as MaterialButton,
  CircularProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';
import {
  ButtonClassKey as MuiButtonClassKey,
  ButtonProps as MuiButtonProps,
} from '@material-ui/core/Button';
import { ClassNameMap, CSSProperties } from '@material-ui/styles/withStyles';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { Color } from '../theme/Color';

type ButtonClassKey =
  | Exclude<
      MuiButtonClassKey,
      'textSecondary' | 'outlinedSecondary' | 'containedSecondary'
    >
  | 'textError'
  | 'textSuccess'
  | 'outlinedError'
  | 'outlinedSuccess'
  | 'containedError'
  | 'containedSuccess';

function textVariant(
  text: Color,
  outline: Color,
  background: Color,
): CSSProperties {
  return {
    color: text,
    boxShadow: `0 0 0 0 ${outline}`,
    '&$disabled[aria-busy="false"]': { color: outline },
    '&:not($disabled)': {
      '&:hover, &:active, &[aria-expanded="true"]': {
        backgroundColor: background,
      },
      '&:focus': {
        backgroundColor: background,
        boxShadow: `0 0 0 2px ${outline}`,
      },
    },
  };
}

function outlinedVariant(
  staleText: Color,
  staleBorder: Color,
  disabledText: Color,
  disabledBorder: Color,
  activeText: Color,
  activeOutline: Color,
  activeBackground: Color,
  progress: Color,
): CSSProperties {
  return {
    color: staleText,
    boxShadow: `inset 0 0 0 1px ${staleBorder}, 0 0 0 0 ${activeOutline}`,

    '&$disabled[aria-busy="false"]': {
      color: disabledText,
      boxShadow: `inset 0 0 0 1px ${disabledBorder}, 0 0 0 0 ${activeOutline}`,
    },

    '&:not($disabled)': {
      '&:hover, &:active, &[aria-expanded="true"]': {
        color: activeText,
        backgroundColor: activeBackground,
        boxShadow: `inset 0 0 0 1px ${activeText}, 0 0 0 0 ${activeOutline}`,
      },
      '&:focus': {
        boxShadow: `inset 0 0 0 1px ${activeText}, 0 0 0 2px ${activeOutline}`,
      },
    },

    '&[aria-busy="true"] $label > [role="progressbar"]': { color: progress },
  };
}

function containedVariant(
  stale: Color,
  outline: Color,
  active: Color,
): CSSProperties {
  return {
    backgroundColor: stale,
    '&$disabled': { backgroundColor: outline },
    '&:not($disabled)': {
      '&:focus': { boxShadow: `0 0 0 3px ${outline}` },
      '&:hover, &:active, &[aria-expanded="true"]': { backgroundColor: active },
    },
  };
}

const useStyles = makeStyles<Theme, {}, ButtonClassKey>(
  theme => ({
    root: {
      '&[aria-busy="true"]': {
        '& $label': {
          visibility: 'hidden',

          '& > [role="progressbar"]': {
            position: 'absolute',
            visibility: 'visible',
            fontSize: theme.spacing(2),
            top: `calc(50% - ${theme.spacing(1)}px)`,
            left: `calc(50% - ${theme.spacing(1)}px)`,

            '$sizeLarge &': {
              fontSize: theme.spacing(3),
              top: `calc(50% - ${theme.spacing(1.5)}px)`,
              left: `calc(50% - ${theme.spacing(1.5)}px)`,
            },
          },
        },
      },
    },

    label: {},

    sizeSmall: {},
    sizeLarge: {},
    fullWidth: {},

    text: {},
    textError: textVariant(Color.Red300, Color.Red100, Color.Red50),
    textSuccess: textVariant(Color.Green300, Color.Green100, Color.Green50),
    textPrimary: textVariant(Color.Blue300, Color.Blue100, Color.Blue50),
    textSizeSmall: {},
    textSizeLarge: {},

    outlined: { backgroundColor: Color.White },
    outlinedError: outlinedVariant(
      Color.Red300,
      Color.Red300,
      Color.Red100,
      Color.Red100,
      Color.Red300,
      Color.Red100,
      Color.Red50,
      Color.Red300,
    ),
    outlinedSuccess: outlinedVariant(
      Color.Green300,
      Color.Green300,
      Color.Green100,
      Color.Green100,
      Color.Green300,
      Color.Green100,
      Color.Green50,
      Color.Green300,
    ),
    outlinedPrimary: outlinedVariant(
      Color.Grey500,
      Color.Silver500,
      Color.Silver500,
      Color.Silver400,
      Color.Blue300,
      Color.Blue100,
      Color.Blue50,
      Color.Grey200,
    ),
    outlinedSizeSmall: {},
    outlinedSizeLarge: {},

    contained: { color: Color.White },
    containedError: containedVariant(Color.Red300, Color.Red100, Color.Red500),
    containedSuccess: containedVariant(
      Color.Green300,
      Color.Green100,
      Color.Green500,
    ),
    containedPrimary: containedVariant(
      Color.Blue300,
      Color.Blue100,
      Color.Blue500,
    ),
    containedSizeSmall: {},
    containedSizeLarge: {},

    disableElevation: {},
    focusVisible: {},
    disabled: {},
    colorInherit: {},
    startIcon: {},
    endIcon: {},
    iconSizeSmall: {},
    iconSizeMedium: {},
    iconSizeLarge: {},
  }),
  { name: 'SuperDispatchButton' },
);

export interface ButtonProps
  extends Omit<MuiButtonProps, 'color' | 'variant' | 'classes'> {
  rel?: string;
  target?: string;
  isActive?: boolean;
  isLoading?: boolean;
  classes?: Partial<ClassNameMap<ButtonClassKey>>;
  color: 'primary' | 'error' | 'success';
  variant: 'text' | 'outlined' | 'contained';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      color,
      variant,
      children,
      disabled,
      isActive,
      isLoading,
      className,
      classes,
      ...props
    },
    ref,
  ) => {
    const {
      textError,
      textSuccess,
      outlinedError,
      outlinedSuccess,
      containedError,
      containedSuccess,

      ...buttonClasses
    } = useStyles({ classes });

    const isError = color === 'error';
    const isSuccess = color === 'success';

    const isText = variant === 'text';
    const isOutlined = variant === 'outlined';
    const isContained = variant === 'contained';

    return (
      <MaterialButton
        {...props}
        ref={ref}
        size={size}
        variant={variant}
        classes={buttonClasses}
        disabled={disabled || isLoading}
        color={color === 'primary' ? color : undefined}
        aria-busy={isLoading ? 'true' : 'false'}
        aria-expanded={isActive ? 'true' : 'false'}
        className={clsx(
          {
            [textError]: isText && isError,
            [textSuccess]: isText && isSuccess,

            [outlinedError]: isOutlined && isError,
            [outlinedSuccess]: isOutlined && isSuccess,

            [containedError]: isContained && isError,
            [containedSuccess]: isContained && isSuccess,
          },

          className,
        )}
      >
        {!isLoading ? (
          children
        ) : (
          <>
            {children}
            <CircularProgress size="1em" color="inherit" />
          </>
        )}
      </MaterialButton>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
