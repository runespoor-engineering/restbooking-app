import Typography from '@mui/material/Typography';
import { shape, string } from 'prop-types';

import RichTextComponent from '../../common/RichText';

const RichText = ({ staticData }) => {
  return (
    <Typography component="div" sx={{ color: 'text.primary' }}>
      <RichTextComponent markdown={staticData?.content} />
    </Typography>
  );
};

RichText.propTypes = {
  staticData: shape({
    content: string
  }).isRequired
};
export default RichText;
