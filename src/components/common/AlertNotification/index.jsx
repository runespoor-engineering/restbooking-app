import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';

import useTimer from '../../../hooks/useTimer';

const AlertNotification = ({ isOpen, close, severity, children, duration, ...props }) => {
  const isTimerFinished = useTimer(duration);
  const isSuccess = severity === 'success';

  useEffect(() => {
    if (isTimerFinished && duration) {
      close();
    }
  }, [close, duration, isTimerFinished]);

  if (!close) {
    return (
      <Alert severity={severity} sx={{ mt: '12px' }} variant="filled" {...props}>
        {children}
      </Alert>
    );
  }

  return (
    <Collapse in={isOpen}>
      <Alert
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={close}>
            {!isSuccess && <CloseIcon fontSize="inherit" />}
          </IconButton>
        }
        severity={severity}
        sx={{ mt: '12px' }}
        variant="filled"
        {...props}
      >
        {children}
      </Alert>
    </Collapse>
  );
};

AlertNotification.propTypes = {
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  duration: PropTypes.number
};

AlertNotification.defaultProps = {
  severity: 'success',
  isOpen: false,
  close: undefined,
  duration: null
};
export default memo(AlertNotification);
