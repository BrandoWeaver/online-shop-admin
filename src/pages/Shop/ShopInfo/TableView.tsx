import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress, Typography } from "@mui/material";

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
    backgroundColor: theme.palette.grey["300"],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 10,
    fontSize: { xs: 10, md: 12 },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables(props: Idetail) {
  function createData(label: string, data: number | string) {
    return { label, data };
  }
  const row1 = [
    createData("Shop Name", `${props.name}`),
    createData("Domain", `${props.domain}`),
    createData("Tagline", `${props.tagline === null ? "N/A" : props.tagline}`),
    createData(
      "Shop Category",
      `${props.groupShopId === null ? "N/A" : props.groupShopId}`
    ),
    createData("Contact Number(1)", `${props.contact?.phone1}`),
    createData("Contact Number(2)", `${props.contact?.phone2}`),
  ];
  const row2 = [createData("Default Language", `${props.lang}`)];

  const row4 = [
    createData("Address", `${props.addr === null ? "N/A" : props.addr}`),
    createData("Latitude", `${props.location?.lat}`),
    createData("Longtitude", `${props.location?.lng}`),
    createData("POI Name", `${props.poi === null ? "N/A" : props.poi}`),
    createData("Google Map", `${props.mapUrl === null ? "N/A" : props.mapUrl}`),
  ];
  const row5 = [
    createData(
      "Facebook Page ID",
      `${props.facebookPageId === null ? "N/A" : props.facebookPageId}`
    ),
  ];
  // const theme = useTheme();
  // console.log(theme)

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }} elevation={0}>
      <Table sx={{ minWidth: 100 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              colSpan={2}
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
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
                component="th"
                scope="row"
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                {row.label}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                width={"50%"}
                sx={{
                  px: 0,
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
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
                fontWeight: "bold",
                fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
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
                component="th"
                scope="row"
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                {row.label}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  px: 0,
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
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
                fontWeight: "bold",
                fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
              }}
            >
              Telegram
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell
              component="th"
              scope="row"
              sx={{ fontSize: { xs: "body2.fontSize", md: "body1.fontSize" } }}
            >
              Telegram Group ID
            </StyledTableCell>
            <StyledTableCell
              align="left"
              sx={{
                px: 0,
                fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
              }}
            >
              {props.telegramId}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell
              width={"42%"}
              component="th"
              scope="row"
              sx={{
                fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
              }}
            >
              Telegram Status
            </StyledTableCell>
            <StyledTableCell
              align="left"
              sx={{
                display: "flex",
                px: 0,
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
              }}
            >
              {props.loadingTelegram ? (
                <CircularProgress size={20} color="primary" />
              ) : props.dataTelegram ? (
                "Connected"
              ) : (
                !props.dataTelegram && "Not Connected"
              )}
              <Button
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
                onClick={() => {
                  props.runTelegram(props.telegramId);
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                  }}
                >
                  Test
                </Typography>
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <StyledTableCell
              colSpan={2}
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
              }}
            >
              Facebook
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row5.map((row) => (
            <StyledTableRow key={row.label}>
              <StyledTableCell
                component="th"
                scope="row"
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                {row.label}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{
                  px: 0,
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
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
                fontWeight: "bold",
                minWidth: "160px",
                fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
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
                width={"50%"}
                component="th"
                scope="row"
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                {row.label}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{
                  px: 0,
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
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
