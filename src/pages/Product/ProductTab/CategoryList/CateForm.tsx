import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { memo } from 'react';

interface IAddCategoryForm {
  name: string;
}

const CategoryForm = ({
  params,
  onAddSubmit,
  onEditSubmit,
  onCancel,
}: {
  params?: IProduct.Category;
  onAddSubmit: (data: { name: string }) => void;
  onEditSubmit: (data: { id: number; name: string }) => void;
  onCancel: () => void;
}) => {
  const { control, handleSubmit } = useForm<IAddCategoryForm>({
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<IAddCategoryForm> = (data) => {
    if (params) {
      onEditSubmit({ id: params.id, name: data.name });
    } else {
      onAddSubmit(data);
    }
  };

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
          {!params ? 'Add' : 'Edit'} Category
        </Typography>
        <Typography gutterBottom>
          Category Name{' '}
          <Typography component='span' color='error.main'>
            *
          </Typography>
        </Typography>
        <Controller
          control={control}
          defaultValue={params?.name || ''}
          name='name'
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField size='small' error={Boolean(error)} {...field} />
          )}
        />

        <Stack direction='row' justifyContent='center' spacing={2} mt={2}>
          <Button onClick={onCancel} sx={{ minWidth: 100 }}>
            Cancel
          </Button>
          <Button type='submit' variant='contained' sx={{ minWidth: 100 }}>
            {!params ? 'Add' : 'Save'}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default memo(CategoryForm);
