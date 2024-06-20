import { Avatar, Chip, Stack, Typography, useTheme } from '@mui/material';
import { MdOutlineLocalMall } from 'react-icons/md';
import { LoadingSpiner } from 'components/Loading';
import ErrorResponse from 'ErrorRespone';
import TextEditor from 'components/TextEditor';
import { InventoryStatusLabel } from 'utils/data-util';
import { memo } from 'react';

const DetailView = ({
  data,
  loading,
  refresh,
  error,
}: {
  data?: IProduct.IProductDetail;
  loading: boolean;
  refresh: () => void;
  error?: Error;
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Stack
        justifyContent='center'
        alignItems='center'
        height={[
          'calc(100vh - 56px)',
          'calc(100vh - 56px)',
          'calc(100vh - 250px)',
        ]}
      >
        <LoadingSpiner />
      </Stack>
    );
  }

  if (error) {
    return (
      <ErrorResponse
        typographyProps={{ textAlign: 'center' }}
        message={error.error_description || error.error || error.message}
        buttonAction={refresh}
      />
    );
  }

  return (
    <Stack spacing={2} px={[0, 0, 2]} mt={2}>
      <Stack direction='row' alignItems='center' spacing={1}>
        <MdOutlineLocalMall size={18} />
        <Typography fontWeight='bold'>{data?.name}</Typography>
      </Stack>

      <Stack>
        <Typography color='text.secondary' fontWeight={500} gutterBottom>
          Thumbnail
        </Typography>
        <Avatar
          variant='rounded'
          src={data?.thumbnail}
          sx={{ width: 140, height: 140 }}
        />
      </Stack>

      <Stack>
        <Typography color='text.secondary' fontWeight={500} gutterBottom>
          Description
        </Typography>
        <TextEditor value={data?.desc} readonly />
      </Stack>

      <Stack>
        <Typography color='text.secondary' fontWeight={500} gutterBottom>
          Price
        </Typography>
        <Typography color='text.secondary'>
          ${(+(data?.price || 0)).toFixed(2)}
        </Typography>
      </Stack>

      {data?.price !== data?.afterDiscount && (
        <Stack>
          <Typography color='text.secondary' fontWeight={500} gutterBottom>
            Discounted Price
          </Typography>
          <Typography color='text.secondary'>
            ${(+(data?.afterDiscount || '0')).toFixed(2)}
          </Typography>
        </Stack>
      )}

      <Stack alignItems='flex-start'>
        <Typography color='text.secondary' fontWeight={500} gutterBottom>
          Category
        </Typography>
        <Chip label={data?.categoryName} sx={{ borderRadius: 1.5 }} />
      </Stack>

      <Stack alignItems='flex-start'>
        <Typography color='text.secondary' fontWeight={500} gutterBottom>
          Inventory Status
        </Typography>
        <Chip
          label={
            data?.inventoryStatus &&
            InventoryStatusLabel[
              data.inventoryStatus as keyof typeof InventoryStatusLabel
            ]
          }
          sx={{ borderRadius: 1.5 }}
        />
      </Stack>

      <Stack alignItems='flex-start'>
        <Typography color='text.secondary' fontWeight={500} gutterBottom>
          Gallery
        </Typography>
        <Stack direction='row' spacing={2}>
          {data?.productMedias.map((media) => (
            <Avatar
              key={media.id}
              variant='rounded'
              src={media.url}
              sx={{ width: 100, height: 100 }}
            />
          ))}
        </Stack>
      </Stack>

      <Stack alignItems='flex-start'>
        <Typography color='text.secondary' fontWeight={500} gutterBottom>
          Video
        </Typography>
        <video
          src={data?.video}
          width={100}
          height={100}
          style={{
            borderRadius: theme.shape.borderRadius,
            overflow: 'hidden',
            background: 'black',
            display: 'block',
          }}
        />
      </Stack>
    </Stack>
  );
};

export default memo(DetailView);
