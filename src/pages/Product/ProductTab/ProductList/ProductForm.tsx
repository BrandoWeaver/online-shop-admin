import React, { useState } from 'react';
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

// Define interface for form data
interface ProductFormData {
  name: string;
  description: string;
  price: string;
  quantity: string;
  image: File | null;
  status: string;
}

const CreateProductForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    // Handle form submission with typed data
    console.log(data);
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
        <Controller
          name='name'
          control={control}
          defaultValue=''
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
          defaultValue=''
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
          defaultValue=''
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
          defaultValue=''
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

        <Grid container alignItems='center' spacing={2}>
          <Grid item>
            <Avatar
              alt='Product Image'
              src={imagePreview || ''}
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
                render={({ field: { onChange } }) => (
                  <input
                    type='file'
                    hidden
                    onChange={(e) => {
                      onChange(e);
                      handleImageChange(e);
                    }}
                  />
                )}
              />
            </Button>
          </Grid>
        </Grid>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Controller
            name='status'
            control={control}
            defaultValue=''
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <Select
                {...field}
                label='Status'
                error={!!errors.status}
                fullWidth
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='available'>Available</MenuItem>
                <MenuItem value='unavailable'>Unavailable</MenuItem>
              </Select>
            )}
          />
          {errors.status && (
            <Typography color='error'>{errors.status.message}</Typography>
          )}
        </FormControl>

        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CreateProductForm;
