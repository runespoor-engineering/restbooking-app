import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { func, shape } from 'prop-types';
import { useEffect, useState } from 'react';

import Image from '../../../../../common/Image';

const MAX_WIDTH_PX = 300;

const PREVIEW_NAME_WIDTH_PX = (MAX_WIDTH_PX / 100) * 60; // 60% of MAX_WIDTH_PX

const FilePreview = ({ file, handleDelete }) => {
  const [previewFileData, setPreviewFileData] = useState(null);

  useEffect(() => {
    const setFileData = async () => {
      const fileUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      setPreviewFileData({
        name: file.name,
        url: fileUrl
      });
    };
    setFileData();
  }, [file, setPreviewFileData]);

  return previewFileData ? (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: MAX_WIDTH_PX
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {previewFileData.url && (
          <Box sx={{ mr: '12px' }}>
            <Image alt={previewFileData.name} height={56} src={previewFileData.url} width={56} />
          </Box>
        )}
        <Typography
          sx={{
            color: 'text.primary',
            maxWidth: PREVIEW_NAME_WIDTH_PX,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: { xs: '12px', md: '14px' }
          }}
        >
          {previewFileData.name}
        </Typography>
      </Box>
      <IconButton onClick={handleDelete}>
        <DeleteIcon color="primary" />
      </IconButton>
    </Box>
  ) : (
    <Skeleton height={56} variant="rectangular" width={300} />
  );
};

FilePreview.propTypes = {
  file: shape().isRequired,
  handleDelete: func.isRequired
};

export default FilePreview;
