import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes, { shape, string } from 'prop-types';

import NextLinkComposed from '../NextLinkComposed';
import ResponsiveDimensionsImage from '../ResponsiveDimensionsImage';
import RichText from '../RichText';
import { imageType } from '../../../types';

const Tile = ({
  handleClick,
  link,
  displayCounter,
  counter,
  title,
  description,
  isActive,
  icon,
  actionIcon,
  settings
}) => {
  const iconAttributes = icon?.data?.attributes;
  const actionIconAttributes = actionIcon?.data?.attributes;

  const {
    activeMainBoxSx,
    iconProps,
    mainBoxGridContainerProps,
    iconGridItemProps,
    titleGridItemProps,
    descriptionGridItemProps,
    actionIconGridItemProps,
    counterGridItemProps,
    titleTypographyProps,
    actionIconProps,
    counterTypographyProps
  } = settings || {};

  return (
    <Grid
      container
      component={link ? NextLinkComposed : undefined}
      role={link ? 'link' : 'button'}
      {...mainBoxGridContainerProps}
      sx={{
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        p: '20px 12px',
        cursor: 'pointer',
        borderRadius: '8px',
        ...mainBoxGridContainerProps?.sx,
        ...(isActive ? activeMainBoxSx : {})
      }}
      to={link}
      onClick={handleClick}
    >
      {iconAttributes && (
        <Grid item {...iconGridItemProps}>
          <ResponsiveDimensionsImage
            alt={iconAttributes.alternativeText}
            data-testid="Tile-icon"
            height={60}
            src={iconAttributes.url}
            width={60}
            {...iconProps}
          />
        </Grid>
      )}
      {title && (
        <Grid item {...titleGridItemProps}>
          <Typography {...titleTypographyProps}>{title}</Typography>
        </Grid>
      )}
      {actionIconAttributes && (
        <Grid item {...actionIconGridItemProps}>
          <ResponsiveDimensionsImage
            alt={actionIconAttributes.alternativeText}
            data-testid="Tile-action-icon"
            height={25}
            src={actionIconAttributes.url}
            width={25}
            {...actionIconProps}
          />
        </Grid>
      )}
      {description && (
        <Grid item sx={{ color: 'text.primary' }} {...descriptionGridItemProps}>
          <RichText markdown={description} />
        </Grid>
      )}
      {displayCounter && (
        <Grid
          item
          {...counterGridItemProps}
          sx={{
            padding: '2px 10px',
            borderRadius: '16px',
            bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.15),
            ...counterGridItemProps?.sx
          }}
        >
          <Typography color="secondary" {...counterTypographyProps}>
            {counter || '-'}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export const tileSettingsType = shape({
  activeMainBoxSx: shape(),
  iconProps: shape(),
  mainBoxGridContainerProps: shape(),
  iconGridItemProps: shape(),
  titleGridItemProps: shape(),
  descriptionGridItemProps: shape(),
  actionIconGridItemProps: shape(),
  counterGridItemProps: shape(),
  titleTypographyProps: shape(),
  actionIconProps: shape(),
  counterTypographyProps: shape()
});

Tile.propTypes = {
  settings: tileSettingsType,
  link: string,
  handleClick: PropTypes.func,
  isActive: PropTypes.bool,
  displayCounter: PropTypes.bool,
  counter: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  icon: imageType,
  actionIcon: imageType
};

Tile.defaultProps = {
  displayCounter: false,
  counter: 0,
  title: '',
  description: '',
  link: '',
  icon: null,
  actionIcon: null,
  isActive: false,
  settings: null,
  handleClick: undefined
};

export default Tile;
