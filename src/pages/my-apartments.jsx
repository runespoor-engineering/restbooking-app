import { useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import { useContext } from 'react';

import ProgressAnimation from '../components/common/ProgressAnimation';
import GenericPage from '../components/layouts/blocks/GenericPage';
import HorizontalLayout from '../components/layouts/HorizontalLayout/HorizontalLayout';
import config from '../config';
import { PUBLICATION_STATE } from '../constants/cms';
import { UserContext } from '../context/UserContext/UserContext';
import { LAYOUTS_QUERY_ALL } from '../graphql/queries/collections';
import { USER_APARTMENTS_BOOKING_ORDERS } from '../graphql/queries/collections/apartmentsBookings';
import { PAGES_SLUGS_QUERY } from '../graphql/queries/pages';
import { GENERIC_COMMON_PAGE_QUERY } from '../graphql/queries/staticPageQueries';
import usePermissions from '../hooks/usePermissions';
import useRedirectOnLogout from '../hooks/useRedirectOnLogout';
import initializeApollo from '../utils/apollo/initializeApolloClient';
import { generateStaticProps } from '../utils/pages/generateStaticProps';
import getRootPageProps from '../utils/pages/getRootPageProps';
import { generateStaticPaths, normalizePagesSlugs } from '../utils/pages/getStaticPaths';

const RootPageComponent = ({ slug, globalContentConfigs, globalUiConfigs, pageContents }) => {
  const router = useRouter();
  const { data: userData } = useContext(UserContext);

  const { data } = useQuery(USER_APARTMENTS_BOOKING_ORDERS, {
    variables: {
      userId: userData?.me?.id
    }
  });

  const copyright = globalContentConfigs?.data[0]?.attributes.copyright || null;

  return (
    <HorizontalLayout copyright={copyright}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Apartment</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Start Date)</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.bookingOrders?.data?.map(({ id, attributes }) => (
              <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {attributes.apartment.data?.attributes.title}
                </TableCell>
                <TableCell align="right">{attributes.apartment.data?.attributes.price}</TableCell>
                <TableCell align="right">
                  {attributes.bookingInfo?.startDate?.split('T')[0]}
                </TableCell>
                <TableCell align="right">
                  {attributes.bookingInfo?.endDate?.split('T')[0]}
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      router.push(`/apartment/${attributes.apartment.data?.attributes.slug}`);
                    }}
                  >
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </HorizontalLayout>
  );
};

RootPageComponent.propTypes = {
  slug: PropTypes.string.isRequired,
  globalContentConfigs: PropTypes.shape().isRequired,
  pageContents: PropTypes.shape().isRequired,
  globalUiConfigs: PropTypes.shape().isRequired
};

export default RootPageComponent;

export const getStaticProps = async (ctx) => {
  const apolloClient = initializeApollo();

  const { data: genericData } = await apolloClient.query({
    query: GENERIC_COMMON_PAGE_QUERY,
    variables: {
      brandIdentifier: config.identifier,
      slug: '',
      locale: ctx.locale,
      publicationState: PUBLICATION_STATE.live
    }
  });

  let layoutData = {};
  const { data: layoutQueryData } = await apolloClient.query({
    query: LAYOUTS_QUERY_ALL,
    variables: {
      brandIdentifier: config.identifier,
      locale: ctx.locale
    }
  });
  const [layout = {}] = layoutQueryData.layout.data || [];
  layoutData = layout;

  const staticProps = await generateStaticProps({
    data: {
      ...genericData,
      layout: { ...layoutData }
    },
    ctx,
    serverSideTranslations
  });

  return staticProps;
};
