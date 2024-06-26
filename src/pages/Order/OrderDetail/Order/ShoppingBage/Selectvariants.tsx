import { useRequest } from 'ahooks';
import React, { useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import ORDER from 'api/Order';

import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';

import theme from 'themes';

interface Ivariant {
  open: boolean;
  onClose: () => void;
  id: any;
  // productDetail: IProduct.IProOption[][] | undefined;
  // productId: number;
  productId: number | '' | undefined;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  setId: (id: number) => void;
  refDetail: () => void;
  productDetail: any;
}

function Selectvariants(props: Ivariant) {
  const errRef = useRef<IErrDialogRef>(null);
  const [getProductId, setProductId] = useState<any>();
  const [selectId, setSelectId] = useState<number[]>([]);

  // useEffect(() => {
  //   props.productDetail?.map((el) => setProductId(el));
  // }, [props.productDetail]);

  // useEffect(() => {
  //   if (getProductId !== undefined) {
  //     setSelectId(getProductId.options.map((el) => el.id));
  //   } else {
  //     setSelectId([]);
  //   }
  // }, [getProductId]);
  // const { selectedShop } = useContext(AuthContext);
  const { run: runUpdateVaraint, loading: loadUpdateVaraint } = useRequest(
    () => ORDER.runUpdateVaraint(`${1}`, props.productId, selectId),
    {
      manual: true,
      onSuccess: () => {
        props.close(false);
        props.setId(-1);
        props.refDetail();
      },
      onError: (e) => {
        errRef.current?.open(e);
      },
    },
  );
  const { data: getProductDetail, loading: loadingGetVaraints } = useRequest(
    () => ORDER.getProductDetail(`${1}`, props.id),
    {
      ready: getProductId ? true : false,
      refreshDeps: [getProductId],
      onError: (e) => {
        errRef.current?.open(e);
      },
    },
  );

  const onSelect = (product: IProduct.IProOption) => {
    let allSelected = [...selectId];
    const findIndex = allSelected.indexOf(product.id);
    if (findIndex === -1) {
      if (!allSelected?.[product.level]) {
        allSelected.push(product.id);
      } else {
        allSelected[product.level] = product.id;
        allSelected.splice(product.level + 1, allSelected.length);
      }
      setSelectId(allSelected);
    } else {
      allSelected.splice(findIndex, 1);
      setSelectId(allSelected);
    }
  };
  return (
    <>
      <ErrDialog ref={errRef} />

      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography fontWeight={'bold'}>Select Varaints</Typography>
            <Button
              sx={{
                display: 'flex',
                minWidth: 0,
                alignItems: 'center',
                justifyContent: 'flex-end',
                p: 0,
              }}
              onClick={props.onClose}
            >
              <GrClose />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {loadingGetVaraints ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: {
                  md: 'calc(100vh - 550px)',
                  xs: 'calc(100vh - 350px)',
                },
              }}
            >
              <CircularProgress size={25} />
            </Box>
          ) : getProductDetail &&
            getProductDetail?.productOptions.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: {
                  md: 'calc(100vh - 420px)',
                  xs: 'calc(100vh - 240px)',
                },
              }}
            >
              <Typography>Product has no variants.</Typography>
            </Box>
          ) : (
            <>
              {getProductDetail?.productOptions.map((el, index) => {
                const renderHeader =
                  !getProductDetail?.productOptions?.[index - 1] ||
                  el?.groupTitle !==
                    getProductDetail?.productOptions?.[index - 1]?.groupTitle;

                const isParentSelected =
                  el?.level !== 0 &&
                  el.productOptionId !== selectId?.[el?.level - 1];
                return (
                  <React.Fragment key={index}>
                    {renderHeader && <Typography>{el.groupTitle}:</Typography>}
                    {!isParentSelected && (
                      <Button
                        sx={{
                          ml: 1,
                          mb: 2,
                          mt: 1,
                          background: selectId.includes(el.id)
                            ? theme.palette.grey['800']
                            : theme.palette.grey['300'],
                          color: selectId.includes(el.id)
                            ? theme.palette.common.white
                            : theme.palette.common.black,
                        }}
                        disabled={isParentSelected}
                        onClick={() => {
                          onSelect(el);
                        }}
                      >
                        {el.title}
                      </Button>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            disabled={
              getProductDetail && getProductDetail?.productOptions.length === 0
                ? true
                : false
            }
            sx={{ mr: 2 }}
            onClick={() => {
              runUpdateVaraint();
            }}
          >
            {loadUpdateVaraint ? (
              <CircularProgress size={25} color={'inherit'} />
            ) : (
              'Save'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Selectvariants;
