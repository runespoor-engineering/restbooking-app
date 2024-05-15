import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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

const CollapseIcon = ({ collapseIconAttributes, handleMenuItemCollapse, collapseImageProps }) => {
  return (
    <IconContainer onClick={handleMenuItemCollapse}>
      {collapseIconAttributes ? (
        <Image
          alt={collapseIconAttributes.alternativeText || 'Collapse Icon'}
          height={16}
          src={collapseIconAttributes?.url}
          width={16}
          {...collapseImageProps}
        />
      ) : (
        <ExpandLessIcon />
      )}
    </IconContainer>
  );
};

CollapseIcon.propTypes = {
  collapseIconAttributes: shape(),
  handleMenuItemCollapse: func,
  collapseImageProps: shape()
};

CollapseIcon.defaultProps = {
  collapseIconAttributes: null,
  handleMenuItemCollapse: null,
  collapseImageProps: null
};

export default CollapseIcon;
