import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import classnames from 'classnames';
import merge from 'lodash/merge';
import { useRouter } from 'next/router';
import { func } from 'prop-types';

import { useCmsStaticDataContext } from '../../../context/CmsStaticDataContext';
import usePermissions from '../../../hooks/usePermissions';
import { imageType } from '../../../types';
import { onFormSubmitRedirectLinkVar } from '../../../utils/apollo/cache';
import selectSettings from '../../../utils/componentSettings/selectSettings';
import removeQueryParameters from '../../../utils/router/removeQueryParameters';
import useSuitableTheme from '../../../utils/theming/useSuitableTheme';
import CmsComponentsGrid from '../../cms-components/СmsComponentsGrid/CmsComponentsGrid';
import { DYNAMIC_MODAL_UI_COMPONENTS_CMS_NAME_TO_COMPONENT_MAP } from '../../cms-components/СmsComponentsGrid/cmsComponentsMaps';
import CoverImage from '../CoverImage';
import Image from '../Image';
import { useDynamicComponentsModalData } from './hooks';

const PREFIX = 'DynamicComponentsModal';
const classes = {
  modal: `${PREFIX}-modal`,
  modalContentContainer: `${PREFIX}-modalContentContainer`,
  modalContentContainerAspectRatio: `${PREFIX}-modalContentContainerAspectRatio`,
  paper: `${PREFIX}-paper`,
  paperSettings: `${PREFIX}-paperSettings`,
  closeModalButton: `${PREFIX}-closeModalButton`,
  closeIcon: `${PREFIX}-closeIcon`,
  backdropContainer: `${PREFIX}-backdropContainer`
};

const StyledDynamicComponentsModalWrapper = styled(Modal, {
  shouldForwardProp: (prop) => prop !== 'paper' && prop !== 'aspectRatio'
})(({ theme, aspectRatio, paper }) => {
  const { background } = theme.palette || {};
  return {
    [`&.${classes.modal}`]: {
      display: 'flex',
      overflowY: 'auto'
    },
    [`& .${classes.modalContentContainer}`]: {
      margin: 'auto',
      width: '100%',
      height: '100%',
      outline: 'none',
      [theme.breakpoints.up('sm')]: {
        maxWidth: '480px',
        width: '85%',
        height: 'max-content'
      }
    },
    [`& .${classes.modalContentContainerAspectRatio}`]: {
      ...aspectRatio
    },
    [`& .${classes.paper}`]: {
      position: 'relative',
      padding: theme.spacing(2),
      height: '100%',
      borderRadius: 0,
      backgroundColor: background.paper,
      overflowY: 'auto',
      [theme.breakpoints.up('sm')]: {
        borderRadius: '20px',
        padding: theme.spacing(3)
      }
    },
    [`& .${classes.paperSettings}`]: {
      ...paper
    },
    [`& .${classes.closeModalButton}`]: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      padding: theme.spacing(1)
    },
    [`& .${classes.backdropContainer}`]: {
      position: 'absolute',
      width: '100vw',
      height: '100vh'
    }
  };
});

const BackdropImage = ({ image }) => {
  const { url, alternativeText } = image;

  return (
    <div className={classes.backdropContainer}>
      {url && <Image fill alt={alternativeText} src={url} style={{ objectFit: 'cover' }} />}
    </div>
  );
};

BackdropImage.propTypes = {
  image: imageType.isRequired
};

const getBackdropImageComponent = (backdropImage) => () => {
  return <BackdropImage image={backdropImage} />;
};

const handleCloseDefault = (router, shouldSaveBrowserHistory) => () => {
  removeQueryParameters(router, ['modal', 'modal-promo'], shouldSaveBrowserHistory);
  onFormSubmitRedirectLinkVar('');
};

const DynamicComponentsModal = ({ handleClose }) => {
  const modalData = useDynamicComponentsModalData();
  const {
    backdropImage,
    backgroundCoverImage,
    permissions,
    modalSettings: settings,
    uiComponents,
    componentsGridContainerSettings,
    useSaveHistoryOnClose
  } = modalData?.attributes || {};
  const modalSettings = settings && selectSettings(settings);
  const { dark: darkNestedTheme, light: lightNestedTheme } = modalSettings?.nestedTheme || {};

  const router = useRouter();
  const [isAllowed] = usePermissions(permissions);
  const currentNestedTheme = useSuitableTheme(darkNestedTheme, lightNestedTheme);
  const { globalUiConfigs } = useCmsStaticDataContext();
  const { useSaveModalHistory } = globalUiConfigs?.data[0]?.attributes || {};
  const shouldSaveBrowserHistoryParameter = useSaveHistoryOnClose || useSaveModalHistory;

  if (!isAllowed) return null;
  return (
    <ThemeProvider theme={(theme) => createTheme(merge(theme, currentNestedTheme))}>
      <CssBaseline />
      <StyledDynamicComponentsModalWrapper
        BackdropComponent={
          backdropImage?.data ? getBackdropImageComponent(backdropImage.data.attributes) : undefined
        }
        className={classes.modal}
        data-testid="DynamicComponentsModal"
        open={!!modalData}
        onClose={handleClose}
        {...(modalSettings?.classNames || {})}
      >
        <div
          className={classnames(
            classes.modalContentContainer,
            classes.modalContentContainerAspectRatio
          )}
        >
          <div className={classnames(classes.paper, classes.paperSettings)}>
            {backgroundCoverImage && (
              <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <CoverImage coverImage={backgroundCoverImage} />
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                data-testid="DynamicComponentsModal-close-button"
                onClick={handleClose(router, shouldSaveBrowserHistoryParameter)}
              >
                <CloseIcon color="primary" />
              </IconButton>
            </Box>
            {uiComponents && (
              <CmsComponentsGrid
                cmsComponents={uiComponents}
                cmsComponentsMap={DYNAMIC_MODAL_UI_COMPONENTS_CMS_NAME_TO_COMPONENT_MAP}
                gridContainerSettings={componentsGridContainerSettings}
              />
            )}
          </div>
        </div>
      </StyledDynamicComponentsModalWrapper>
    </ThemeProvider>
  );
};

DynamicComponentsModal.propTypes = {
  handleClose: func
};

DynamicComponentsModal.defaultProps = {
  handleClose: handleCloseDefault
};

export default DynamicComponentsModal;
