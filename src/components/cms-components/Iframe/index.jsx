import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { shape } from 'prop-types';

import selectSettings from '../../../utils/componentSettings/selectSettings';
import { AspectRatioKeeper, PositionedContainer } from '../../common/AspectRatioKeeper';
import { useIframeSrc } from './hooks';

const Iframe = styled('iframe')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}));

export const IframeCmsName = 'ComponentPageComponentsIframe';

export const IframeCmsComponent = ({ staticData }) => {
  const { src, iframeTitle, settings } = staticData;
  const selectedSettings = selectSettings(settings);
  const { aspectRatioKeeper = { xs: { aspectRatio: 1 } } } = selectedSettings;

  const iframeSrc = useIframeSrc(src);

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <AspectRatioKeeper aspectRatioKeeper={aspectRatioKeeper} />
      <PositionedContainer aspectRatioKeeper={aspectRatioKeeper}>
        <Iframe allowFullScreen frameBorder="0" src={iframeSrc} title={iframeTitle} />
      </PositionedContainer>
    </Box>
  );
};

IframeCmsComponent.propTypes = {
  staticData: shape().isRequired
};
