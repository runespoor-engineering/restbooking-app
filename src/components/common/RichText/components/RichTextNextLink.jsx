import { arrayOf, node, oneOfType, string } from 'prop-types';

import NextLinkComposed from '../../NextLinkComposed';

const RichTextNextLink = ({ href, className, children, ...linkAttributes }) => {
  return (
    <NextLinkComposed className={className} prefetch={false} to={href} {...linkAttributes}>
      {children}
    </NextLinkComposed>
  );
};

RichTextNextLink.propTypes = {
  href: string.isRequired,
  className: string,
  children: oneOfType([arrayOf(node), node]).isRequired
};

RichTextNextLink.defaultProps = {
  className: ''
};

export default RichTextNextLink;
