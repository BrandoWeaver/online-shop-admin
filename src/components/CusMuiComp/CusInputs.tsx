import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import { Ref, forwardRef, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const CusTextField = styled(
  forwardRef((props: TextFieldProps, ref: Ref<HTMLDivElement> | null) => (
    <TextField ref={ref} variant='filled' {...props} />
  ))
)(({ theme }) => ({
  // '& label.Mui-focused': {
  //   color: 'green',
  // },
  // '& .MuiInput-underline:after': {
  //   borderBottomColor: 'green',
  //   background: 'transparent',
  // },
  '& .MuiFilledInput-root': {
    background: 'transparent',
    border: `2px solid`,
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    '&:before, :after': {
      display: 'none',
    },
    '&.Mui-focused': {
      background: 'transparent',
      borderColor: theme.palette.primary.main,
    },
    '& .MuiFilledInput-input': {
      paddingBottom: 6,
    },
    // '& fieldset': {
    //   borderColor: 'red',
    // },
    // '&:hover fieldset': {
    //   borderColor: 'yellow',
    // },
    // '&.Mui-focused fieldset': {
    //   borderColor: 'green',
    // },
  },
}));

// eslint-disable-next-line react/display-name
const PasswordInput = forwardRef(
  (props: TextFieldProps, ref: Ref<HTMLInputElement> | null) => {
    const [show, setShow] = useState(false);
    return (
      <CusTextField
        inputRef={ref}
        type={show ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShow(!show)}
                onMouseDown={() => setShow(!show)}
                edge='end'
              >
                {show ? <AiFillEyeInvisible /> : <AiFillEye />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    );
  }
);

export { CusTextField, PasswordInput };
