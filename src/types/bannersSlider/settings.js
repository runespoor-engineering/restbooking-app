import { bool, number, oneOf, shape, string } from 'prop-types';

export default shape({
  autoplay: shape({
    delay: number,
    disableOnInteraction: bool
  }),
  navigation: bool,
  pagination: bool,
  slidesPerView: number,
  breakpoints: shape(),
  aspectRatioKeeper: shape({
    xs: shape({
      aspectRatio: number,
      height: string
    }),
    sm: shape({
      aspectRatio: number,
      height: string
    }),
    md: shape({
      aspectRatio: number,
      height: string
    }),
    lg: shape({
      aspectRatio: number,
      height: string
    }),
    xl: shape({
      aspectRatio: number,
      height: string
    })
  }),
  slideImageTypeBreakpoints: shape({
    xs: oneOf(['small', 'large']),
    sm: oneOf(['small', 'large']),
    md: oneOf(['small', 'large']),
    lg: oneOf(['small', 'large']),
    xl: oneOf(['small', 'large'])
  })
});
