import Box from '@mui/material/Box';
import { node, shape } from 'prop-types';

import Image from '../../../common/Image';

const NavigationItem = ({ children, icon, itemBoxSx, iconBoxSx }) => {
  const iconAttributes = icon.data?.attributes;

  return (
    <Box component="li" sx={{ p: '4px 0', display: 'flex', alignItems: 'center', ...itemBoxSx }}>
      {iconAttributes && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: '4px',
            ...iconBoxSx
          }}
        >
          <Image
            alt={iconAttributes.alternativeText}
            height={16}
            src={iconAttributes.url}
            width={16}
          />
        </Box>
      )}
      {children}
    </Box>
  );
};

NavigationItem.propTypes = {
  children: node,
  icon: shape(),
  itemBoxSx: shape(),
  iconBoxSx: shape()
};

NavigationItem.defaultProps = {
  children: '',
  icon: null,
  itemBoxSx: undefined,
  iconBoxSx: undefined
};

export default NavigationItem;
