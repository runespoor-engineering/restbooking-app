export const getChainedSlug = (splitedSlugs) =>
  splitedSlugs?.join('/')?.replaceAll(/[\\/]{2,}/g, '/') || '/';

export const generateStaticProps = async ({ data, ctx, serverSideTranslations }) => {
  const { locale, params } = ctx;

  return {
    props: {
      slug: getChainedSlug(params?.slug),
      ...data,
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
};
