import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { number, shape, string } from 'prop-types';
import { useMemo } from 'react';

import GameDataContext from '../../../../../context/GameDataContext';
import { imageType } from '../../../../../types';
import { AspectRatioKeeper, PositionedContainer } from '../../../../common/AspectRatioKeeper';
import { aspectRatioKeeperType } from '../../../../common/AspectRatioKeeper/AspectRatioKeeper';
import Image from '../../../../common/Image';
import { GamePreviewDynamicZone } from '../../../../dynamicZones';

const RelativeContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '8px'
});

export const Overlay = styled(Box)(() => ({
  height: '100%',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'opacity .25s ease',
  opacity: 0,
  zIndex: 5,
  backgroundColor: 'rgba(0, 0, 0, 0.87)',
  '&:hover': {
    opacity: 1
  }
}));

const GamePreview = ({
  title,
  thumbnailData,
  route,
  slug,
  aspectRatioKeeper,
  settings,
  imageSizes,
  templateAttributes
}) => {
  const router = useRouter();
  const thumbnailAttributes = thumbnailData?.attributes;
  const { containerSx, imageCss, overlaySx } = settings || {};

  const { uiComponents, uiComponentsOverlay, componentsGridContainerSettings } =
    templateAttributes || {};
  const buttonClickHandlerArgumentsContextValue = useMemo(
    () => ({
      gameActionClickHandlerArguments: {
        gameSlug: slug,
        gameRoute: route
      }
    }),
    [route, slug]
  );

  const gameDataContextValue = useMemo(() => ({ title }), [title]);

  return (
    <Box data-testid="GamePreview">
      <GameDataContext.Provider value={gameDataContextValue}>
        <RelativeContainer role="cell" sx={containerSx}>
          <AspectRatioKeeper aspectRatioKeeper={aspectRatioKeeper} />
          {thumbnailAttributes?.url && (
            <Image
              fill
              alt={title}
              css={{ borderRadius: '8px', ...imageCss }}
              sizes={imageSizes}
              src={thumbnailAttributes.url}
            />
          )}
          <PositionedContainer aspectRatioKeeper={aspectRatioKeeper}>
            <Overlay
              sx={overlaySx}
              onClick={() => {
                router.push(`apartment/${slug}`);
              }}
            >
              <GamePreviewDynamicZone
                buttonClickHandlerArgumentsContextValue={buttonClickHandlerArgumentsContextValue}
                cmsComponents={uiComponentsOverlay}
                gridContainerSettings={componentsGridContainerSettings}
              />
            </Overlay>
          </PositionedContainer>
        </RelativeContainer>

        <GamePreviewDynamicZone
          buttonClickHandlerArgumentsContextValue={buttonClickHandlerArgumentsContextValue}
          cmsComponents={uiComponents}
          gridContainerSettings={componentsGridContainerSettings}
        />
      </GameDataContext.Provider>
    </Box>
  );
};

export const gamePreviewSettingsType = shape({
  containerSx: shape(),
  overlaySx: shape(),
  imageCss: shape()
});

GamePreview.propTypes = {
  settings: gamePreviewSettingsType,
  title: string,
  thumbnailData: imageType,
  route: string.isRequired,
  slug: string.isRequired,
  aspectRatioKeeper: aspectRatioKeeperType,
  imageSizes: string,
  templateId: number
};

GamePreview.defaultProps = {
  settings: null,
  title: '',
  thumbnailData: null,
  aspectRatioKeeper: { xs: { aspectRatio: 1 } },
  imageSizes: '',
  templateId: undefined
};

export default GamePreview;
