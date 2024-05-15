import PropTypes from 'prop-types';

const JsonLd = ({ markupJson }) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(markupJson) }}
    type="application/ld+json"
  />
);

JsonLd.propTypes = {
  markupJson: PropTypes.shape()
};

JsonLd.defaultProps = {
  markupJson: {}
};

export default JsonLd;
