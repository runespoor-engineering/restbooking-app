import { useMemo } from 'react';
import {
  Autoplay,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar
} from 'swiper';

const EFFECTS_MAPPER = {
  fade: EffectFade,
  cube: EffectCube,
  coverflow: EffectCoverflow,
  flip: EffectFlip,
  card: EffectCards,
  creative: EffectCreative
};

const useSliderModules = (sliderSettings) => {
  const sliderModules = useMemo(() => {
    if (!sliderSettings) return [];
    const modules = [];
    const { pagination, navigation, autoplay, effect, scrollbar, freeMode } = sliderSettings;
    if (pagination) modules.push(Pagination);
    if (navigation) modules.push(Navigation);
    if (autoplay) modules.push(Autoplay);
    if (effect) modules.push(EFFECTS_MAPPER[sliderSettings.effect]);
    if (scrollbar) modules.push(Scrollbar);
    if (freeMode) modules.push(FreeMode);
    return modules;
  }, [sliderSettings]);

  return sliderModules;
};

export default useSliderModules;
