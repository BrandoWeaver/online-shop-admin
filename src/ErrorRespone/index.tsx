import Stack from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface IErrorResponse {
  message: string | Error;
  height?: string;

  buttonText?: string;
  buttonAction?: () => void;
  typographyProps?: TypographyProps;
}

export default function ErrorResponse({
  message = 'something wrong',
  height = 'calc(100% - 76px)',

  buttonText = 'Refresh',
  buttonAction,
  typographyProps,
}: IErrorResponse) {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      height={height}
      spacing={1}
    >
      <Typography variant='h6' color='text.secondary' {...typographyProps}>
        {typeof message === 'string'
          ? message
          : message.error || message.error_description || message.message}
      </Typography>
      {buttonText && buttonAction && (
        <Button onClick={buttonAction}>{buttonText}</Button>
      )}
    </Stack>
  );
}
