import Button from '@mui/material/Button';
import { bool, func, shape, string } from 'prop-types';

import Image from '../../../../../common/Image';

const FaqCategoryButton = ({ icon, title, settings, handleClick, isActive }) => {
  const iconAttributes = icon.data?.attributes;

  return (
    <Button
      color={isActive ? 'secondary' : 'primary'}
      startIcon={
        iconAttributes ? (
          <Image
            alt={iconAttributes.alternativeText}
            height={16}
            src={iconAttributes.url}
            width={16}
          />
        ) : undefined
      }
      variant={isActive ? 'contained' : 'outlined'}
      onClick={handleClick}
      {...(settings?.button || {})}
      sx={{ width: '100%' }}
    >
      {title}
    </Button>
  );
};

FaqCategoryButton.propTypes = {
  isActive: bool,
  icon: shape().isRequired,
  title: string.isRequired,
  settings: shape(),
  handleClick: func.isRequired
};

FaqCategoryButton.defaultProps = {
  isActive: false,
  settings: null
};

export default FaqCategoryButton;
