import { useContext, useMemo } from 'react';

import { BUTTON_ACTIONS } from '../../../../../constants/cms';
import ActionButtonClickHandlerArgumentsContext from '../../context/ActionButtonClickHandlerArgumentsContext';

const useActionButtonClickHandlerArguments = (buttonAction, buttonLink) => {
  const {
    gameActionClickHandlerArguments,
    bonusActionClickHandlerArguments,
    openRichTextPopoverClickHandlerArguments,
    openTogglePromotionDropDownClickHandlerArguments
  } = useContext(ActionButtonClickHandlerArgumentsContext);
  const buttonActionToHandlerArgumentsMap = useMemo(
    () => ({
      [BUTTON_ACTIONS.playReal]: gameActionClickHandlerArguments,
      [BUTTON_ACTIONS.anonymousPlayReal]: { ...gameActionClickHandlerArguments, link: buttonLink },
      [BUTTON_ACTIONS.playDemo]: gameActionClickHandlerArguments,
      [BUTTON_ACTIONS.toggleFavoriteGame]: gameActionClickHandlerArguments,
      [BUTTON_ACTIONS.claimBonus]: bonusActionClickHandlerArguments,
      [BUTTON_ACTIONS.openPromotionPage]: bonusActionClickHandlerArguments,
      [BUTTON_ACTIONS.openPromotionModal]: bonusActionClickHandlerArguments,
      [BUTTON_ACTIONS.openTermsAndConditionsPopover]: openRichTextPopoverClickHandlerArguments,
      [BUTTON_ACTIONS.togglePromotionDropDown]: openTogglePromotionDropDownClickHandlerArguments,
      [BUTTON_ACTIONS.openLink]: { link: buttonLink },
      [BUTTON_ACTIONS.replaceLink]: { link: buttonLink }
    }),
    [
      bonusActionClickHandlerArguments,
      buttonLink,
      gameActionClickHandlerArguments,
      openRichTextPopoverClickHandlerArguments,
      openTogglePromotionDropDownClickHandlerArguments
    ]
  );

  return buttonActionToHandlerArgumentsMap[buttonAction];
};

export default useActionButtonClickHandlerArguments;
