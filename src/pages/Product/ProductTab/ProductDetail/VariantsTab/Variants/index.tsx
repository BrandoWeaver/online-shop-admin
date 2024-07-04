import ErrorResponse from 'ErrorRespone';
import { useRequest, useUpdateEffect } from 'ahooks';
import { memo, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { MdCheck, MdClose, MdEdit } from 'react-icons/md';

import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';

import { PRODUCT_API } from 'api/Product';

import { LoadingSpiner } from 'components/Loading';

import { ISelectetOpts } from '../';
import RenderRow from './RenderRow';

export interface IFormInputs {
  variants: { groupTitle: string; options: string[]; level: number }[];
  newVariant?: { groupTitle: string; options: string[]; level: number };
  removedVar: number[];
}

const Variants = ({
  proId,
  shopId,
  selectedOpts,
  setSelectedOpts,
  basePrice,
  onUpdateSuccess,
}: {
  proId: number;
  shopId: number;
  selectedOpts: ISelectetOpts;
  setSelectedOpts: React.Dispatch<React.SetStateAction<ISelectetOpts>>;
  basePrice: number;
  onUpdateSuccess: () => void;
}) => {
  const [edit, setEdit] = useState(false);
  const methods = useForm<IFormInputs>({
    shouldUnregister: false,
  });

  const { handleSubmit, setValue, watch, reset } = methods;

  const watchRemovedVars = watch('removedVar', []);
  const watchNewVar = watch('newVariant');

  const {
    data: listProductVariants,
    loading: loadingListProductVariants,
    error: errListProductVariants,
    refresh: refreshListProVariants,
  } = useRequest(() => PRODUCT_API.listProductVariants(shopId, proId), {
    cacheKey: `get-${shopId}-product-${proId}-variants`,
    refreshDeps: [proId, shopId],
  });
  // console.log('listProductVariants:', listProductVariants);

  const { loading: loadingUpdateProVariants, run: runUpdateProVariants } =
    useRequest(PRODUCT_API.updateProVariant, {
      manual: true,
      onError: (err) => console.log(err),
    });

  const { loading: loadingAddProVariant, run: runAddProVariant } = useRequest(
    PRODUCT_API.addNewVariant,
    {
      manual: true,
      onError: (err) => console.log(err),
    },
  );

  const { loading: loadingAddProVariantOpt, run: runAddProVariantOpt } =
    useRequest(PRODUCT_API.addNewVarOption, {
      manual: true,
      onError: (err) => console.log(err),
    });

  const { loading: loadingDeleteProVariant, run: runDeleteProVariant } =
    useRequest(PRODUCT_API.deleteProVariant, {
      manual: true,
      onError: (err) => console.log(err),
    });

  const { loading: loadingDeleteProVariantOpt, run: runDeleteProVariantOpt } =
    useRequest(PRODUCT_API.deleteProVariantOpt, {
      manual: true,
      onError: (err) => console.log(err),
    });

  const isUpdatingVariant =
    loadingUpdateProVariants ||
    loadingAddProVariant ||
    loadingAddProVariantOpt ||
    loadingDeleteProVariant ||
    loadingDeleteProVariantOpt;

  useUpdateEffect(() => {
    if (!isUpdatingVariant) {
      reset();
      setEdit(false);
      refreshListProVariants();
      onUpdateSuccess();
    }
  }, [isUpdatingVariant]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    // console.log('onSubmit:', data);

    if (listProductVariants) {
      for (let index = 0; index < listProductVariants.length; index++) {
        const variant = listProductVariants[index];
        const stillExist = data.variants.find(
          (v) =>
            v.level === variant.level && !data?.removedVar?.includes(v.level),
        );
        if (stillExist) {
          if (variant.group_title !== stillExist.groupTitle) {
            // variant must have been updated
            runUpdateProVariants(shopId, proId, {
              level: variant.level,
              groupTitle: stillExist.groupTitle,
            });
          }

          let deleteOptions: string[] = [];
          variant.children.map((ch) => {
            if (stillExist.options.includes(ch)) {
              deleteOptions = deleteOptions.concat(ch);
            }
            return ch;
          });
          if (deleteOptions.length > 0) {
            runDeleteProVariantOpt(shopId, proId, {
              level: variant.level,
              titles: deleteOptions,
            });
          }

          stillExist.options?.map((opt) => {
            if (!variant.children.includes(opt)) {
              runAddProVariantOpt(shopId, proId, {
                level: stillExist.level,
                price: basePrice,
                title: opt,
              });
            }
            return opt;
          });
        } else {
          // variant must have been removed
          runDeleteProVariant(shopId, proId, { level: variant.level });
        }
      }
    }
    if (data.newVariant) {
      runAddProVariant(shopId, proId, {
        groupTitle: data.newVariant.groupTitle,
        price: basePrice,
        options: data.newVariant.options,
      });
    }
  };

  if (loadingListProductVariants || isUpdatingVariant) {
    return (
      <Stack
        justifyContent='center'
        alignItems='center'
        height={[
          'calc(100vh - 540px)',
          'calc(100vh - 540px)',
          'calc(100vh - 750px)',
        ]}
      >
        <LoadingSpiner />
      </Stack>
    );
  }

  if (errListProductVariants) {
    return (
      <ErrorResponse
        typographyProps={{ textAlign: 'center' }}
        message={
          errListProductVariants.error_description ||
          errListProductVariants.error ||
          errListProductVariants.message
        }
        buttonAction={refreshListProVariants}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container alignItems='center' rowGap={1}>
          {listProductVariants?.length === 0 && !edit ? (
            <Grid item xs={12}>
              <Typography variant='body2' color='text.secondary'>
                You can add variants if this product has multiple options like
                different colors or sizes.
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={3}>
                <Typography color='text.secondary'>Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography color='text.secondary'>Options</Typography>
              </Grid>
              <Grid item xs={1}>
                <Stack direction='row' spacing={1} justifyContent='flex-end'>
                  {edit && (
                    <IconButton
                      color='primary'
                      size='small'
                      onClick={handleSubmit(onSubmit)}
                    >
                      <MdCheck />
                    </IconButton>
                  )}
                  <IconButton
                    color='primary'
                    size='small'
                    onClick={() => {
                      setEdit((prev) => !prev);
                      reset();
                    }}
                  >
                    {!edit ? <MdEdit /> : <MdClose />}
                  </IconButton>
                </Stack>
              </Grid>
              {listProductVariants?.map(
                (pv, i) =>
                  !watchRemovedVars.includes(pv.level) && (
                    <RenderRow
                      key={pv.level}
                      {...{
                        baseName: `variants.${i}`,
                        edit,
                        level: pv.level,
                        varTitle: pv.group_title,
                        varOptions: pv.children,
                        selected: selectedOpts[pv.group_title],
                        onOptionClick(data) {
                          setSelectedOpts((prev) =>
                            prev[pv.group_title] === data
                              ? { ...prev, [pv.group_title]: '' }
                              : {
                                  ...prev,
                                  [pv.group_title]: data,
                                },
                          );
                        },
                        onDeleteClick: () => {
                          setValue(
                            'removedVar',
                            watchRemovedVars.concat(pv.level),
                          );
                        },
                      }}
                    />
                  ),
              )}
              {watchNewVar && (
                <RenderRow
                  {...{
                    baseName: 'newVariant',
                    edit: true,
                    level: listProductVariants?.length || 0,
                    varTitle: '',
                    varOptions: [],
                    selected: '',
                    onOptionClick: (data) => {},
                    onDeleteClick: () => {
                      setValue('newVariant', undefined);
                    },
                  }}
                />
              )}
            </>
          )}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: !edit ? 'flex-start' : 'flex-end',
            }}
          >
            {!watchNewVar && (
              <Button
                sx={{ ml: -1, fontWeight: 'regular' }}
                onClick={() => {
                  setValue('newVariant', {
                    groupTitle: '',
                    level: listProductVariants?.length || 0,
                    options: [],
                  });
                  // setNewVar(true);
                  setEdit(true);
                }}
              >
                Add Variant
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default memo(Variants);
