import 'swiper/css/bundle';

// import { RootAppComponent } from '@clovertech-portal/common-ui-kit';
import { appWithTranslation } from 'next-i18next';

import localeMap from '@/config/datepickerLocalization';
import config from '@/config/index';

const RootApp = (props) => <div {...{ ...props, localeMap, config }} />;

export default appWithTranslation(RootApp);
