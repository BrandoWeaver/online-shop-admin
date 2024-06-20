import { Controller, useFormContext } from 'react-hook-form';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { MdAdd, MdClose } from 'react-icons/md';

import { CusTextField } from 'components/CusMuiComp/CusInputs';
import InputFile from 'components/InputFile';
import { InventoryStatusLabel, InventoryStatusEnum } from 'utils/data-util';

import { IProductForm } from '../index';
import TextEditor from 'components/TextEditor';
import { memo } from 'react';

const ProductForm = ({
  allCategory,
}: {
  allCategory?: IProduct.IProCategory[];
}) => {
  const theme = useTheme();
  const { control, getValues, setValue, watch } =
    useFormContext<IProductForm>();

  const watchMedias = watch('productMedias', []);
  const watchDeletedIds = watch('deletedIds', []);

  return (
    <Stack spacing={2} px={[0, 0, 2]} mt={2}>
      <Stack>
        <Typography
          color='text.secondary'
          variant='body2'
          fontWeight={500}
          gutterBottom
        >
          Product Name{' '}
          <Typography component='span' color='error.main'>
            *
          </Typography>
        </Typography>
        <Controller
          control={control}
          defaultValue={'New Product'}
          name='name'
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <CusTextField
              variant='outlined'
              size='small'
              error={Boolean(error)}
              {...field}
            />
          )}
        />
      </Stack>

      <Stack>
        <Typography
          color='text.secondary'
          variant='body2'
          fontWeight={500}
          gutterBottom
        >
          Thumbnail{' '}
          <Typography component='span' color='error.main'>
            *
          </Typography>
        </Typography>
        <Controller
          control={control}
          defaultValue={''}
          name='thumbnailFile'
          rules={{ required: true }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <InputFile
              onChange={(file) => {
                file[0] && onChange(file[0]);
              }}
              multiple={false}
            >
              {value ? (
                <>
                  <Avatar
                    variant='rounded'
                    src={typeof value === 'string' ? value : value?.preview}
                    sx={{
                      width: 140,
                      height: 140,
                      ...(error && {
                        border: (theme) =>
                          `1px solid ${theme.palette.error.main}`,
                      }),
                    }}
                  />
                  <Button
                    component='span'
                    sx={{ minHeight: 'auto', p: 0, mt: 1 }}
                  >
                    Change
                  </Button>
                </>
              ) : (
                <Button
                  component='span'
                  sx={{
                    width: 140,
                    height: 140,
                    flexDirection: 'column',
                    fontWeight: 'regular',
                    bgcolor: 'divider',
                    ...(error && {
                      border: (theme) =>
                        `1px solid ${theme.palette.error.main}`,
                    }),
                  }}
                >
                  <MdAdd size={24} />
                  Add Thumbnail
                </Button>
              )}
            </InputFile>
          )}
        />
      </Stack>

      <Stack>
        <Typography
          color='text.secondary'
          variant='body2'
          fontWeight={500}
          gutterBottom
        >
          Description
        </Typography>
        <Controller
          control={control}
          defaultValue={''}
          name='desc'
          render={({ field }) => (
            <TextEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </Stack>

      <Stack>
        <Typography
          color='text.secondary'
          variant='body2'
          fontWeight={500}
          gutterBottom
        >
          Price{' '}
          <Typography component='span' color='error.main'>
            *
          </Typography>
        </Typography>
        <Controller
          control={control}
          defaultValue={''}
          name='price'
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <CusTextField
              variant='outlined'
              size='small'
              type='number'
              placeholder='0.00'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
              error={Boolean(error)}
              {...field}
            />
          )}
        />
      </Stack>

      <Stack>
        <Controller
          control={control}
          defaultValue={false}
          name='discount'
          render={({ field }) => (
            <>
              <FormControlLabel
                control={<Checkbox size='small' sx={{ py: 0.5 }} />}
                label='Discount'
                checked={field.value}
                slotProps={{
                  typography: {
                    variant: 'body2',
                    fontWeight: 500,
                    color: 'text.secondary',
                  },
                }}
                {...field}
              />

              {field.value && (
                <>
                  <Typography
                    color='text.secondary'
                    variant='body2'
                    fontWeight={500}
                    gutterBottom
                  >
                    Discount Price{' '}
                    <Typography component='span' color='error.main'>
                      *
                    </Typography>
                  </Typography>
                  <Controller
                    control={control}
                    defaultValue={''}
                    name='afterDiscount'
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <CusTextField
                        variant='outlined'
                        size='small'
                        type='number'
                        placeholder='0.00'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>$</InputAdornment>
                          ),
                        }}
                        error={Boolean(error)}
                        {...field}
                      />
                    )}
                  />
                </>
              )}
            </>
          )}
        />
      </Stack>

      <Stack>
        <Typography
          color='text.secondary'
          variant='body2'
          fontWeight={500}
          gutterBottom
        >
          Category{' '}
          <Typography component='span' color='error.main'>
            *
          </Typography>
        </Typography>
        <Controller
          control={control}
          defaultValue={''}
          name='categoryId'
          rules={{ required: true }}
          render={({
            field: { value, onChange, ...rest },
            fieldState: { error },
          }) => (
            <Autocomplete
              {...rest}
              value={allCategory?.find((cate) => cate.id === +value) || null}
              onChange={(e, v) => onChange(v?.id)}
              options={allCategory || []}
              getOptionLabel={(cate) => cate.name}
              componentsProps={{
                paper: {
                  sx: { bgcolor: 'background.default', borderRadius: 1 },
                },
              }}
              renderInput={(params) => (
                <CusTextField
                  {...params}
                  variant='outlined'
                  size='small'
                  error={Boolean(error)}
                />
              )}
            />
          )}
        />
      </Stack>

      <Stack>
        <Typography
          color='text.secondary'
          variant='body2'
          fontWeight={500}
          gutterBottom
        >
          Inventory Status{' '}
          <Typography component='span' color='error.main'>
            *
          </Typography>
        </Typography>
        <Controller
          control={control}
          defaultValue={''}
          name='inventoryStatus'
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <CusTextField
              variant='outlined'
              size='small'
              error={Boolean(error)}
              select
              {...field}
            >
              {[
                InventoryStatusEnum.inStock,
                InventoryStatusEnum.outOfStock,
                InventoryStatusEnum.preOrder,
              ].map((iStatus) => (
                <MenuItem key={iStatus} value={iStatus}>
                  {InventoryStatusLabel[iStatus]}
                </MenuItem>
              ))}
            </CusTextField>
          )}
        />
      </Stack>

      <Controller
        control={control}
        defaultValue={[]}
        name='photoFiles'
        rules={{
          validate: (val) =>
            (val || [])?.length +
              watchMedias.filter(
                (m) => !watchDeletedIds?.includes(m.id.toString())
              ).length >
            0,
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Stack>
            <Typography
              color={!error ? 'text.secondary' : 'error.main'}
              variant='body2'
              fontWeight={500}
              gutterBottom
            >
              Gallery{' '}
              <Typography component='span' color='error.main'>
                *
              </Typography>
            </Typography>
            <Stack
              direction='row'
              columnGap={1.5}
              rowGap={1.5}
              flexWrap={'wrap'}
            >
              {watchMedias?.map(
                (media) =>
                  !watchDeletedIds?.includes(media.id.toString()) && (
                    <Box key={media.id} position='relative'>
                      <Avatar
                        variant='rounded'
                        src={media?.url}
                        sx={{
                          width: 100,
                          height: 100,
                          border: (theme) =>
                            `1px solid ${theme.palette.divider}`,
                        }}
                      />
                      <IconButton
                        component='div'
                        size='small'
                        color='inherit'
                        onClick={() => {
                          setValue(
                            'deletedIds',
                            (getValues('deletedIds') || [])?.concat(
                              media.id.toString()
                            )
                          );
                        }}
                        sx={{
                          p: 0.25,
                          position: 'absolute',
                          right: -8,
                          top: -8,
                          bgcolor: 'grey.200',
                          '&:hover': {
                            bgcolor: 'grey.300',
                          },
                        }}
                      >
                        <MdClose />
                      </IconButton>
                    </Box>
                  )
              )}
              {value?.map((v, index) => (
                <Box key={index} position='relative'>
                  <Avatar
                    variant='rounded'
                    src={v?.preview}
                    sx={{
                      width: 100,
                      height: 100,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  />
                  <IconButton
                    component='div'
                    size='small'
                    color='inherit'
                    onClick={() => {
                      onChange(value.filter((_, i) => i !== index));
                    }}
                    sx={{
                      p: 0.25,
                      position: 'absolute',
                      right: -8,
                      top: -8,
                      bgcolor: 'grey.200',
                      '&:hover': {
                        bgcolor: 'grey.300',
                      },
                    }}
                  >
                    <MdClose />
                  </IconButton>
                </Box>
              ))}
            </Stack>
            <InputFile
              onChange={(file) => {
                console.log('onChange:', file);
                if (value) {
                  onChange(value?.concat(file));
                }
              }}
              multiple={true}
            >
              <Button
                component='span'
                sx={{ minHeight: 'auto', minWidth: 'auto', p: 0, mt: 1 }}
              >
                Add
              </Button>
            </InputFile>
          </Stack>
        )}
      />

      <Stack>
        <Typography
          color='text.secondary'
          variant='body2'
          fontWeight={500}
          gutterBottom
        >
          Video
        </Typography>
        <Controller
          control={control}
          defaultValue={''}
          name='videoFile'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              {value && (
                <video
                  src={typeof value === 'string' ? value : value?.preview}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: theme.shape.borderRadius,
                    overflow: 'hidden',
                    background: 'black',
                    display: 'block',
                  }}
                />
              )}
              <InputFile
                accept='video/*'
                onChange={(file) => {
                  console.log('onChange:', file);
                  file[0] && onChange(file[0]);
                }}
                multiple={false}
              >
                {value ? (
                  <Button
                    component='span'
                    sx={{ minHeight: 'auto', p: 0, mt: 1 }}
                  >
                    Change
                  </Button>
                ) : (
                  <Button
                    component='span'
                    sx={{
                      width: 100,
                      height: 100,
                      flexDirection: 'column',
                      fontWeight: 'regular',
                      bgcolor: 'divider',
                      ...(error && {
                        border: (theme) =>
                          `1px solid ${theme.palette.error.main}`,
                      }),
                    }}
                  >
                    <MdAdd size={24} />
                    Add Video
                  </Button>
                )}
              </InputFile>
            </>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default memo(ProductForm);
