import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FormHelperText from '@mui/material/FormHelperText';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { useContext, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { formFieldDataType } from '../../../../../../types';
import Image from '../../../../../common/Image';
import { FormConfigContext } from '../../../context';
import FilePreview from './FilePreview';

const RelativeContainer = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  width: '100%'
});

const removeFile = (fileList, fileIndexToRemove) => {
  const dataTransfer = new DataTransfer();
  if (fileList) {
    Array.from(fileList)?.forEach((file, index) => {
      if (index !== fileIndexToRemove) dataTransfer.items.add(file);
    });
  }
  return dataTransfer.files;
};

const getSingleFileFromDataTransfer = (files) => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(files[0]);
  return dataTransfer.files;
};

const UploaderContainer = styled('label', {
  shouldForwardProp: (prop) => prop !== 'isDragging' && prop !== 'isNotInteracted'
})(({ theme, isDragging, isNotInteracted }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
  height: '100%',
  minHeight: '155px',
  padding: '16px',
  border: isDragging
    ? `1px dashed ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.tertiary.light}`,
  borderRadius: '8px',
  backgroundColor: isNotInteracted ? alpha(theme.palette.text.disabled, 0.1) : undefined
}));

const UploadingIconContainer = styled('div')(({ theme }) => ({
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.tertiary.dark,
  borderRadius: '8px'
}));

const InputFile = ({ fieldData }) => {
  const {
    label,
    name,
    identifier,
    required,
    readonly,
    inputmode,
    disabled,
    placeholder,
    multiple,
    accept,
    muiHelperText,
    autocomplete,
    title,
    defaultUploadIcon,
    interactedUploadIcon
  } = fieldData;
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    watch
  } = useFormContext();
  const { isFormDisabled, isFormReadOnly, handleCloseAlert } = useContext(FormConfigContext);
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const filesValue = watch(name);
  const { onChange, ...fieldAttributes } = register(name);

  const isInputEmpty = useMemo(
    () => !filesValue || Array.from(filesValue).length === 0,
    [filesValue]
  );
  const isNotInteracted = isFormDisabled || isFormReadOnly || readonly || disabled;
  const defaultUploadIconAttributes = defaultUploadIcon.data?.attributes;
  const interactedUploadIconAttributes = interactedUploadIcon.data?.attributes;

  const getDeleteFileHandler = (fileIndexToRemove) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const filteredFiles = removeFile(getValues(name), fileIndexToRemove);
    setValue(name, filteredFiles.length > 0 ? filteredFiles : null, {
      shouldValidate: true
    });
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isNotInteracted) return;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      if (!isDragging) setIsDragging(true);
    }
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isNotInteracted) return;
    if (isDragging) setIsDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isNotInteracted) return;
    if (!isDragging) setIsDragging(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isNotInteracted) return;
    if (isDragging) setIsDragging(false);
    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      setValue(name, multiple ? files : getSingleFileFromDataTransfer(files), {
        shouldValidate: true
      });
      e.dataTransfer.clearData();
    }
  };

  return (
    <RelativeContainer>
      <UploaderContainer
        isDragging={isDragging}
        isNotInteracted={isNotInteracted}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          {...fieldAttributes}
          hidden
          accept={accept}
          autoComplete={autocomplete}
          disabled={isFormDisabled || disabled}
          id={identifier}
          inputMode={inputmode}
          multiple={multiple}
          name={name}
          readOnly={isFormReadOnly || readonly}
          required={required}
          title={title}
          type="file"
          onChange={(...args) => {
            onChange(...args);
            handleCloseAlert?.();
          }}
        />
        {filesValue &&
          Array.from(filesValue)?.map((file, index) => (
            <FilePreview key={file?.name} file={file} handleDelete={getDeleteFileHandler(index)} />
          ))}
        {isDragging
          ? isInputEmpty && (
              <>
                {interactedUploadIconAttributes ? (
                  <Image
                    alt={interactedUploadIconAttributes.alternativeText}
                    height={35}
                    src={interactedUploadIconAttributes.url}
                    width={35}
                  />
                ) : (
                  <ContactMailIcon fontSize="large" sx={{ color: 'primary.main' }} />
                )}
                <Typography sx={{ textAlign: 'center', width: '60%', color: 'primary.main' }}>
                  {t('Drop file here')}
                </Typography>
              </>
            )
          : isInputEmpty && (
              <>
                <UploadingIconContainer>
                  {defaultUploadIconAttributes ? (
                    <Image
                      alt={defaultUploadIconAttributes.alternativeText}
                      height={35}
                      src={defaultUploadIconAttributes.url}
                      width={35}
                    />
                  ) : (
                    <CloudUploadIcon
                      fontSize="large"
                      sx={{ color: isNotInteracted ? 'text.disabled' : 'text.primary' }}
                    />
                  )}
                </UploadingIconContainer>{' '}
                <Typography
                  sx={{
                    textAlign: 'center',
                    width: '60%',
                    color: isNotInteracted ? 'text.disabled' : 'text.primary'
                  }}
                >
                  {label || placeholder}
                </Typography>
              </>
            )}
      </UploaderContainer>
      {((!isNotInteracted && errors[name]?.message) || muiHelperText) && (
        <FormHelperText error={!!errors[name]}>
          {errors[name]?.message || muiHelperText}
        </FormHelperText>
      )}
    </RelativeContainer>
  );
};

InputFile.propTypes = {
  fieldData: formFieldDataType.isRequired
};

InputFile.defaultProps = {};

export default InputFile;
