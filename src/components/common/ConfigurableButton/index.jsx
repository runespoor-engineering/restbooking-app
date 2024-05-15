import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { bool, func, node, shape, string } from 'prop-types';
import { useMemo } from 'react';

import useCurrentBreakpoint from '../../../hooks/useCurrentBreakpoint';
import { getResponsiveValue } from '../../../utils/mediaQueryBreakpoints';
import Image from '../Image';
import NextLinkComposed from '../NextLinkComposed';

const normalizeMuiButtonProps = (muiButtonProps, currentBreakpoint) => {
  const { size } = muiButtonProps || {};
  return {
    ...muiButtonProps,
    size: typeof size === 'object' ? getResponsiveValue(size, currentBreakpoint) : size
  };
};

const ConfigurableButton = ({
  isIconButton,
  link,
  handleClick,
  muiButtonProps,
  startIcon,
  endIcon,
  icon,
  children,
  dataTestId
}) => {
  const startIconAttributes = startIcon?.data?.attributes;
  const endIconAttributes = endIcon?.data?.attributes;
  const iconAttributes = icon?.data?.attributes;
  const currentBreakpoint = useCurrentBreakpoint();
  const normalizedButtonProps = useMemo(
    () => normalizeMuiButtonProps(muiButtonProps, currentBreakpoint),
    [currentBreakpoint, muiButtonProps]
  );

  return isIconButton ? (
    <IconButton
      component={link ? NextLinkComposed : undefined}
      data-testid={dataTestId}
      to={link}
      {...normalizedButtonProps}
      onClick={handleClick}
    >
      {iconAttributes && (
        <Image
          alt={iconAttributes.alternativeText}
          data-testid="ConfigurableButton-iconButton-image"
          height={16}
          src={iconAttributes.url}
          width={16}
          {...muiButtonProps?.imageProps}
        />
      )}
    </IconButton>
  ) : (
    <Button
      component={link ? NextLinkComposed : undefined}
      data-testid={dataTestId}
      {...normalizedButtonProps}
      endIcon={
        endIconAttributes && (
          <Image
            alt={endIconAttributes.alternativeText}
            data-testid="ConfigurableButton-button-endIcon"
            height={16}
            src={endIconAttributes.url}
            width={16}
            {...muiButtonProps?.imageProps}
          />
        )
      }
      startIcon={
        startIconAttributes && (
          <Image
            alt={startIconAttributes.alternativeText}
            data-testid="ConfigurableButton-button-startIcon"
            height={16}
            src={startIconAttributes.url}
            width={16}
            {...muiButtonProps?.imageProps}
          />
        )
      }
      to={link}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

ConfigurableButton.propTypes = {
  children: node,
  link: string,
  handleClick: func,
  muiButtonProps: shape(),
  startIcon: shape(),
  endIcon: shape(),
  dataTestId: string,
  isIconButton: bool.isRequired,
  icon: shape(),
  disabled: bool
};

ConfigurableButton.defaultProps = {
  children: null,
  handleClick: undefined,
  link: undefined,
  muiButtonProps: null,
  startIcon: null,
  endIcon: null,
  dataTestId: undefined,
  icon: null,
  disabled: false
};

export default ConfigurableButton;
