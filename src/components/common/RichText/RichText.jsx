import { styled } from '@mui/material/styles';
import Markdown from 'markdown-to-jsx';
import { string } from 'prop-types';

import { RichTextNextLink } from './components';

const StyledNextLink = styled(RichTextNextLink)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const RichText = ({ className, markdown }) =>
  markdown ? (
    <Markdown
      className={className}
      options={{
        overrides: {
          a: {
            component: StyledNextLink
          }
        }
      }}
      role="contentinfo"
    >
      {markdown}
    </Markdown>
  ) : null;

RichText.propTypes = {
  markdown: string,
  className: string
};

RichText.defaultProps = {
  markdown: null,
  className: ''
};

export default RichText;
