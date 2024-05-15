import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

import JsonLd from './components/JsonLd';

const Seo = ({ metadata }) => {
  // Prevent errors if no metadata was set
  if (!metadata) return null;
  return (
    <>
      <NextSeo
        description={metadata.description}
        openGraph={{
          // Title and description are mandatory
          title: metadata.title,
          description: metadata.description,
          ...metadata?.openGraph
        }}
        title={metadata.title}
      />
      {metadata?.microMarkup && <JsonLd markupJson={metadata.microMarkup} />}
    </>
  );
};

Seo.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    microMarkup: PropTypes.shape(),
    openGraph: PropTypes.shape()
  })
};

Seo.defaultProps = {
  metadata: undefined
};

export default memo(Seo);
