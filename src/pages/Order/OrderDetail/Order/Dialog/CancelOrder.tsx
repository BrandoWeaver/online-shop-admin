import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const cancelReason = [
  {
    id: 0,
    key: 'Buyer has no intention to buy',
    value: 'Buyer has no intention to buy',
  },
  {
    id: 1,
    key: 'Buyer changed their mind',
    value: 'Buyer changed their mind',
  },
  {
    id: 2,
    key: 'Delivery fee is too expensive',
    value: 'Delivery fee is too expensive',
  },
  {
    id: 3,
    key: 'Wrong phone number',
    value: 'Wrong phone number',
  },
  {
    id: 4,
    key: 'Wrong phone number',
    value: 'Wrong phone number',
  },
];

interface Icancel {
  setReson: React.Dispatch<React.SetStateAction<string>>;
  reason: string | undefined;
}

function CancelOrder(prop: Icancel) {
  const { control } = useForm();
  return (
    <Box sx={{ m: 3 }}>
      <Typography variant='h6' fontWeight={'bold'}>
        Canceling Order
      </Typography>
      <Typography>
        Please select a reason <span style={{ color: 'red' }}>*</span>
      </Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id='demo-simple-select-label'>Cancel Reason</InputLabel>

        <Controller
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                defaultValue={''}
                label='Cancel Reason'
                {...field}
              >
                {cancelReason.map((el, index) => {
                  return (
                    <MenuItem
                      key={el.id}
                      value={el.value}
                      onClick={() => {
                        prop.setReson(el.value);
                      }}
                    >
                      {el.key}
                    </MenuItem>
                  );
                })}
              </Select>
            </>
          )}
          defaultValue=''
          rules={{
            required: { value: true, message: 'Invalid Input' },
          }}
          name='reason'
          control={control}
        />
      </FormControl>
    </Box>
  );
}

export default CancelOrder;
