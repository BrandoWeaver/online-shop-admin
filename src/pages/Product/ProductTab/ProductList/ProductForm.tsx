import { useRequest } from 'ahooks';
import React, { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { PRODUCT_API } from 'api/Product';

import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import { LoadingSpiner } from 'components/Loading';

// Define interface for form data
interface ProductFormData {
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: File | null;
  status: string;
  cate_id: string;
}
interface createProps {
  setSelectPro: React.Dispatch<React.SetStateAction<string>>;
  refreshProduct: () => void;
  productToUpdate: IProduct.IProductNew | undefined;
  proId: string;
}

const CreateProductForm = (props: createProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const errAlert = useRef<IErrDialogRef>(null);
  const { run: runAddNewProduct, loading: loadingAddNewProduct } = useRequest(
    PRODUCT_API.addProduct,
    {
      manual: true,
      onSuccess: (data) => {
        props.setSelectPro('');
        props.refreshProduct();
      },
      onError: (err) => errAlert.current?.open(err),
    },
  );
  const { run: runEditProduct, loading: loadingEditProduct } = useRequest(
    PRODUCT_API.editProduct,
    {
      manual: true,
      onSuccess: (data) => {
        props.setSelectPro('');
        props.refreshProduct();
      },
      onError: (err) => errAlert.current?.open(err),
    },
  );

  const {
    data: listCategories,
    loading: loadingListCate,
    error: errListCate,
  } = useRequest(PRODUCT_API.listCategory);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    // Handle form submission with typed data
    console.log('editdata', data);
    if (props.productToUpdate) {
      runEditProduct(props.proId, data);
    } else {
      runAddNewProduct(data);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth='sm'>
      <ErrDialog ref={errAlert} />
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
          mb: 2,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems='center' spacing={2}>
          <Grid item>
            <Avatar
              alt='Product Image'
              src={imagePreview || props.productToUpdate?.image || ''}
              sx={{ width: 100, height: 100 }}
              variant='rounded'
            />
          </Grid>
          <Grid item>
            <Button variant='contained' component='label'>
              Upload Image
              <Controller
                name='image'
                control={control}
                defaultValue={null}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <input
                    type='file'
                    accept='image/*'
                    hidden
                    onChange={(e) => {
                      onChange(e.target.files?.[0]);
                      handleImageChange(e);
                      console.log('e', e.target.value);
                    }}
                  />
                )}
              />
            </Button>
          </Grid>
        </Grid>
        <Controller
          name='name'
          control={control}
          defaultValue={props.productToUpdate?.name || ''}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Name'
              variant='outlined'
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              required
            />
          )}
        />

        <Controller
          name='description'
          control={control}
          defaultValue={props.productToUpdate?.description || ''}
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Description'
              variant='outlined'
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
              required
            />
          )}
        />

        <Controller
          name='price'
          control={control}
          defaultValue={props.productToUpdate?.price.toString() || ''}
          rules={{
            required: 'Price is required',
            pattern: {
              value: /^[0-9.]+$/,
              message: 'Please enter a valid price',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Price'
              variant='outlined'
              type='number'
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ''}
              required
            />
          )}
        />

        <Controller
          name='quantity'
          control={control}
          defaultValue={props.productToUpdate?.quantity.toString() || ''}
          rules={{
            required: 'Quantity is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Please enter a valid quantity',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label='Quantity'
              variant='outlined'
              type='number'
              error={!!errors.quantity}
              helperText={errors.quantity ? errors.quantity.message : ''}
              required
            />
          )}
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Controller
            name='status'
            control={control}
            defaultValue={props.productToUpdate?.status || ''}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <Select
                {...field}
                label='Status'
                error={!!errors.status}
                fullWidth
              >
                <MenuItem value='active'>active</MenuItem>
                <MenuItem value='inactive'>inactive</MenuItem>
              </Select>
            )}
          />
          {errors.status && (
            <Typography color='error'>{errors.status.message}</Typography>
          )}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Controller
            name='cate_id'
            control={control}
            defaultValue={props.productToUpdate?.cate_id || ''}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <Select
                {...field}
                label='Category'
                error={!!errors.cate_id}
                fullWidth
              >
                {listCategories?.categories.map((value, i) => {
                  return (
                    <MenuItem value={value.cate_id}>{value.name}</MenuItem>
                  );
                })}
              </Select>
            )}
          />
          {errors.cate_id && (
            <Typography color='error'>{errors.cate_id.message}</Typography>
          )}
        </FormControl>

        <Button type='submit' variant='contained' color='primary'>
          {loadingAddNewProduct ? <LoadingSpiner size={20} /> : 'Submit'}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateProductForm;
