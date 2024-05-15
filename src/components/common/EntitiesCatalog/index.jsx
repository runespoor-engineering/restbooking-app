import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';
import { arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';

import { LOAD_MORE_COUNTER_POSITIONS } from '../../../constants/cms';
import { specialtyButtonType } from '../../../types';
import ConfigurableButton from '../ConfigurableButton';
import { useNormalizedButtonConfig } from '../ConfigurableButton/hooks';
import EntitiesGrid, { entitiesGridSettingsType, loadMoreCounterType } from '../EntitiesGrid';
import LoadMoreCounter, { counterSettingsType } from './components/Counter';

const EntitiesCatalog = ({
  title,
  description,
  entities,
  settings,
  normalizeEntityAttributes,
  button,
  handleButtonClick,
  shouldRenderButton,
  counterConfig,
  counterValue,
  EntityComponent,
  InjectionZoneComponent
}) => {
  const normalizedButtonConfig = useNormalizedButtonConfig(button);
  const { t } = useTranslation();

  const {
    mainGridContainerProps,
    entitiesGridSettings,
    showMoreGridItemProps,
    counterGridItemProps,
    counterSettings
  } = settings || {};

  return (
    <Grid container spacing={3} {...mainGridContainerProps}>
      <EntitiesGrid
        EntityComponent={EntityComponent}
        InjectionZoneComponent={InjectionZoneComponent}
        counterConfig={counterConfig}
        counterValue={counterValue}
        description={description}
        entities={entities}
        normalizeEntityAttributes={normalizeEntityAttributes}
        settings={{ ...entitiesGridSettings, counterSettings, counterGridItemProps }}
        title={title}
      />
      {shouldRenderButton && (
        <Grid
          item
          sx={{ display: 'flex', justifyContent: 'center' }}
          xs={12}
          {...showMoreGridItemProps}
        >
          <ConfigurableButton
            endIcon={normalizedButtonConfig?.endIcon}
            handleClick={handleButtonClick}
            icon={normalizedButtonConfig?.icon}
            isIconButton={normalizedButtonConfig?.isIconButton}
            muiButtonProps={{
              color: 'primary',
              variant: 'contained',
              sx: { m: '24px auto' },
              ...normalizedButtonConfig?.muiButtonProps
            }}
            startIcon={normalizedButtonConfig?.startIcon}
          >
            {normalizedButtonConfig?.text || t('Load more')}
          </ConfigurableButton>
        </Grid>
      )}
      {counterConfig && counterConfig?.position !== LOAD_MORE_COUNTER_POSITIONS.top && (
        <Grid item xs={12} {...counterGridItemProps}>
          <LoadMoreCounter
            afterCounterText={counterConfig.afterCounterText}
            beforeCounterText={counterConfig.beforeCounterText}
            settings={counterSettings}
            value={counterValue}
          />
        </Grid>
      )}
    </Grid>
  );
};

export const entitiesCatalogSettingsType = shape({
  entitiesCountToShowBreakpoints: shape({
    xs: number,
    sm: number,
    md: number,
    lg: number,
    xl: number
  }),
  mainGridContainerProps: shape(),
  entitiesGridSettings: entitiesGridSettingsType,
  showMoreGridItemProps: shape(),
  counterGridItemProps: shape(),
  counterSettings: counterSettingsType
});

EntitiesCatalog.propTypes = {
  title: string,
  description: string,
  entities: shape({
    data: arrayOf(
      shape({
        id: string.isRequired,
        attributes: shape()
      })
    )
  }),
  button: specialtyButtonType,
  handleButtonClick: func,
  shouldRenderButton: bool,
  settings: entitiesCatalogSettingsType,
  EntityComponent: func.isRequired,
  InjectionZoneComponent: func,
  normalizeEntityAttributes: func.isRequired,
  counterConfig: loadMoreCounterType,
  counterValue: oneOfType([number, string])
};

EntitiesCatalog.defaultProps = {
  title: '',
  description: '',
  entities: null,
  button: null,
  handleButtonClick: () => {},
  shouldRenderButton: true,
  counterConfig: null,
  settings: null,
  InjectionZoneComponent: null,
  counterValue: undefined
};

export default EntitiesCatalog;
