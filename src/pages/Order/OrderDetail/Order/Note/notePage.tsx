// import { useRequest } from 'ahooks';
// import moment from 'moment';
// import React, { useState } from 'react';
// import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// import { MdAdd } from 'react-icons/md';
// import {
//   Avatar,
//   Box,
//   Button,
//   Divider,
//   Fade,
//   Grid,
//   OutlinedInput,
//   Typography,
// } from '@mui/material';
// import { AuthContext } from 'contexts/AuthContext';
// import ORDER from 'api/Order';
// import ErrorDialog from 'components/Dialog/ErrorDialog';
// import theme from 'themes';
// import TopCom from '../OrderID';
// interface Inote {
//   detailId: number | undefined;
//   status: string | undefined;
//   orderNote: Iorder.Note[] | undefined;
//   shopName: string | undefined;
//   logo: string | undefined;
//   date: string | undefined;
//   refDetail: () => void;
//   mark: string | undefined;
// }
// interface Iform {
//   mark: string;
// }
// function NotePage(prop: Inote) {
//   const { selectedShop } = React.useContext(AuthContext);
//   const { control, handleSubmit, reset } = useForm<Iform>();
//   const [errOpen, setErr] = useState(false);
//   const {
//     run: addNote,
//     error: errNote,
//     loading: loadingAddNote,
//   } = useRequest(
//     (noteData: string) =>
//       ORDER.runAddNote(`${1}`, prop.detailId, noteData),
//     {
//       manual: true,
//       onSuccess: () => {
//         prop.refDetail();
//         reset();
//       },
//       onError: () => {
//         setErr(true);
//       },
//     },
//   );
//   const onSubmit: SubmitHandler<Iform> = (data) => {
//     addNote(data.mark);
//   };
//   return (
//     <Box
//       sx={{
//         overflow: 'scroll',
//         height: { md: 'calc(100vh - 205px)', xs: 'calc(100vh - 50px)' },
//         overflowX: 'hidden',
//         '::-webkit-scrollbar': { display: 'none' },
//       }}
//     >
//       <Fade timeout={500} in={prop.detailId !== -1 && true}>
//         <Grid
//           container
//           sx={{
//             p: 3,
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}
//         >
//           <TopCom
//             detailId={prop.detailId}
//             status={prop.status}
//             date={prop.date}
//           />
//           <ErrorDialog
//             open={errOpen}
//             onCloseDialog={() => setErr(false)}
//             errorTitle='Error Ocured'
//             errorMessage={
//               errNote?.message || errNote?.error || errNote?.error_description
//             }
//           />
//           {prop.mark || prop.orderNote?.length !== 0 ? (
//             <Grid container>
//               <Grid item xs={12} md={12}>
//                 <Typography
//                   fontWeight={'bold'}
//                   sx={{
//                     mt: 2,
//                     fontSize: {
//                       xs: 'body2.fontSize',
//                       md: 'body1.fontSize',
//                     },
//                   }}
//                 >
//                   Note:
//                 </Typography>
//               </Grid>
//               {prop.mark !== null ? (
//                 <>
//                   <Grid
//                     item
//                     xs={12}
//                     sx={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'flex-start',
//                       mt: 2,
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: {
//                           xs: 'body2.fontSize',
//                           md: 'body1.fontSize',
//                         },
//                       }}
//                     >
//                       Customer's Note:
//                     </Typography>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     sx={{
//                       background: theme.palette.grey['200'],
//                       px: 2,
//                       py: 1,
//                       borderRadius: 2,
//                       mt: 1,
//                       mb: 1,
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: {
//                           xs: 'body2.fontSize',
//                           md: 'body1.fontSize',
//                         },
//                       }}
//                     >
//                       {prop.mark}
//                     </Typography>
//                   </Grid>
//                 </>
//               ) : null}
//               <Grid item xs={12} md={12}>
//                 <Divider sx={{ my: 2, borderBottomWidth: 3 }} />
//               </Grid>
//             </Grid>
//           ) : null}
//           {prop.orderNote?.map((el) => {
//             return (
//               <Fade key={el.id} timeout={500} in={!loadingAddNote && true}>
//                 <Grid
//                   container
//                   key={el.id}
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     mb: 1,
//                   }}
//                 >
//                   <Grid item xs={12} md={12} sx={{ mb: 1, mt: 1 }}>
//                     <Typography
//                       sx={{
//                         fontSize: {
//                           xs: 'body2.fontSize',
//                           md: 'body1.fontSize',
//                         },
//                       }}
//                     >
//                       {el.type === 'seller'
//                         ? `${prop.shopName}:`
//                         : el.type === 'operator' &&
//                           el.visibleToSeller === true &&
//                           'Dobpi - Operator:'}
//                     </Typography>
//                   </Grid>
//                   {el.type === 'seller' && (
//                     <Grid item xs={2} md={el.type === 'seller' ? 2 : 0}>
//                       <Avatar
//                         src={prop.logo}
//                         sx={{
//                           width: { xs: '45px', md: '60px' },
//                           height: { xs: '45px', md: '60px' },
//                         }}
//                       />
//                     </Grid>
//                   )}
//                   {el.visibleToSeller === true && (
//                     <Grid
//                       item
//                       xs={el.type === 'seller' ? 10 : 12}
//                       md={el.type === 'seller' ? 10 : 12}
//                     >
//                       <Box
//                         sx={{
//                           background: theme.palette.grey['200'],
//                           px: 2,
//                           py: 1,
//                           borderRadius: 2,
//                           ml: { md: 0, xs: 0 },
//                         }}
//                       >
//                         <Typography
//                           sx={{
//                             fontSize: {
//                               xs: 'body2.fontSize',
//                               md: 'body1.fontSize',
//                             },
//                           }}
//                         >
//                           {el.note}
//                         </Typography>
//                         <Typography
//                           sx={{
//                             display: 'flex',
//                             justifyContent: 'flex-end',
//                             fontSize: {
//                               xs: 'body2.fontSize',
//                               md: 'body1.fontSize',
//                             },
//                           }}
//                         >
//                           {moment(el.createdAt).format('MMM DD, hh:mm A')}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   )}
//                 </Grid>
//               </Fade>
//             );
//           })}
//           <Grid item xs={12} mt={2}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Controller
//                 name='mark'
//                 control={control}
//                 defaultValue=''
//                 render={({ field, fieldState: { error } }) => (
//                   <OutlinedInput
//                     sx={{ mb: 2 }}
//                     fullWidth={true}
//                     minRows={5}
//                     multiline
//                     placeholder='Type your note to DogNote team here'
//                     {...field}
//                   />
//                 )}
//               />
//               <Button
//                 startIcon={<MdAdd size={20} />}
//                 size='large'
//                 type='submit'
//                 fullWidth
//                 variant='contained'
//                 sx={{
//                   fontSize: {
//                     xs: 'body2.fontSize',
//                     md: 'body1.fontSize',
//                   },
//                 }}
//               >
//                 Add Remark
//               </Button>
//             </form>
//           </Grid>
//         </Grid>
//       </Fade>
//     </Box>
//   );
// }
// export default NotePage;
import React from 'react';

function NotePage() {
  return <div>notePage</div>;
}

export default NotePage;
