import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { bool, func, number, shape, string } from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import useCountdownTimer from '../../../hooks/useCountdownTimer';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import FlipDigit from './components/FlipDigit';

const CountdownWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}));

const CountdownBox = styled(Box)(() => ({
  backgroundColor: '#413c69',
  fontWeight: 700,
  color: '#dcd6f7',
  borderRadius: '15px',
  width: '70px',
  height: '70px',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
}));

const Digit = ({ initCurrentValue, formatValue, settings }) => (
  <Typography {...settings?.digitTypographyProps}>{formatValue(initCurrentValue)}</Typography>
);

const CountdownTimer = ({ countdownData }) => {
  const {
    useFlipAnimation,
    timerFormat,
    timerDaysTitle,
    timerHoursTitle,
    timerMinutesTitle,
    timerSecondsTitle,
    targetDate,
    title,
    settings
  } = countdownData;
  const timeLeft = useCountdownTimer(targetDate);
  const digitsToShow = useMemo(
    () => ['days', 'hours', 'minutes', 'seconds'].slice(0, timerFormat.split('_').length),
    [timerFormat]
  );
  const DigitComponent = useMemo(() => (useFlipAnimation ? FlipDigit : Digit), [useFlipAnimation]);
  const countdownSettings = selectSettings(settings);
  const {
    mainBoxSx,
    countdownWrapperSx,
    titleTypographyProps,
    countdownBoxSx,
    digitTitleTypographyProps,
    digitWrapperSx,
    digitSettings
  } = countdownSettings || {};

  const formatValue = useCallback((value) => {
    return String(value).length < 2 ? `0${value}` : String(value);
  }, []);

  return (
    <Box sx={{ ...mainBoxSx }}>
      {title && (
        <Typography sx={{ color: 'text.primary' }} {...titleTypographyProps}>
          {title}
        </Typography>
      )}
      <CountdownWrapper sx={countdownWrapperSx}>
        {digitsToShow.map((digitName, index) => {
          const digitValue = timeLeft[digitName];
          const timerTitle = [
            timerDaysTitle,
            timerHoursTitle,
            timerMinutesTitle,
            timerSecondsTitle
          ][index];

          return (
            <Box key={digitName} sx={digitWrapperSx}>
              <CountdownBox sx={countdownBoxSx}>
                <DigitComponent
                  formatValue={formatValue}
                  initCurrentValue={digitValue}
                  settings={digitSettings}
                />
              </CountdownBox>
              <Typography {...digitTitleTypographyProps}>{timerTitle}</Typography>
            </Box>
          );
        })}
      </CountdownWrapper>
    </Box>
  );
};

CountdownTimer.propTypes = {
  countdownData: shape({
    useFlipAnimation: bool,
    timerFormat: string,
    timerDaysTitle: string,
    timerHoursTitle: string,
    timerMinutesTitle: string,
    timerSecondsTitle: string,
    targetDate: string,
    title: string,
    settings: shape()
  }).isRequired
};

Digit.propTypes = {
  initCurrentValue: number.isRequired,
  formatValue: func.isRequired,
  settings: shape({
    digitTypographyProps: shape()
  })
};

Digit.defaultProps = {
  settings: null
};

export default CountdownTimer;
