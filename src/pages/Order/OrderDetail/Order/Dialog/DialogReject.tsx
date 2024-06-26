// import { useRequest } from 'ahooks';
// import React, { useState } from 'react';
// import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
// import { Button, Dialog, DialogActions } from '@mui/material';
// import { AuthContext } from 'contexts/AuthContext';
// import ORDER from 'api/Order';
// import ErrorDialog from 'components/Dialog/ErrorDialog';
// import RejectOrder, { Iform } from './RejectOrder';
// interface Icancel {
//   rejectOrder: boolean;
//   setRejectOrder: React.Dispatch<React.SetStateAction<boolean>>;
//   id: number | undefined;
//   refreshOrderList: () => void;
//   setOrder: React.Dispatch<React.SetStateAction<string>>;
//   setId: React.Dispatch<React.SetStateAction<number>>;
// }
// function DialogReject(props: Icancel) {
//   const { selectedShop } = React.useContext(AuthContext);
//   const method = useForm<Iform>();
//   const [errOpen, setErr] = useState(false);
//   const { run: runReject, error: errReject } = useRequest(
//     (data: string) =>
//       ORDER.runRejectOrder(`${1}`, props.id, 'on_hold', [data]),
//     {
//       manual: true,
//       onSuccess: () => {
//         props.setRejectOrder(false);
//         props.refreshOrderList();
//         props.setOrder('order');
//         props.setId(-1);
//       },
//       onError: () => {
//         setErr(true);
//       },
//     },
//   );
//   const onSubmit: SubmitHandler<Iform> = (data) => {
//     runReject(data.Rejectreason);
//   };
//   return (
//     <>
//       <ErrorDialog
//         open={errOpen}
//         onCloseDialog={() => setErr(false)}
//         errorTitle='Error Ocured'
//         errorMessage={
//           errReject?.message || errReject?.error || errReject?.error_description
//         }
//       />
//       <Dialog open={props.rejectOrder} fullWidth={true} maxWidth={'xs'}>
//         <FormProvider {...method}>
//           <RejectOrder />
//         </FormProvider>
//         <DialogActions>
//           <Button
//             onClick={() => props.setRejectOrder(false)}
//             sx={{
//               fontSize: {
//                 xs: 'body2.fontSize',
//                 md: 'body1.fontSize',
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             autoFocus
//             onClick={() => {
//               method.handleSubmit(onSubmit)();
//             }}
//             sx={{
//               fontSize: {
//                 xs: 'body2.fontSize',
//                 md: 'body1.fontSize',
//               },
//             }}
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }
// export default DialogReject;
import React from 'react';

function DialogReject() {
  return <div>DialogReject</div>;
}

export default DialogReject;
