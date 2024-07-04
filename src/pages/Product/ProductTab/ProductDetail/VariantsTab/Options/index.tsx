import ErrorResponse from 'ErrorRespone';
import { useRequest } from 'ahooks';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Grid, Stack, Typography } from '@mui/material';

import { PRODUCT_API } from 'api/Product';

import { LoadingSpiner } from 'components/Loading';

import { IOptionFormInputs, ISelectetOpts } from '../index';
import RenderRow from './RenderRow';

export interface IOptionsHandler {
  refresh: () => void;
}

interface IOptions {
  edit: boolean;
  proId: number;
  shopId: number;
  selectedOpts: ISelectetOpts;
}

const Options = forwardRef<IOptionsHandler, IOptions>(
  ({ edit, proId, shopId, selectedOpts }, ref) => {
    const { watch, setValue } = useFormContext<IOptionFormInputs>();

    const watchSelectedId = watch('selectedId', []);
    const watchRemovedId = watch('removedId', []);

    const {
      data: listProductOpts,
      loading: loadingListProductOpts,
      error: errListProductOpts,
      refresh: refreshListProOpts,
    } = useRequest(
      () =>
        PRODUCT_API.listProductOptions(
          shopId,
          proId,
          Object.values(selectedOpts),
        ),
      {
        cacheKey: `get-${shopId}-product-${proId}-${selectedOpts}-options`,
        refreshDeps: [proId, shopId, selectedOpts],
      },
    );

    useImperativeHandle(
      ref,
      () => ({
        refresh: () => {
          refreshListProOpts();
        },
      }),
      [refreshListProOpts],
    );

    // console.log('listProductOpts:', listProductOpts);

    if (loadingListProductOpts) {
      return (
        <Stack
          justifyContent='center'
          alignItems='center'
          height={[
            'calc(100vh - 380px)',
            'calc(100vh - 380px)',
            'calc(100vh - 560px)',
          ]}
        >
          <LoadingSpiner />
        </Stack>
      );
    }

    if (errListProductOpts) {
      return (
        <ErrorResponse
          typographyProps={{ textAlign: 'center' }}
          message={
            errListProductOpts.error_description ||
            errListProductOpts.error ||
            errListProductOpts.message
          }
          buttonAction={refreshListProOpts}
        />
      );
    }

    if (listProductOpts?.length === 0) {
      return null;
    }

    return (
      <Grid
        container
        alignItems='center'
        rowSpacing={!edit ? 3 : 1}
        columnSpacing={1}
      >
        {edit && <Grid item xs={1} />}
        <Grid item xs={!edit ? 4 : 3}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>
            Option({listProductOpts?.length || 0})
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>
            Price
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>
            Discounted Price
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2' color='text.primary' fontWeight='bold'>
            SKU
          </Typography>
        </Grid>
        <Grid item xs={1}>
          {watchSelectedId.length > 0 && (
            <Button
              size='small'
              color='error'
              sx={{ p: 0 }}
              onClick={() => setValue('removedId', watchSelectedId)}
            >
              Delete({watchSelectedId.length})
            </Button>
          )}
        </Grid>
        {listProductOpts?.map(
          (opt, i) =>
            !(watchRemovedId && watchRemovedId.includes(opt.id)) && (
              <RenderRow
                key={opt.id}
                {...{
                  edit,
                  index: i,
                  id: opt.id,
                  title: opt.title,
                  price: opt.price,
                  afterDiscount: opt.afterDiscount,
                  sku: opt.sku,
                }}
              />
            ),
        )}
      </Grid>
    );
  },
);

export default memo(Options);
