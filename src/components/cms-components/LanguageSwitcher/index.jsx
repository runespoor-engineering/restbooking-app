import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import { shape } from 'prop-types';

import { useCmsStaticDataContext } from '../../../context/CmsStaticDataContext';
import selectSettings from '../../../utils/componentSettings/selectSettings';

export const LanguageSwitcherCmsName = 'ComponentPageComponentsLanguageSwitcher';
export const LanguageSwitcher = ({ staticData }) => {
  const router = useRouter();
  const { brands } = useCmsStaticDataContext();
  const { languages } = brands.data[0].attributes;
  const selectedSettings = selectSettings(staticData.settings);

  const handleSelectChange = (event) => {
    event.preventDefault();
    const { asPath } = router;
    router.push(asPath, asPath, { locale: event.target.value });
  };

  return (
    <Box data-testid="language-switcher" sx={{ width: '100%' }}>
      <Select
        native
        defaultValue={router.locale}
        sx={{ width: '100%', ...selectedSettings?.selectSx }}
        onChange={handleSelectChange}
      >
        {languages.data?.map(({ attributes }) => {
          return (
            <option key={attributes.value} value={attributes.value}>
              {attributes.name}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

LanguageSwitcher.propTypes = {
  staticData: shape().isRequired
};
