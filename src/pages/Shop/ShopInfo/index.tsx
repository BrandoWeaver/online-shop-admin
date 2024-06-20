import Button from "@mui/material/Button";
import {
  Avatar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { useState } from "react";
import theme from "themes";

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import CustomizedTables from "pages/Shop/ShopInfo/TableView";
import { useRequest } from "ahooks";
import { ROUTE_API } from "utils/route-util";
import HttpUtil from "utils/http-util";
import Edit from "./Edit";
import ChangeColor from "./ChangeColor";
import { BackdropLoading } from "components/Loading";
import ErrorResponse from "ErrorRespone";

interface Iform {
  SellerName: string;
  domain: string;
  tagline: string;
  shopCate: string;
  con1: string;
  con2: string;
  telgroup: string;
  faceId: string;
  addr: string;
  lati: number;
  long: number;
  poi: string;
  map: string;
  lang: string;
  img: File;
  primaryColor: string;
  secondaryColor: string;
}

interface Ishop {
  logo?: any;
  telegramStatus?: string;
  location?: Location;
  id?: number;
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
  addr: string | undefined;
  poi: string;
  groupShopId?: any;
  refresh: () => void;
  shopError: Error | undefined;
  shoploding: boolean;
}

interface Contact {
  phone1: string;
  phone2: string;
}

interface Location {
  lat: number;
  lng: number;
}

function ShopInfo(props: Ishop) {
  const [edit, setEdit] = useState(false);
  const method = useForm<Iform>({ shouldUnregister: true });
  const { control } = method;
  const [open, setOpen] = useState(false);

  const {
    run: updateShop,
    loading: updateLoading,
    error: updateError,
  } = useRequest(
    async (data) =>
      await HttpUtil.post(
        ROUTE_API.updateShopInfo.replace(":id", `${props.id}`),
        data
      ),
    {
      manual: true,
      onSuccess: () => {
        props.refresh();
        setEdit(false);
      },
      onError: () => {
        setOpen(true);
      },
    }
  );

  const {
    run: runTelegram,
    data: dataTelegram,
    loading: loadingTelegram,
  } = useRequest(
    async (data) =>
      await HttpUtil.post(ROUTE_API.testMessage, {
        groupId: data,
      }),
    {
      manual: true,
      onSuccess: () => {
        console.log("Success");
      },
    }
  );

  const onSubmit: SubmitHandler<Iform> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.SellerName);
      formData.append("tagline", data.tagline);
      formData.append("domain", data.domain);
      formData.append("telegramId", data.telgroup);
      formData.append("addr", data.addr);
      formData.append("poi", data.poi);
      formData.append("location[lat]", data.lati.toString());
      formData.append("location[lng]", data.long.toString());
      formData.append("contact[phone1]", data.con1);
      formData.append("contact[phone2]", data.con2);
      formData.append("lang", data.lang);
      // formData.append("primaryColor", data?.primaryColor);
      // formData.append("secondaryColor", data?.secondaryColor);
      formData.append("facebookPageId", data.faceId);
      formData.append("mapUrl", data.map);
      // formData.append("logoFile", data.img);
      // formData.append("shopCategory", data.shopCate);
      updateShop(formData);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const handleClose = () => {
    setOpen(false);
    // Nav(ROUTE_PATH.seller.detail);
    setEdit(false);
  };

  return (
    <>
      {props.shoploding ? (
        // <Box
        //   marginTop={{ xs: 15, md: 28 }}
        //   sx={{
        //     display: "flex",
        //     justifyContent: "center",
        //   }}
        // >
        //   <CircularProgress size={20} />
        // </Box>
        <BackdropLoading open />
      ) : props.shopError ? (
        <Box
          marginTop={{ xs: 12, md: 25 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ErrorResponse
            message={
              props.shopError?.error_description ||
              props.shopError?.message ||
              props.shopError?.error ||
              "Someting went wrong"
            }
            buttonText="refresh"
            buttonAction={props.refresh}
          />
        </Box>
      ) : (
        <Box py={3}>
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"xs"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Error Occured</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {updateError?.error ||
                  updateError?.message ||
                  updateError?.error_description}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>

          <Box m={{ md: 1 }} ml={{ md: 5 }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={4}
                md={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  // sx={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
                  sx={{
                    width: { xs: 100, md: 120 },
                    height: { xs: 100, md: 120 },
                    boxShadow: "0px 0px 2px 0px",
                    border: "6px solid white",
                  }}
                  src={props.logo}
                />
                <Controller
                  render={({ field: { onChange, value } }) => (
                    <Button
                      variant="text"
                      component="label"
                      size="small"
                      sx={{
                        // minWidth: "100px",
                        fontSize: {
                          xs: "body2.fontSize",
                          md: "body1.fontSize",
                        },
                        width: { xs: 120, md: 150 },
                      }}
                    >
                      Change Logo
                      <input
                        style={{ height: "100%" }}
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.value.length) {
                            onChange(e.target.files?.[0]);
                          }
                          const file = e.target.files?.[0];
                          const formData: any = new FormData();
                          formData.append("logoFile", file, file?.name);
                          updateShop(formData);
                        }}
                      />
                    </Button>
                  )}
                  name="img"
                  control={control}
                />
              </Grid>

              <Grid
                item
                xs={8}
                md={10}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  sx={{
                    fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                  }}
                >
                  {props.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                  }}
                >
                  {props.domain + ".dogenote.shop"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{ background: theme.palette.background.paper, py: 2, pl: 2 }}
          >
            <Typography
              sx={{ fontSize: { xs: "body2.fontSize", md: "body1.fontSize" } }}
              fontWeight={"bold"}
            >
              Brand Colors
            </Typography>
          </Box>
          <FormProvider {...method}>
            <ChangeColor
              primaryColor={props.primaryColor}
              secondaryColor={props.secondaryColor}
              run={updateShop}
              loading={updateLoading}
            />
          </FormProvider>

          {edit === true ? (
            <>
              <FormProvider {...method}>
                <Edit
                  addr={props?.addr}
                  contact={props?.contact}
                  domain={props?.domain}
                  logo={props?.logo}
                  lang={props?.lang}
                  location={props?.location}
                  name={props?.name}
                  poi={props?.poi}
                  primaryColor={props?.primaryColor}
                  secondaryColor={props?.secondaryColor}
                  tagline={props?.tagline}
                  telegramId={props?.telegramId}
                  telegramStatus={props?.telegramStatus}
                  facebookPageId={props?.facebookPageId}
                  groupShopId={props?.groupShopId}
                  mapUrl={props?.mapUrl}
                  tadaLocationId={props?.tadaLocationId}
                  loadingTelegram={loadingTelegram}
                  dataTelegram={dataTelegram}
                  runTelegram={runTelegram}
                />
              </FormProvider>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingBottom: "30px",
                }}
              >
                <Button
                  disabled={updateLoading}
                  sx={{ mr: 2 }}
                  color="error"
                  type="submit"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={updateLoading}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={() => {
                    setEdit(true);
                    method.handleSubmit(onSubmit)();
                  }}
                >
                  {updateLoading ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Stack>
            </>
          ) : (
            <CustomizedTables
              addr={props?.addr}
              contact={props?.contact}
              domain={props?.domain}
              logo={props?.logo}
              lang={props?.lang}
              location={props?.location}
              name={props?.name}
              poi={props?.poi}
              primaryColor={props?.primaryColor}
              secondaryColor={props?.secondaryColor}
              tagline={props?.tagline}
              telegramId={props?.telegramId}
              telegramStatus={props?.telegramStatus}
              facebookPageId={props?.facebookPageId}
              groupShopId={props?.groupShopId}
              mapUrl={props?.mapUrl}
              tadaLocationId={props?.tadaLocationId}
              loadingTelegram={loadingTelegram}
              dataTelegram={dataTelegram}
              runTelegram={runTelegram}
            />
          )}

          {edit === false && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: "30px",
              }}
            >
              <Button
                onClick={() => {
                  setEdit(true);
                }}
                variant="contained"
              >
                Edit
              </Button>
            </div>
          )}
        </Box>
      )}
    </>
  );
}

export default ShopInfo;
