import { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { CompressImage } from 'utils/compress-util';

export default function UploadButtons({
  accept = 'image/*',
  children,
  multiple = false,
  sx,
  onChange,
  disabled = false,
}: {
  accept?: string;
  children: ReactNode;
  multiple?: boolean;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  onChange?: (file: File[]) => void;
}) {
  return (
    <Box component='label' sx={{ ...sx }}>
      {children}
      <input
        disabled={disabled}
        hidden
        accept={accept}
        multiple={multiple}
        type='file'
        onChange={async (e) => {
          const files = e.target?.files;
          let newFiles: File[] = [];

          if (files && files?.length > 0) {
            await Promise.all(
              Array.from(files).map(async (file) => {
                const compFile = file.type.includes('image')
                  ? await CompressImage(file)
                  : file;
                const newFile = Object.assign(compFile, {
                  preview: URL.createObjectURL(compFile),
                });
                newFiles.push(newFile);
                return file;
              })
            );
            onChange && onChange(newFiles);
          }
          // const file = e.target?.files?.[0];

          // if (file) {
          //   const compFile = await CompressImage(file);
          //   const newFile = Object.assign(compFile, {
          //     preview: URL.createObjectURL(compFile),
          //   });
          //   onChange && onChange(newFile);
          // }
        }}
      />
    </Box>
  );
}
