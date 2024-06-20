import { Box, Grid, TextField, Typography } from "@mui/material";
import { BackdropLoading } from "components/Loading";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
export interface IformAcc {
  name: string;
  userName: string;
  email: string;
  oldPass: string;
  newPass: string;
  ConfirPass: string;
}
interface Iinfo {
  sellerInfo: IAuth.ISellerInfo | undefined;
}

function Accform(props: Iinfo) {
  const { control, watch, getValues } = useFormContext<IformAcc>();
  const newPass = watch("newPass");
  return (
    <Box>
      {!props.sellerInfo?.userInfo ? (
        <BackdropLoading open />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "body2.fontSize",
                      md: "body1.fontSize",
                    },
                  }}
                >
                  Name <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>
              <Controller
                name="name"
                control={control}
                defaultValue={`${props.sellerInfo.userInfo.name}`}
                // rules={{ required: { value: true, message: "Fill your name" } }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      error={true}
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,
                        background: (theme) => theme.palette.background.paper,
                      }}
                      {...field}
                    />
                    {/* {error && (
                      <Typography
                        color="error.main"
                        variant="caption"
                        role="alert"
                      >
                        {error.message}
                      </Typography>
                    )} */}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "body2.fontSize",
                      md: "body1.fontSize",
                    },
                  }}
                >
                  Username <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>

              <Controller
                name="userName"
                control={control}
                defaultValue={`${props.sellerInfo.username}`}
                // rules={{ required: { value: true, message: "Fill username" } }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      error={true}
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,
                        background: (theme) => theme.palette.background.paper,
                      }}
                      {...field}
                    />
                    {/* {error && (
                      <Typography
                        color="error.main"
                        variant="caption"
                        role="alert"
                      >
                        {error.message}
                      </Typography>
                    )} */}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "body2.fontSize",
                      md: "body1.fontSize",
                    },
                  }}
                >
                  Email <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>
              <Controller
                name="email"
                control={control}
                defaultValue={`${props.sellerInfo?.userInfo.email}`}
                // rules={{
                //   required: { value: true, message: "Fill your email" },
                // }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      error={true}
                      fullWidth
                      type="email"
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,
                        background: (theme) => theme.palette.background.paper,
                      }}
                      {...field}
                    />
                    {/* {error && (
                      <Typography
                        color="error.main"
                        variant="caption"
                        role="alert"
                      >
                        {error.message}
                      </Typography>
                    )} */}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "body2.fontSize",
                      md: "body1.fontSize",
                    },
                  }}
                >
                  Old Password <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>
              <Controller
                name="oldPass"
                control={control}
                defaultValue=""
                // rules={{
                //   required: { value: true, message: "Fill old Password" },
                // }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      error={true}
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,
                        background: (theme) => theme.palette.background.paper,
                      }}
                      {...field}
                    />
                    {/* {error && (
                      <Typography
                        color="error.main"
                        variant="caption"
                        role="alert"
                      >
                        {error.message}
                      </Typography>
                    )} */}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "body2.fontSize",
                      md: "body1.fontSize",
                    },
                  }}
                >
                  New Password <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>
              <Controller
                name="newPass"
                control={control}
                defaultValue=""
                // rules={{
                //   required: { value: true, message: "Fill New Password" },
                // }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      error={true}
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,
                        background: (theme) => theme.palette.background.paper,
                      }}
                      {...field}
                    />
                    {/* {error && (
                      <Typography
                        color="error.main"
                        variant="caption"
                        role="alert"
                      >
                        {error.message}
                      </Typography>
                    )} */}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "body2.fontSize",
                      md: "body1.fontSize",
                    },
                  }}
                >
                  Confirm New Password <span style={{ color: "red" }}>*</span>
                </Typography>
              </Box>

              <Controller
                name="ConfirPass"
                control={control}
                defaultValue=""
                rules={{
                  validate: (val) => {
                    if (val !== newPass && getValues("oldPass") !== null) {
                      return "Your password does not match";
                    }
                  },
                  // required: { value: true, message: "Confirm Your Password" },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      error={true}
                      fullWidth
                      size="small"
                      sx={{
                        "& fieldset": { border: "none" },
                        borderRadius: 2,
                        background: (theme) => theme.palette.background.paper,
                      }}
                      {...field}
                    />
                    {error && (
                      <Typography
                        color="error.main"
                        variant="caption"
                        role="alert"
                      >
                        {error.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default Accform;
