import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';
import { func, number, shape } from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const animationBefore = keyframes`
0% {
    transform: rotateX(0);
    z-index: 50;
  }
  50% {
    transform: rotateX(-90deg);
    display: none;
  }
  100% {
    transform: rotateX(-90deg);
  }
`;

const animationAfter = keyframes`
0% {
    transform: rotateX(-90deg);
    z-index: 50;
  }
  50% {
    transform: rotateX(-90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
`;

const DigitBefore = styled(Typography)(() => ({
  margin: 0,
  fontSize: '16px',
  transformOrigin: '0 100%',
  position: 'absolute',
  height: 'calc(50% + 1px)',
  overflow: 'hidden',
  bottom: 0,
  transformStyle: 'preserve-3d',
  animation: `${animationBefore} 0.4s`,
  top: 0,
  background: '#413c69'
}));

const DiginPrev = styled(Typography)(() => ({
  fontSize: '16px',
  margin: 0,
  position: 'absolute',
  display: 'none',
  overflow: 'hidden',
  zIndex: 2,
  height: '50%',
  lineHeight: 0,
  bottom: '0px',
  background: '#413c69'
}));

const DigitAfter = styled(Typography)(() => ({
  margin: 0,
  fontSize: '16px',
  transformOrigin: '0 0',
  height: '50%',
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  animation: `${animationAfter} 0.4s`,
  lineHeight: 0,
  position: 'absolute',
  bottom: '0px',
  zIndex: 3,
  background: '#413c69'
}));

const DigitCurrent = styled(Typography)(() => ({
  fontSize: '16px',
  height: '16px',
  margin: 0,
  top: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  zIndex: 1
}));

const DigitContainer = styled(Box)(() => ({
  height: '16px',
  width: '70px',
  position: 'relative',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center'
}));

const FlipDigit = ({ initCurrentValue, formatValue, settings }) => {
  const [currentValue, changeCurrentValue] = useState(initCurrentValue);
  const [currentShownValue, changeCurrentShownValue] = useState('');
  const [previousShownValue, changePreviousShownValue] = useState('');
  const digitBefore = useRef(null);
  const digitPreviousRef = useRef(null);
  const digitCurrentRef = useRef(null);
  const digitAfterRef = useRef(null);
  const { digitContainerSx, digitBeforeSx, digitPrevSx, digitCurrentSx, digitAfterSx } =
    settings || {};

  useEffect(() => {
    digitBefore.current.style.display = 'flex';
    digitAfterRef.current.style.display = 'flex';
    digitPreviousRef.current.style.display = 'flex';
    changeCurrentValue(initCurrentValue);
    changeCurrentShownValue(formatValue(initCurrentValue));
    changePreviousShownValue(formatValue(initCurrentValue + 1));
  }, [initCurrentValue, formatValue]);

  useEffect(() => {
    changeCurrentShownValue(formatValue(currentValue));
    changePreviousShownValue(formatValue(currentValue + 1));
  }, [currentValue, formatValue]);

  useEffect(() => {
    setTimeout(() => {
      digitBefore.current.style.display = 'none';
      digitAfterRef.current.style.display = 'none';
      digitPreviousRef.current.style.display = 'none';
    }, 400);
  }, [currentValue]);
  return (
    <DigitContainer sx={digitContainerSx}>
      <DigitBefore ref={digitBefore} sx={digitBeforeSx}>
        {previousShownValue}
      </DigitBefore>
      <DiginPrev ref={digitPreviousRef} sx={digitPrevSx}>
        {previousShownValue}
      </DiginPrev>
      <DigitCurrent ref={digitCurrentRef} sx={digitCurrentSx}>
        {currentShownValue}
      </DigitCurrent>
      <DigitAfter ref={digitAfterRef} sx={digitAfterSx}>
        {currentShownValue}
      </DigitAfter>
    </DigitContainer>
  );
};

FlipDigit.propTypes = {
  initCurrentValue: number.isRequired,
  formatValue: func.isRequired,
  settings: shape()
};

FlipDigit.defaultProps = {
  settings: null
};

export default FlipDigit;
