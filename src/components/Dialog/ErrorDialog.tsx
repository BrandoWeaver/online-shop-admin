import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface IErrorDialog {
  open: boolean;
  errorTitle?: string;
  errorMessage?: string;
  onCloseDialog: () => void;
}

const ErrorDialog = (props: IErrorDialog) => {
  const { open, errorTitle, errorMessage, onCloseDialog } = props;
  return (
    <Dialog open={open} onClose={onCloseDialog} fullWidth maxWidth="xs">
      <DialogTitle>{errorTitle || "Something went wrong"}</DialogTitle>
      <DialogContent>
        <Typography>{errorMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog}>
          <Typography>OK</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
