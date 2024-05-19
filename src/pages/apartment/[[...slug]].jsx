import { useMutation } from '@apollo/client';
import { Box, Button } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useContext, useState } from 'react';

import CoverImage from '../../components/common/CoverImage';
import HorizontalLayout from '../../components/layouts/HorizontalLayout/HorizontalLayout';
import config from '../../config';
import { PUBLICATION_STATE } from '../../constants/cms';
import { UserContext } from '../../context/UserContext/UserContext';
import { APARTMENT_QUERY, LAYOUTS_QUERY_ALL } from '../../graphql/queries/collections';
import { APARTMENT_BOOKING_ORDERS } from '../../graphql/queries/collections/apartmentBookings';
import { GAMES_SLUGS_QUERY } from '../../graphql/queries/pages';
import { GENERIC_COMMON_PAGE_QUERY } from '../../graphql/queries/staticPageQueries';
import initializeApollo from '../../utils/apollo/initializeApolloClient';
import { getBookedDates } from '../../utils/getBookedDates';
import { getDatesBetween, isSameDay } from '../../utils/getDatesBetween';
import { generateStaticProps } from '../../utils/pages/generateStaticProps';
import { generateStaticPaths, normalizeGamesSlugs } from '../../utils/pages/getStaticPaths';
import { CREATE_BOOKING_ORDER_MUTATION } from './bookApartMutation';

export const getStaticPaths = async (ctx) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GAMES_SLUGS_QUERY,
    variables: {
      brandIdentifier: config.identifier
    }
  });

  const normalizedGamesSlugs = normalizeGamesSlugs(data.gamesSlugs.data || []);
  const staticPaths = generateStaticPaths({
    normalizedSlugs: normalizedGamesSlugs,
    directSlugs: config.directPageSlugs,
    locales: ctx.locales
  });

  return staticPaths;
};

export const getStaticProps = async (ctx) => {
  const apolloClient = initializeApollo();
  const gameSlug = ctx.params.slug?.[0] || '';

  const { data: apartmentData } = await apolloClient.query({
    query: APARTMENT_QUERY,
    variables: {
      brandIdentifier: config.identifier,
      slug: gameSlug,
      locale: ctx.locale
    }
  });

  const { data: apartmentBookingsData } = await apolloClient.query({
    query: APARTMENT_BOOKING_ORDERS,
    variables: {
      brandIdentifier: config.identifier,
      apartmentSlug: gameSlug,
      locale: ctx.locale
    }
  });

  console.log('apartmentBookingsData', apartmentBookingsData);

  const bookedDates = getBookedDates(apartmentBookingsData?.bookingOrders?.data || []);
  console.log('======bookedDates', bookedDates);

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
      apartmentId: apartmentData.apartment.data[0].id,
      apartment: apartmentData.apartment.data[0],
      ...genericData,
      layout: { ...layoutData },
      bookedDates
    },
    ctx,
    serverSideTranslations
  });

  return staticProps;
};

const RootPageComponent = ({
  apartmentId,
  apartment,
  slug,
  globalContentConfigs,
  globalUiConfigs,
  bookedDates,
  ...rest
}) => {
  console.log('bookedDates', bookedDates);
  const router = useRouter();
  const { isLoggedIn, data } = useContext(UserContext);
  const [value, setValue] = useState([]);
  const [mutate] = useMutation(CREATE_BOOKING_ORDER_MUTATION, {
    variables: {
      input: {
        apartment: apartmentId,
        users_permissions_user: data?.me?.id,
        bookingInfo: {
          startDate: value[0],
          endDate: value[1]
        }
      }
    }
  });
  console.log(value);

  const copyright = globalContentConfigs?.data[0]?.attributes.copyright || null;
  console.log('PAGE', { apartment, slug, globalContentConfigs, globalUiConfigs, ...rest });

  return (
    <HorizontalLayout copyright={copyright}>
      <h1>
        {apartment?.attributes?.title} - {apartment?.attributes?.price}$
      </h1>
      <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
        <CoverImage coverImage={apartment?.attributes?.coverImage} />
      </Box>
      <p>{apartment?.attributes?.shortDescription}</p>
      <p>{apartment?.attributes?.longDescription}</p>
      <DateRangePicker
        disablePast
        shouldDisableDate={(date) =>
          bookedDates?.some((bookedDate) => isSameDay(new Date(bookedDate), date))
        }
        onChange={(newValue) => setValue(newValue)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={isLoggedIn ? () => mutate() : () => router.push('/home')}
      >
        Book
      </Button>
    </HorizontalLayout>
  );
};

export default RootPageComponent;
