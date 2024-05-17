import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { bool, number, oneOf, shape, string } from 'prop-types';
import { useContext, useMemo } from 'react';

import { PROGRESS_ANIMATION_TYPES } from '../../../constants/cms';
import { CmsStaticDataContext } from '../../../context/CmsStaticDataContext';
import useTimer from '../../../hooks/useTimer';
import { imageType } from '../../../types';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import Image from '../Image';
import RichText from '../RichText';
import { useAnimationComponentProps } from './hooks';

const ANIMATION_TYPE_TO_COMPONENT_MAP = {
  [PROGRESS_ANIMATION_TYPES.image]: Image,
  [PROGRESS_ANIMATION_TYPES.richText]: RichText,
  [PROGRESS_ANIMATION_TYPES.mui]: CircularProgress
};

export const ProgressAnimationHeadless = ({ delay, type, image, richText, settings }) => {
  const selectedSettings = selectSettings(settings);
  const { mainBoxSx, imageProps, muiCircularProgressProps } = selectedSettings;
  const AnimationComponent = useMemo(
    () => ANIMATION_TYPE_TO_COMPONENT_MAP[type] || ANIMATION_TYPE_TO_COMPONENT_MAP.mui,
    [type]
  );
  const animationComponentProps = useAnimationComponentProps({
    type,
    image,
    richText,
    imageProps,
    muiCircularProgressProps
  });
  const isTimerFinished = useTimer(delay);

  if (!isTimerFinished) return null;
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...mainBoxSx
      }}
    >
      <AnimationComponent {...animationComponentProps} />
    </Box>
  );
};

const progressAnimationSettingsType = shape({
  mainBoxSx: shape(),
  imageProps: shape(),
  muiCircularProgressProps: shape()
});

ProgressAnimationHeadless.propTypes = {
  delay: number,
  type: oneOf(Object.values(PROGRESS_ANIMATION_TYPES)),
  image: imageType,
  richText: string,
  settings: shape({
    useCustomSettings: bool,
    customSettings: progressAnimationSettingsType,
    defaultSettings: progressAnimationSettingsType
  })
};

ProgressAnimationHeadless.defaultProps = {
  delay: 0,
  type: PROGRESS_ANIMATION_TYPES.mui,
  image: null,
  richText: '',
  settings: null
};

const ProgressAnimation = () => {
  const { globalUiConfigs } = useContext(CmsStaticDataContext);
  const [globalUiConfig = {}] = globalUiConfigs?.data || [];
  const { progressAnimation } = globalUiConfig.attributes || {};
  const { delay, image, richText, settings, type } = progressAnimation || {};
  return (
    <ProgressAnimationHeadless
      delay={delay}
      image={image}
      richText={richText}
      settings={settings}
      type={type}
    />
  );
};

export default ProgressAnimation;
