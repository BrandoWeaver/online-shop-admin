import { Fragment, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Checkbox,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { MdDelete, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

import { CusTextField } from 'components/CusMuiComp/CusInputs';

import { IOptionFormInputs } from '../index';

interface IRenderRow {
  index: number;
  id: number;
  title: string;
  price: number;
  afterDiscount: number;
  sku: string;
  edit: boolean;
}

const RenderRow = ({
  edit,
  id,
  index,
  title,
  price,
  afterDiscount,
  sku,
}: IRenderRow) => {
  const theme = useTheme();
  const { control, setValue, getValues } = useFormContext<IOptionFormInputs>();
  const onDeleteClick = () => {
    const allRemovedId = getValues('removedId') || [];
    setValue('removedId', allRemovedId.concat(id));
  };
  return (
    <Fragment>
      {edit && (
        <Grid item xs={1}>
          <Controller
            control={control}
            name={`selectedId`}
            defaultValue={[]}
            render={({ field: { value, onChange, ...rest } }) => (
              <Checkbox
                edge='start'
                size='small'
                icon={
                  <MdCheckBoxOutlineBlank
                    color={theme.palette.text.disabled}
                    size={18}
                  />
                }
                checkedIcon={<MdCheckBox size={18} />}
                checked={value.includes(id)}
                onChange={() =>
                  value.includes(id)
                    ? onChange(value.filter((v) => v !== id))
                    : onChange(value.concat(id))
                }
                {...rest}
              />
            )}
          />
        </Grid>
      )}
      <Grid item xs={!edit ? 4 : 3}>
        <Typography variant='body2' color='text.secondary'>
          {title}
        </Typography>
        {edit && (
          <Controller
            control={control}
            name={`options.${index}.id`}
            defaultValue={id}
            render={({ field }) => (
              <CusTextField type='hidden' {...field} sx={{ display: 'none' }} />
            )}
          />
        )}
      </Grid>
      <Grid item xs={2}>
        {!edit ? (
          <Typography variant='body2' color='text.secondary'>
            $ {price.toFixed(2)}
          </Typography>
        ) : (
          <Controller
            control={control}
            name={`options.${index}.price`}
            defaultValue={price}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <CusTextField
                fullWidth
                error={Boolean(error)}
                variant='outlined'
                type='number'
                size='small'
                inputProps={{ min: 0 }}
                sx={{
                  mr: 2,
                  '&>.MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                  },
                }}
                {...field}
              />
            )}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        {!edit ? (
          <Typography variant='body2' color='text.secondary'>
            $ {afterDiscount.toFixed(2)}
          </Typography>
        ) : (
          <Controller
            control={control}
            name={`options.${index}.afterDiscount`}
            defaultValue={afterDiscount}
            rules={{
              required: true,
              validate: (val, allVal) => val <= allVal.options[index].price,
            }}
            render={({ field, fieldState: { error } }) => (
              <CusTextField
                fullWidth
                error={Boolean(error)}
                variant='outlined'
                type='number'
                size='small'
                inputProps={{ min: 0 }}
                sx={{
                  mr: 2,
                  '&>.MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                  },
                }}
                {...field}
              />
            )}
          />
        )}
      </Grid>
      <Grid item xs={!edit ? 3 : 2}>
        {!edit ? (
          <Typography variant='body2' color='text.secondary'>
            {sku}
          </Typography>
        ) : (
          <Controller
            control={control}
            name={`options.${index}.sku`}
            defaultValue={sku || ''}
            rules={{ required: false }}
            render={({ field, fieldState: { error } }) => (
              <CusTextField
                fullWidth
                error={Boolean(error)}
                variant='outlined'
                size='small'
                sx={{
                  mr: 2,
                  '&>.MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                  },
                }}
                {...field}
              />
            )}
          />
        )}
      </Grid>
      {edit && (
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton size='small' onClick={onDeleteClick}>
            <MdDelete />
          </IconButton>
        </Grid>
      )}
    </Fragment>
  );
};

export default memo(RenderRow);
