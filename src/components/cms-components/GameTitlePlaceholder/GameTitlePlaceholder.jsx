import Typography from '@mui/material/Typography';
import { bool, shape } from 'prop-types';
import { useContext } from 'react';

import GameDataContext from '../../../context/GameDataContext';
import { withStaticDataProp } from '../../../hocs';
import selectSettings from '../../../utils/componentSettings/selectSettings';

export const GameTitlePlaceholderCmsName = 'ComponentApartmentApartmentTitlePlaceholder';

export const GameTitlePlaceholder = ({ settings }) => {
  const gameData = useContext(GameDataContext);
  const { title } = gameData || {};
  const selectedSettings = selectSettings(settings);
  const { typographyProps } = selectedSettings;

  if (!title) return null;
  return (
    <Typography component="p" variant="body2" {...typographyProps}>
      {title}
    </Typography>
  );
};

GameTitlePlaceholder.propTypes = {
  settings: shape({
    useCustomSettings: bool.isRequired,
    customSettings: shape({
      typographyProps: shape({})
    }),
    defaultSettings: shape({
      typographyProps: shape({})
    })
  })
};

GameTitlePlaceholder.defaultProps = {
  settings: null
};

export const GameTitlePlaceholderCmsComponent = withStaticDataProp(GameTitlePlaceholder);
