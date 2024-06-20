import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import React from "react";
import {
  CircularProgress,
  Grid,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import theme from "themes";
import { Controller, useFormContext } from "react-hook-form";

interface Idetail {
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
  lang?: string;
  img: File;
  primaryColor: string;
  secondaryColor: string;
}

function Edit(props: Idetail) {
  const { control, register, getValues } = useFormContext<Iform>();

  const Test = () => {
    try {
      props.runTelegram(getValues("telgroup"));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <Box>
      <form>
        <Box
          sx={{
            background: theme.palette.background.paper,
            px: 2,
            py: 3,
            mb: 2,
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2} display={"flex"} alignItems={"center"}>
            <Grid item xs={12}>
              <Typography
                fontWeight={"bold"}
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Basic
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Seller Name
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.name}
                name="SellerName"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,
                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Domain
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.domain}
                name="domain"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Tagline
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.domain}
                name="tagline"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Shop Category
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={""}
                name="shopCate"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Contact Number{`(1)`}
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.contact?.phone1}
                name="con1"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >{`Contact Number(2)`}</Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.contact?.phone2}
                name="con2"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                fontWeight={"bold"}
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Shop Language
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Default Language
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <>
                <Controller
                  defaultValue={props.lang}
                  control={control}
                  name="lang"
                  render={({ field, fieldState: { error } }) => (
                    <FormControl size="small">
                      <RadioGroup
                        defaultValue={props.lang}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ minWidth: "183px" }}
                      >
                        <FormControlLabel
                          sx={{
                            display: "block",
                            "& .MuiFormControlLabel-label": {
                              fontSize: { xs: 14, md: 16 },
                            },
                          }}
                          {...register("lang")}
                          value="en"
                          control={<Radio size="small" />}
                          label="English"
                        />
                        <FormControlLabel
                          sx={{
                            display: "block",
                            "& .MuiFormControlLabel-label": {
                              fontSize: { xs: 14, md: 16 },
                            },
                          }}
                          {...register("lang")}
                          value="kh"
                          control={<Radio size="small" />}
                          label="Khmer"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </>
            </Grid>

            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Telegram Group ID
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.telegramId}
                name="telgroup"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Telegram Status
              </Typography>
            </Grid>
            <Grid item xs={5} md={8}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                {props.loadingTelegram ? (
                  <CircularProgress size={24} color="primary" />
                ) : props.dataTelegram ? (
                  "Connected"
                ) : (
                  !props.dataTelegram && "Not Connected"
                )}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              md={2}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-end"}
            >
              <Button
                variant="text"
                onClick={() => Test()}
                sx={{
                  minWidth: "30px",
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Test
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                fontWeight={"bold"}
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Facebook
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Facebook ID
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.facebookPageId}
                name="faceId"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                fontWeight={"bold"}
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Pickup Location
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Address
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.addr}
                name="addr"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Latitude
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.location?.lat}
                name="lati"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Longtitude
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.location?.lng}
                name="long"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                POI Name
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.poi}
                name="poi"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: 1 }} md={2}>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Google Map
              </Typography>
            </Grid>
            <Grid item xs={6} md={10}>
              <Controller
                defaultValue={props.mapUrl}
                name="map"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,

                        background: (theme) => theme.palette.background.default,
                      }}
                      {...field}
                    />
                  </>
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}

export default Edit;
