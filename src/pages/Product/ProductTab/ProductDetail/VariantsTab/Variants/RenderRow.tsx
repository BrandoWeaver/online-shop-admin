import { Fragment, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Autocomplete,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { MdClose, MdDeleteOutline } from 'react-icons/md';
import { CusTextField } from 'components/CusMuiComp/CusInputs';

const RenderRow = ({
  baseName,
  edit,
  level,
  varTitle,
  varOptions,

  selected,
  onOptionClick,
  onDeleteClick,
}: {
  baseName: string;
  edit: boolean;
  level: number;
  varTitle: string;
  varOptions: string[];

  selected: string;
  onOptionClick: (data: string) => void;
  onDeleteClick: () => void;
}) => {
  const { control } = useFormContext();
  return (
    <Fragment>
      <Grid item xs={3}>
        {!edit ? (
          <Typography variant='body2' color='text.primary'>
            {varTitle}:
          </Typography>
        ) : (
          <>
            <Controller
              control={control}
              name={`${baseName}.level`}
              defaultValue={level}
              render={({ field }) => (
                <CusTextField variant='standard' type='hidden' {...field} />
              )}
            />
            <Controller
              control={control}
              name={`${baseName}.groupTitle`}
              defaultValue={varTitle}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <CusTextField
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
          </>
        )}
      </Grid>
      <Grid item xs={8}>
        {!edit ? (
          <Stack direction='row' spacing={1}>
            {varOptions?.map((ch, j) => (
              <Chip
                color={selected === ch ? 'primary' : 'default'}
                key={j}
                label={ch}
                sx={{ borderRadius: 1.5 }}
                clickable
                onClick={() => onOptionClick(ch)}
              />
            ))}
          </Stack>
        ) : (
          <Controller
            control={control}
            name={`${baseName}.options`}
            defaultValue={varOptions}
            rules={{ required: true }}
            render={({
              field: { onChange, ...rest },
              fieldState: { error },
            }) => (
              <Autocomplete
                freeSolo
                multiple
                disableClearable
                clearOnBlur
                size='small'
                options={[]}
                onChange={(e, v) => {
                  // console.log('onChange:', v);
                  onChange(v);
                }}
                renderTags={(value: readonly string[], getTagProps) =>
                  value?.map((option: string, index: number) => (
                    <Chip
                      label={option}
                      sx={{
                        bgcolor: 'common.white',
                        borderRadius: 1.5,
                      }}
                      deleteIcon={<MdClose size={14} />}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <CusTextField
                    error={Boolean(error)}
                    variant='outlined'
                    sx={{
                      mr: 2,
                      '&>.MuiOutlinedInput-root': {
                        bgcolor: 'background.paper',
                        overflow: 'hidden',
                      },
                    }}
                    {...params}
                  />
                )}
                {...rest}
              />
            )}
          />
        )}
      </Grid>
      <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {edit && (
          <IconButton color='default' size='small' onClick={onDeleteClick}>
            <MdDeleteOutline />
          </IconButton>
        )}
      </Grid>
    </Fragment>
  );
};

export default memo(RenderRow);
