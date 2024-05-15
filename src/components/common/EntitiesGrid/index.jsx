import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { arrayOf, func, number, oneOf, oneOfType, shape, string } from 'prop-types';

import { LOAD_MORE_COUNTER_POSITIONS, LOAD_MORE_COUNTER_VARIANTS } from '../../../constants/cms';
import useImageSizes from '../../../hooks/useImageSizes';
import LoadMoreCounter, { counterSettingsType } from '../EntitiesCatalog/components/Counter';
import RichText from '../RichText';

const EntitiesGrid = ({
  title,
  description,
  entities,
  normalizeEntityAttributes,
  EntityComponent,
  InjectionZoneComponent,
  settings,
  counterConfig,
  counterValue
}) => {
  const {
    mainGridItemContainerProps,
    titleGridItemProps,
    titleTypographyProps,
    descriptionGridItemProps,
    entitiesGridItemContainerProps,
    entityGridItemProps,
    entitySettings,
    counterSettings,
    counterGridItemProps
  } = settings || {};

  const imageSizes = useImageSizes(entityGridItemProps);

  return (
    <Grid container item spacing={3} xs={12} {...mainGridItemContainerProps}>
      {title && (
        <Grid item xs={12} {...titleGridItemProps}>
          <Typography variant="h5" {...titleTypographyProps}>
            {title}
          </Typography>
        </Grid>
      )}
      {counterConfig && counterConfig?.position === LOAD_MORE_COUNTER_POSITIONS.top && (
        <Grid item xs={12} {...counterGridItemProps}>
          <LoadMoreCounter
            afterCounterText={counterConfig.afterCounterText}
            beforeCounterText={counterConfig.beforeCounterText}
            settings={counterSettings}
            value={counterValue}
          />
        </Grid>
      )}
      {description && (
        <Grid item sx={{ color: 'text.primary' }} xs={12} {...descriptionGridItemProps}>
          <RichText markdown={description} />
        </Grid>
      )}
      {InjectionZoneComponent && <InjectionZoneComponent />}
      {entities && (
        <Grid container item spacing={2} xs={12} {...entitiesGridItemContainerProps}>
          {entities?.data?.map(({ id, attributes }) => {
            const normalizedEntityAttributes = normalizeEntityAttributes(attributes);
            return (
              <Grid key={id} item lg={3} md={4} sm={6} xs={12} {...entityGridItemProps}>
                <EntityComponent
                  {...normalizedEntityAttributes}
                  imageSizes={imageSizes}
                  settings={entitySettings}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export const entitiesGridSettingsType = shape({
  mainGridItemContainerProps: shape(),
  titleGridItemProps: shape(),
  titleTypographyProps: shape(),
  descriptionGridItemProps: shape(),
  entitiesGridItemContainerProps: shape(),
  entityGridItemProps: shape(),
  entitySettings: shape(),
  counterSettings: counterSettingsType,
  counterGridItemProps: shape()
});
export const loadMoreCounterType = shape({
  variant: oneOf([LOAD_MORE_COUNTER_VARIANTS.static, LOAD_MORE_COUNTER_VARIANTS.dynamic])
    .isRequired,
  position: string,
  afterCounterText: string,
  beforeCounterText: string
});

EntitiesGrid.propTypes = {
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
  settings: entitiesGridSettingsType,
  EntityComponent: func.isRequired,
  InjectionZoneComponent: func,
  normalizeEntityAttributes: func.isRequired,
  counterConfig: loadMoreCounterType,
  counterValue: oneOfType([number, string])
};

EntitiesGrid.defaultProps = {
  title: '',
  description: '',
  entities: null,
  settings: null,
  InjectionZoneComponent: null,
  counterConfig: null,
  counterValue: undefined
};

export default EntitiesGrid;
