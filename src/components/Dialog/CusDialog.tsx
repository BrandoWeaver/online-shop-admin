import React, {
  ReactElement,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dialog, Breakpoint } from '@mui/material';

interface ICusDialog {
  maxWidth?: Breakpoint;
  children: ReactNode;
}

export interface ICusDialogHandler {
  open: (param?: any) => void;
  close: () => void;
}

type childrenProps = ReactElement<{ params: any }>;

const CusDialog = forwardRef<ICusDialogHandler, ICusDialog>((props, ref) => {
  const [open, setOpen] = useState(false);
  const { maxWidth = 'xs', children } = props;

  const paramsRef = useRef<any>();

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      open: (params?: any) => {
        paramsRef.current = params;
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }),
    []
  );

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as childrenProps, {
        params: paramsRef.current,
      });
    }
    return child;
  });

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={maxWidth}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      {childrenWithProps}
    </Dialog>
  );
});

export default CusDialog;
