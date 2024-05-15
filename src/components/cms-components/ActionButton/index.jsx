import { shape } from 'prop-types';
import { useContext, useMemo } from 'react';

import ConfigurableButton from '../../common/ConfigurableButton';
import { ActionButtonClickHandlersContext } from './context/ActionButtonClickHandlersContext';
import { useActionButtonClickHandlerArguments } from './hooks';
import useNormalizeActionButtonConfig from './hooks/useNormalizeActionButtonConfig';

export const GlobalAnonymousActionButtonCmsName = 'ComponentButtonsGlobalAnonymousActionButton';
export const GlobalAuthenticatedActionButtonCmsName =
  'ComponentButtonsGlobalAuthenticatedActionButton';
export const BannerAnonymousActionButtonCmsName = 'ComponentButtonsBannerAnonymousActionButton';
export const BannerAuthenticatedActionButtonCmsName =
  'ComponentButtonsBannerAuthenticatedActionButton';
export const PromotionAnonymousActionButtonCmsName =
  'ComponentButtonsPromotionAnonymousActionButton';
export const PromotionAuthenticatedActionButtonCmsName =
  'ComponentButtonsPromotionAuthenticatedActionButton';
export const PromotionModalAnonymousActionButtonCmsName =
  'ComponentButtonsPromotionModalAnonymousActionButton';
export const PromotionModalAuthenticatedActionButtonCmsName =
  'ComponentButtonsPromotionModalAuthenticatedActionButton';
export const GameAnonymousActionButtonCmsName = 'ComponentButtonsGameAnonymousActionButton';
export const GameAuthenticatedActionButtonCmsName = 'ComponentButtonsGameAuthenticatedActionButton';
export const GlobalGenericActionButtonCmsName = 'ComponentButtonsGlobalGenericActionButton';

const getButtonAction = ({
  muiButtonAction,
  muiButtonAnonymousAction,
  muiButtonAuthenticatedAction,
  muiPromotionModalButtonAnonymousAction,
  muiPromotionModalButtonAuthenticatedAction
}) =>
  muiButtonAction ||
  muiButtonAnonymousAction ||
  muiButtonAuthenticatedAction ||
  muiPromotionModalButtonAnonymousAction ||
  muiPromotionModalButtonAuthenticatedAction;

export const ActionButton = ({ staticData }) => {
  const { buttonClickHandlers } = useContext(ActionButtonClickHandlersContext);
  const buttonAction = useMemo(() => getButtonAction(staticData), [staticData]);
  const handlerArguments = useActionButtonClickHandlerArguments(
    buttonAction,
    staticData?.muiButtonLink
  );
  const normalizedActionButtonConfig = useNormalizeActionButtonConfig(
    staticData,
    buttonAction,
    handlerArguments?.isFavorite
  );
  const buttonClickHandler = useMemo(
    () =>
      handlerArguments
        ? buttonClickHandlers[buttonAction](handlerArguments)
        : buttonClickHandlers[buttonAction],
    [buttonAction, buttonClickHandlers, handlerArguments]
  );

  return (
    <ConfigurableButton
      dataTestId={`ActionButton-${buttonAction}`}
      endIcon={normalizedActionButtonConfig.endIcon}
      handleClick={buttonClickHandler}
      icon={normalizedActionButtonConfig.icon}
      isIconButton={normalizedActionButtonConfig.isIconButton}
      muiButtonProps={normalizedActionButtonConfig.muiButtonProps}
      startIcon={normalizedActionButtonConfig.startIcon}
    >
      {normalizedActionButtonConfig.text}
    </ConfigurableButton>
  );
};

ActionButton.propTypes = {
  staticData: shape().isRequired
};
