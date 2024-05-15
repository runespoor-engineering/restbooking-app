import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes, { shape } from 'prop-types';

const NavigationGroup = ({
  title,
  children,
  groupBoxSx,
  titleTypographySx,
  navigationItemsBoxSx
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:not(:last-of-type)': { marginRight: { xs: '5%', sm: '36px' } },
        ...groupBoxSx
      }}
    >
      <Typography
        color="text.primary"
        fontSize="16px"
        fontWeight="bold"
        sx={{ mb: '24px', ...titleTypographySx }}
        variant="h6"
      >
        {title}
      </Typography>
      <Box
        component="ul"
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', ...navigationItemsBoxSx }}
      >
        {children}
      </Box>
    </Box>
  );
};

NavigationGroup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  groupBoxSx: shape(),
  titleTypographySx: shape(),
  navigationItemsBoxSx: shape()
};

NavigationGroup.defaultProps = {
  title: '',
  children: undefined,
  groupBoxSx: undefined,
  titleTypographySx: undefined,
  navigationItemsBoxSx: undefined
};

export default NavigationGroup;
