import { createContext } from 'react';

const ActionButtonClickHandlerArgumentsContext = createContext({
  bonusActionClickHandlerArguments: {
    promoCode: '',
    bmsBonusId: null,
    promotionRoute: '',
    promotionSlug: ''
  },
  gameActionClickHandlerArguments: {
    gameRoute: '',
    gameSlug: '',
    gamesCatalogStateToSave: null,
    gameProvider: null,
    isFavorite: undefined
  },
  openRichTextPopoverClickHandlerArguments: {
    richText: '',
    popoverConfig: null
  },
  openTogglePromotionDropDownClickHandlerArguments: {
    setIsPromoExpanded: () => {}
  }
});
export default ActionButtonClickHandlerArgumentsContext;
