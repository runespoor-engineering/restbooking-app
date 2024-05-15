import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { shape, string } from 'prop-types';

import Image from '../../Image';
import RichText from '../../RichText';

const DetailsRichText = styled(RichText)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  [theme.breakpoints.up('sm')]: {
    fontSize: '16px'
  }
}));

const FaqAccordion = ({ expandIcon, summary, summaryIcon, details, settings }) => {
  const expandIconAttributes = expandIcon.data?.attributes;
  const summaryIconAttributes = summaryIcon.data?.attributes;
  const {
    accordionSx,
    summaryTypographyProps,
    accordionSummarySx,
    accordionDetailsSx,
    detailsBoxSx,
    iconProps
  } = settings || {};

  return (
    <Accordion data-cp="accordionSx" sx={{ bgcolor: 'tertiary.dark', ...accordionSx }}>
      <AccordionSummary
        data-cp="accordionSummarySx"
        expandIcon={
          expandIconAttributes ? (
            <Image
              alt={expandIconAttributes.alternativeText}
              data-cp="iconProps"
              height={16}
              src={expandIconAttributes.url}
              width={16}
              {...iconProps}
            />
          ) : (
            <ExpandMoreIcon />
          )
        }
        sx={{ p: { xs: '4px 16px', sm: '12px 24px' }, ...accordionSummarySx }}
      >
        <Typography
          data-cp="summaryTypographyProps"
          sx={{
            fontSize: { xs: '20px', sm: '24px' },
            lineHeight: '1.4',
            color: 'primary.main'
          }}
          {...summaryTypographyProps}
        >
          {summaryIconAttributes && (
            <Image
              alt={summaryIconAttributes.alternativeText}
              data-cp="iconProps"
              height={16}
              src={summaryIconAttributes.url}
              width={16}
              {...iconProps}
            />
          )}{' '}
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        data-cp="accordionDetailsSx"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          p: { xs: '4px 16px 16px 16px', sm: '12px 24px 24px 24px' },
          ...accordionDetailsSx
        }}
      >
        <Box data-cp="detailsBoxSx" sx={detailsBoxSx}>
          <DetailsRichText markdown={details} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const faqAccordionSettingsType = shape({
  summaryTypographyProps: shape(),
  accordionSummarySx: shape(),
  accordionDetailsSx: shape(),
  detailsBoxSx: shape(),
  iconProps: shape()
});

FaqAccordion.propTypes = {
  expandIcon: shape().isRequired,
  summaryIcon: shape().isRequired,
  summary: string.isRequired,
  details: string.isRequired,
  settings: faqAccordionSettingsType
};

FaqAccordion.defaultProps = {
  settings: null
};

export default FaqAccordion;
