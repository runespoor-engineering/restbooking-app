import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

import ConfigContext from '../../../../context/ConfigContext';
import { COUNTRIES_QUERY, REGIONS_QUERY } from '../graphql';
import { mapTerritoriesToOptions } from '../utils';

const useInputOptions = (inputName, watchForm) => {
  const { bmsPartnerId } = useContext(ConfigContext);
  const router = useRouter();
  const countryField = watchForm('countryId');
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [regionsOptions, setRegionsOptions] = useState([]);
  const apolloClient = useApolloClient();

  const getCountriesData = useCallback(async () => {
    const { data: countriesData } = await apolloClient.query({
      query: COUNTRIES_QUERY,
      variables: {
        bmsPartnerId,
        locale: router.locale
      }
    });
    setCountriesOptions(mapTerritoriesToOptions(countriesData.countries));
  }, [apolloClient, bmsPartnerId, router.locale]);

  const getRegionData = useCallback(async () => {
    const { data: regionsData } = await apolloClient.query({
      query: REGIONS_QUERY,
      variables: {
        bmsPartnerId,
        locale: router.locale,
        countryId: +countryField || 0
      }
    });
    setRegionsOptions(mapTerritoriesToOptions(regionsData.regions));
  }, [apolloClient, bmsPartnerId, countryField, router.locale]);

  useEffect(() => {
    if (inputName === 'countryId') {
      getCountriesData();
    }
  }, [inputName, getCountriesData]);

  useEffect(() => {
    if (inputName === 'regionId') {
      getRegionData();
    }
  }, [getRegionData, inputName]);

  return [countriesOptions, regionsOptions];
};

export default useInputOptions;
