import { JSXElementConstructor, ReactElement } from 'react';

import { Grow, Paper, ClickAwayListener, Box, styled } from '@mui/material';
import Popper, { PopperProps } from '@mui/material/Popper';

export const StyledPopper = styled(Popper)(({ theme }) => ({
  // You can replace with `PopperUnstyled` for lower bundle size.
  zIndex: theme.zIndex.drawer + 1,
  minWidth: 230,
  '&[data-popper-placement*="bottom"] .arrow': {
    top: 0,
    right: 9,
    marginTop: '-1em',
    width: '3em',
    height: '1.2em',
    '&::before': {
      borderWidth: '0 1em 1.2em 1em',
      borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
    },
  },
}));

const CusPopper = ({
  open,
  handleClose,
  anchorEl,

  arrow = true,
  placement = 'bottom-end',
  children,
}: {
  arrow?: boolean;
  placement?: PopperProps['placement'];
  anchorEl: HTMLElement | (() => HTMLElement) | null | undefined;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  open: boolean;
  handleClose: () => void;
}) => {
  let transformOrigin = '100% 0 0';
  switch (placement) {
    case 'bottom-start':
      transformOrigin = '0 0 0';
      break;

    default:
      break;
  }
  return (
    <StyledPopper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      transition
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
        },
      ]}
      sx={{ minWidth: 180 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps} style={{ transformOrigin }} timeout={250}>
          <Paper
            elevation={4}
            sx={{ backgroundColor: 'common.white', borderRadius: 1 }}
          >
            {arrow && (
              <Box
                className='arrow'
                component='span'
                sx={{
                  position: 'absolute',
                  fontSize: 7,
                  width: '3em',
                  height: '3em',
                  '&::before': {
                    content: '""',
                    margin: 'auto',
                    display: 'block',
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                  },
                }}
              />
            )}
            <ClickAwayListener
              onClickAway={(e) => {
                // console.log('onClickAway event:', e);
                handleClose();
              }}
            >
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </StyledPopper>
  );
};

export default CusPopper;
