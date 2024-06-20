import { memo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRequest } from 'ahooks';

import { Button, Divider, Stack } from '@mui/material';

import { PRODUCT_API } from 'api/Product';

import Variants from './Variants';
import Options, { IOptionsHandler } from './Options';

export interface ISelectetOpts {
  [key: string]: string;
}

export interface IOptionFormInputs {
  options: { id: number; price: number; afterDiscount: number; sku: string }[];
  selectedId: number[];
  removedId?: number[];
}

const VariantsView = ({
  proId,
  shopId,
  basePrice,

  edit,
  onEditClick,
  onCancelClick,
}: {
  proId: number;
  shopId: number;
  basePrice: number;

  edit: boolean;
  onEditClick: () => void;
  onCancelClick: () => void;
}) => {
  const optionRef = useRef<IOptionsHandler>(null);
  const [selectedOpts, setSelectedOpts] = useState<ISelectetOpts>({});

  const methods = useForm<IOptionFormInputs>({ shouldUnregister: true });

  const {
    loading: loadingUpdateVarOptionsPrice,
    run: runUpdateVarOptionsPrice,
  } = useRequest(PRODUCT_API.updateVarOptionsPrice, {
    manual: true,
    onError: (err) => console.log(err),
    onSuccess: () => {
      optionRef.current?.refresh();
      onCancelClick();
    },
  });

  const { loading: loadingDeleteVarOptions, run: runDeleteVarOptions } =
    useRequest(PRODUCT_API.deleteVariantOptions, {
      manual: true,
      onError: (err) => console.log(err),
      onSuccess: () => {
        const options = methods.getValues('options');
        runUpdateVarOptionsPrice(shopId, proId, options);
      },
    });

  const onSubmit: SubmitHandler<IOptionFormInputs> = (data) => {
    console.log('onSubmit:', data);
    if (data.removedId && data.removedId.length > 0) {
      runDeleteVarOptions(shopId, proId, data.removedId);
    } else {
      runUpdateVarOptionsPrice(shopId, proId, data.options);
    }
  };

  const isLoading = loadingUpdateVarOptionsPrice || loadingDeleteVarOptions;

  return (
    <>
      <Stack
        spacing={2}
        px={[0, 0, 2]}
        mt={2}
        sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}
      >
        <Variants
          {...{
            proId,
            shopId,
            selectedOpts,
            setSelectedOpts,
            basePrice,
            onUpdateSuccess: () => {
              optionRef.current?.refresh();
            },
          }}
        />
        <Divider />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Options
              ref={optionRef}
              {...{ edit, proId, shopId, selectedOpts }}
            />
          </form>
        </FormProvider>
      </Stack>
      <Stack direction='row' justifyContent='center' spacing={2} my={2}>
        {!edit ? (
          <Button
            variant='contained'
            color='inherit'
            sx={{ minWidth: 100 }}
            onClick={onEditClick}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                methods.reset();
                onCancelClick();
              }}
              disabled={isLoading}
              sx={{ minWidth: 100 }}
            >
              Cancel
            </Button>
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              variant='contained'
              disabled={isLoading}
              sx={{ minWidth: 100 }}
            >
              Save
            </Button>
          </>
        )}
      </Stack>
    </>
  );
};

export default memo(VariantsView);
