import { useEffect } from 'react';

const findSelectedCountryIsoById = (countries, selectedId) => {
  return countries.find(({ id }) => id === selectedId)?.iso;
};

const findPhoneInfoByCountryIso = (phoneOptions, countryIso) => {
  return phoneOptions.find(({ iso2 }) => iso2 === countryIso);
};
const useCountryAndPhoneInterdependence = (selectedCountryId, formats, countries, setState) => {
  useEffect(() => {
    if (selectedCountryId && countries) {
      const selectedCountryIso = findSelectedCountryIsoById(countries, selectedCountryId);
      const phoneInfo = findPhoneInfoByCountryIso(formats, selectedCountryIso);
      setState((prevState) => {
        return {
          ...prevState,
          countryCode: phoneInfo?.iso2 || '',
          mask: phoneInfo?.mask || '',
          value: phoneInfo?.mask ? phoneInfo?.mask.replace(/X|\W(?=X)|[)-](?=\sX)/g, '') : '+',
          isMaskSelected: !!phoneInfo
        };
      });
    }
  }, [selectedCountryId, formats, countries, setState]);
};

export default useCountryAndPhoneInterdependence;
