import * as React from 'react';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';

const LoadingSpiner = React.memo((props?: CircularProgressProps) => {
  return (
    <Box sx={{ position: 'relative', lineHeight: 0 }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) => theme.palette.common.white,
        }}
        size={40}
        thickness={5}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: (theme) => theme.palette.primary.main,
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={5}
        {...props}
      />
    </Box>
  );
});

interface IBackdropLoading extends CircularProgressProps {
  open: boolean;
  backdropSx?: SxProps;
}

const BackdropLoading = React.memo(
  ({ open = false, backdropSx, ...rest }: IBackdropLoading) => {
    return (
      <Backdrop
        open={open}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 2, ...backdropSx }}
      >
        <LoadingSpiner {...rest} />
      </Backdrop>
    );
  }
);

export { LoadingSpiner, BackdropLoading };
