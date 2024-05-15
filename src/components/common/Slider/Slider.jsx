/* eslint-disable import/no-unresolved */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { node, oneOf, shape, string } from 'prop-types';
import { useRef } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Swiper } from 'swiper/react';

import selectSettings from '../../../utils/componentSettings/selectSettings';
import RichText from '../RichText';
import { useSliderModules } from './hooks';

const NAVIGATION_POSITION = {
  outside: 'outside',
  inside: 'inside'
};

const getPaginationConfig = (paginationStyle, pagination) => {
  return {
    clickable: true,
    type: pagination?.type || 'bullets',
    ...(pagination?.el && { el: pagination?.el }),
    renderBullet(index, className) {
      return ReactDOMServer.renderToStaticMarkup(
        <div className={className} style={{ ...paginationStyle }} />
      );
    }
  };
};

const SwiperNavigationButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '42px',
  height: '42px',
  borderRadius: '8px',
  backgroundColor: theme.palette.tertiary?.dark,
  color: theme.palette.text.primary
}));

const StyledSlider = styled(Swiper)(({ theme }) => ({
  width: '100%',
  height: '100%',
  '& .swiper-slide': {},
  '& .swiper-button-next': {
    right: '32px',
    width: '48px',
    height: '48px',
    backgroundColor: theme.palette.tertiary?.light,
    color: '#FFF',
    borderRadius: '8px',
    '&:after': {
      fontSize: '12px'
    }
  },
  '& .swiper-button-prev': {
    left: '32px',
    width: '48px',
    height: '48px',
    backgroundColor: theme.palette.tertiary?.light,
    color: '#FFF',
    borderRadius: '8px',
    '&:after': {
      fontSize: '12px'
    }
  },
  '& .swiper-pagination-bullet': {
    width: '32px',
    height: '4px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  '& .swiper-pagination-bullet-active': {
    backgroundColor: '#fff'
  }
}));

const Slider = ({
  title,
  description,
  navigationPosition,
  complexStyle,
  sliderSettings,
  children
}) => {
  const selectedSliderSettings = selectSettings(sliderSettings);
  const { pagination, navigation, autoplay, shouldPauseOnPopoverOpen, ...restOfSliderSettings } =
    selectedSliderSettings || {};
  const isOutsideNavigationEnabled =
    navigation && navigationPosition === NAVIGATION_POSITION.outside;
  const isInsideNavigationEnabled = navigation && navigationPosition === NAVIGATION_POSITION.inside;
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  const sliderModules = useSliderModules(selectedSliderSettings);
  const paginationConfig = getPaginationConfig(complexStyle?.paginationStyle, pagination);

  return (
    <Grid
      container
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: { xs: '16px', md: '20px', lg: '24px', xl: '32px' }
      }}
      {...complexStyle?.sliderGridContainerProps}
    >
      {title && (
        <Grid
          item
          sx={{
            mb: { xs: '16px', md: '20px', lg: '24px', xl: '32px' }
          }}
          {...complexStyle?.titleGridItemProps}
        >
          <Typography
            sx={{ color: 'text.primary', ...complexStyle?.titleTypographySx }}
            variant="h5"
          >
            {title}
          </Typography>
        </Grid>
      )}
      {description && (
        <Grid
          item
          sx={{
            mb: { xs: '16px', md: '20px', lg: '24px', xl: '32px' }
          }}
          {...complexStyle?.descriptionGridItemProps}
        >
          <RichText markdown={description} />
        </Grid>
      )}
      {isOutsideNavigationEnabled && (
        <Grid
          item
          sx={{
            mb: { xs: '16px', md: '20px', lg: '24px', xl: '32px' }
          }}
          {...complexStyle?.outsideNavigationGridItemProps}
        >
          <Box sx={{ display: 'flex', ...complexStyle?.outsideNavButtonsContainerSx }}>
            <SwiperNavigationButton
              ref={navigationPrevRef}
              sx={{ mr: '8px', ...complexStyle?.backSwiperNavigationButtonSx }}
            >
              <ArrowBackIosIcon fontSize="small" />
            </SwiperNavigationButton>
            {pagination?.el === '.outside-pagination' && (
              <Box
                className="outside-pagination"
                sx={{
                  width: '60vw !important',
                  position: 'relative !important',
                  margin: '18px 10px',
                  ...complexStyle?.outsidePaginationSx
                }}
              />
            )}
            <SwiperNavigationButton
              ref={navigationNextRef}
              sx={{ mr: '8px', ...complexStyle?.forwardSwiperNavigationButtonSx }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </SwiperNavigationButton>
          </Box>
        </Grid>
      )}

      <StyledSlider
        cssMode
        autoplay={autoplay}
        modules={sliderModules}
        navigation={isInsideNavigationEnabled}
        pagination={pagination ? paginationConfig : undefined}
        sx={{ ...complexStyle?.sliderContainerStyle }}
        {...restOfSliderSettings}
        onInit={(swiper) => {
          swiperRef.current = swiper;
          if (navigation) {
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
      >
        {children}
      </StyledSlider>
    </Grid>
  );
};

Slider.propTypes = {
  title: string,
  description: string,
  navigationPosition: oneOf([NAVIGATION_POSITION.outside, NAVIGATION_POSITION.inside]),
  complexStyle: shape(),
  sliderSettings: shape(),
  children: node
};

Slider.defaultProps = {
  title: '',
  description: '',
  navigationPosition: NAVIGATION_POSITION.inside,
  complexStyle: undefined,
  sliderSettings: {},
  children: undefined
};

export default Slider;
