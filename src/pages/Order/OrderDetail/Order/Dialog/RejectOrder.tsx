import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const rejectReason = [
  {
    id: 0,
    key: 'out of stock',
    value: 'out of stock',
  },
];
export interface Iform {
  Rejectreason: string;
}

function RejectOrder() {
  const [reason, setReason] = React.useState('');
  const { control } = useFormContext<Iform>();
  return (
    <Box sx={{ m: 3 }}>
      <Typography variant='h6' fontWeight={'bold'}>
        Rejecting Order
      </Typography>
      <Typography>
        Please select a reason <span style={{ color: 'red' }}>*</span>
      </Typography>
      <form>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id='demo-simple-select-label'>
            Rejecting Reason
          </InputLabel>

          <Controller
            defaultValue=''
            name='Rejectreason'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Cancel Reason'
                  {...field}
                >
                  {rejectReason.map((el, index) => {
                    return (
                      <MenuItem
                        key={el.id}
                        value={el.value}
                        onClick={() => {
                          setReason(el.value);
                          console.log(reason);
                        }}
                      >
                        {el.key}
                      </MenuItem>
                    );
                  })}
                </Select>
                {error && (
                  <Typography color='error.main' variant='caption' role='alert'>
                    {error.message}
                  </Typography>
                )}
              </>
            )}
            rules={{
              required: {
                value: true,
                message: 'Please Choose One Option',
              },
            }}
          />
        </FormControl>
      </form>
    </Box>
  );
}

export default RejectOrder;
