import * as React from 'react';

import { Button, CircularProgress, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

interface Idetail {
  logo?: any;
  telegramStatus?: string;
  location?: Location;
  name?: string;
  status?: any;
  tagline?: string;
  domain?: string;
  primaryColor?: string;
  secondaryColor?: string;
  lang?: string;
  facebookPageId?: any;
  tadaLocationId?: any;
  telegramId?: string;
  contact?: Contact;
  mapUrl?: any;
  addr?: string;
  poi?: string;
  groupShopId?: any;
  loadingTelegram: boolean;
  dataTelegram: any;
  runTelegram: (data: any) => void;
}

interface Contact {
  phone1: string;
  phone2: string;
}

interface Location {
  lat: number;
  lng: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey['300'],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 10,
    fontSize: { xs: 10, md: 12 },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables(props: Idetail) {
  function createData(label: string, data: number | string) {
    return { label, data };
  }
  const row1 = [
    createData('Shop Name', 'Online Shop'),
    createData('Contact Number(1)', `081278126`),
    createData('Contact Number(2)', `0967187830`),
  ];
  const row2 = [createData('Default Language', `English`)];

  const row4 = [
    createData('Address', `Phnum Penh`),
    createData('Latitude', `11.5231154`),
    createData('Longtitude', `105.057949`),
    createData('Google Map', `https://maps.app.goo.gl/TcZxmuDjJigi3uNw8`),
  ];
  // const row5 = [
  //   createData(
  //     'Facebook Page ID',
  //     `${props.facebookPageId === null ? 'N/A' : props.facebookPageId}`,
  //   ),
  // ];
  // const theme = useTheme();
  // console.log(theme)

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }} elevation={0}>
      <Table sx={{ minWidth: 100 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell
              colSpan={2}
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
              }}
            >
              Basic
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row1.map((row) => (
            <StyledTableRow key={row.label}>
              <StyledTableCell
                component='th'
                scope='row'
                sx={{
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                }}
              >
                {row.label}
              </StyledTableCell>
              <StyledTableCell
                align='left'
                width={'50%'}
                sx={{
                  px: 0,
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                }}
              >
                {row.data}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <StyledTableCell
              colSpan={2}
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
              }}
            >
              Shop Language
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row2.map((row) => (
            <StyledTableRow key={row.label}>
              <StyledTableCell
                component='th'
                scope='row'
                sx={{
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                }}
              >
                {row.label}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  px: 0,
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                }}
              >
                {row.data}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        {/* <TableBody>
          {row5.map((row) => (
            <StyledTableRow key={row.label}>
              <StyledTableCell
                component='th'
                scope='row'
                sx={{
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                }}
              >
                {row.label}
              </StyledTableCell>
              <StyledTableCell
                align='left'
                sx={{
                  px: 0,
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                }}
              >
                {row.data}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody> */}
        <TableHead>
          <TableRow>
            <StyledTableCell
              colSpan={2}
              sx={{
                fontWeight: 'bold',
                minWidth: '160px',
                fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
              }}
            >
              Pickup Locaation
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row4.map((row) => (
            <StyledTableRow key={row.label}>
              <StyledTableCell
                width={'50%'}
                component='th'
                scope='row'
                sx={{
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                }}
              >
                {row.label}
              </StyledTableCell>
              <StyledTableCell
                align='left'
                sx={{
                  px: 0,
                  fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                }}
              >
                {row.data}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
