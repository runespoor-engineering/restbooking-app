import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { node, shape } from 'prop-types';

import Image from '../../../../common/Image';

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  marginRight: '12px',
  backgroundColor: theme.palette.tertiary.light,
  borderRadius: '6px'
}));

const NavigationSubItem = ({ icon, complexSx, children }) => {
  const iconAttributes = icon?.data?.attributes;

  return (
    <MenuItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: { xs: '12px', sm: '16px' },
        ...complexSx?.navigationSubItemBoxSx
      }}
    >
      {iconAttributes && (
        <IconContainer sx={complexSx?.iconContainerSx}>
          <Image
            alt={iconAttributes.alternativeText || 'Primary nav sub item icon'}
            height={16}
            src={iconAttributes.url}
            width={16}
          />
        </IconContainer>
      )}
      {children}
    </MenuItem>
  );
};

export const primaryNavigationSubItemComplexSxType = shape({
  navigationSubItemBoxSx: shape(),
  iconContainerSx: shape()
});

NavigationSubItem.propTypes = {
  children: node,
  icon: shape(),
  complexSx: primaryNavigationSubItemComplexSxType
};

NavigationSubItem.defaultProps = {
  children: '',
  icon: null,
  complexSx: {}
};

export default NavigationSubItem;
