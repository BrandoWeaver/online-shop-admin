import { memo, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Avatar, Button, Stack, TextField, Typography } from '@mui/material';

import { LoadingSpiner } from 'components/Loading';

interface IAddCategoryForm {
  name: string;
  image: File | null;
}

const CategoryForm = ({
  onAddSubmit,
  onEditSubmit,
  onCancel,
  loading,
  cateToUpdate,
  cateId,
}: {
  cateId: string;
  onAddSubmit: (data: {
    name: string;
    image: File | null;
    des?: string;
  }) => void;
  onEditSubmit: (
    cateId: string,
    data: {
      name: string;
      image: File | null;
      des?: string;
    },
  ) => void;
  onCancel: () => void;
  loading: boolean;
  cateToUpdate: IProduct.Category | undefined;
}) => {
  const { control, handleSubmit, setValue } = useForm<IAddCategoryForm>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IAddCategoryForm> = (data) => {
    if (cateToUpdate) {
      onEditSubmit(cateId, data);
    } else {
      onAddSubmit(data);
    }
    // console.log('data', data);
  };

  console.log('para', cateToUpdate);

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

  console.log('infoorm', cateToUpdate);
  useEffect(() => {
    if (cateId === 'new') {
      setValue('image', null);
      setValue('name', '');
    }
  }, [cateId]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack py={2} px={3}>
        <Typography
          variant='h5'
          color='text.secondary'
          fontWeight='bold'
          align='center'
          mb={2}
        >
          {!cateToUpdate ? 'Add' : 'Edit'} Category
        </Typography>
        <Typography gutterBottom>
          Category Name{' '}
          <Typography component='span' color='error.main'>
            *
          </Typography>
        </Typography>
        <Controller
          control={control}
          defaultValue={cateToUpdate?.name || ''}
          name='name'
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField size='small' error={Boolean(error)} {...field} />
          )}
        />

        <Typography gutterBottom mt={2}>
          Category Image
        </Typography>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar
            src={imagePreview || (cateToUpdate ? cateToUpdate.image : '')}
            alt='Category Image'
            sx={{ width: 56, height: 56 }}
            variant='rounded'
          />
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
                    console.log('e', e.target.files?.[0]);
                  }}
                />
              )}
            />
          </Button>
        </Stack>

        <Stack direction='row' justifyContent='center' spacing={2} mt={2}>
          <Button onClick={onCancel} sx={{ minWidth: 100 }}>
            Cancel
          </Button>
          <Button type='submit' variant='contained' sx={{ minWidth: 100 }}>
            {loading ? (
              <LoadingSpiner size={20} />
            ) : cateToUpdate ? (
              'Edit'
            ) : (
              'Save'
            )}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(CategoryForm);
