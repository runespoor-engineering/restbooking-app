import Typography from '@mui/material/Typography';
import { number, shape, string } from 'prop-types';
import { memo } from 'react';

const Counter = ({ value, beforeCounterText, afterCounterText, settings }) => {
  const {
    mainTypographyProps,
    valueTypographyProps,
    beforeCounterTextTypographyProps,
    afterCounterTextTypographyProps
  } = settings || {};

  if (typeof value !== 'number') return null;
  return (
    <Typography color="primary" {...mainTypographyProps}>
      {beforeCounterText && (
        <Typography
          component="span"
          sx={{ width: 'max-content' }}
          {...beforeCounterTextTypographyProps}
        >
          {beforeCounterText}
        </Typography>
      )}
      <Typography component="span" {...valueTypographyProps}>
        {value}
      </Typography>
      {afterCounterText && (
        <Typography component="span" {...afterCounterTextTypographyProps}>
          {afterCounterText}
        </Typography>
      )}
    </Typography>
  );
};

export const counterSettingsType = shape({
  mainTypographyProps: shape(),
  valueTypographyProps: shape(),
  beforeCounterTextTypographyProps: shape(),
  afterCounterTextTypographyProps: shape()
});

Counter.propTypes = {
  value: number,
  beforeCounterText: string,
  afterCounterText: string,
  settings: counterSettingsType
};

Counter.defaultProps = {
  value: undefined,
  beforeCounterText: '',
  afterCounterText: '',
  settings: null
};

export default memo(Counter);
