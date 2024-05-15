import { isObject } from '../../defining';

/**
 * Get selected settings object.
 * @param {Object | null} settings - Strapi SettingsJSON component.
 * @param {boolean} settings.useCustomSettings - This flag gets to know what settings should be used: default or custom.
 * @param {Object} settings.customSettings - JSON with custom settings.
 * @param {Object} settings.defaultSettings - JSON with default settings.
 * @returns {Object} Selected settings object.
 */
const selectSettings = (settings) => {
  if (!isObject(settings)) {
    return {};
  }
  const { useCustomSettings, customSettings, defaultSettings } = settings;
  return (useCustomSettings ? customSettings : defaultSettings) || {};
};

export default selectSettings;
