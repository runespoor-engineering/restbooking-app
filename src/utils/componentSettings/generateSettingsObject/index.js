const generateSettingsObject = (
  useCustomSettings = false,
  defaultSettings = null,
  customSetting = null
) => ({
  useCustomSettings,
  defaultSettings,
  customSetting
});

export const generateDefaultSettingsObject = (defaultSettings = null) =>
  generateSettingsObject(false, defaultSettings, null);
export const generateCustomSettingsObject = (customSettings = null) =>
  generateSettingsObject(true, null, customSettings);

export default generateSettingsObject;
