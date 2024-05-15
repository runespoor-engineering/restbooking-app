import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { func, shape } from 'prop-types';

import Image from '../../../../common/Image';

const IconContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  marginLeft: 'auto'
}));

const ExpandIcon = ({ expandIconAttributes, handleMenuItemCollapse, expandImageProps }) => (
  <IconContainer onClick={handleMenuItemCollapse}>
    {expandIconAttributes ? (
      <Image
        alt={expandIconAttributes.alternativeText || 'Expand icon'}
        height={16}
        src={expandIconAttributes.url}
        width={16}
        {...expandImageProps}
      />
    ) : (
      <ExpandMoreIcon />
    )}
  </IconContainer>
);

ExpandIcon.propTypes = {
  expandIconAttributes: shape(),
  handleMenuItemCollapse: func,
  expandImageProps: shape()
};

ExpandIcon.defaultProps = {
  expandIconAttributes: null,
  handleMenuItemCollapse: null,
  expandImageProps: null
};

export default ExpandIcon;
