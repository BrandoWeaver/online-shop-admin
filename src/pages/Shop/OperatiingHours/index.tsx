import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useContext } from "react";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "contexts/AuthContext";
import { useRequest } from "ahooks";
import moment, { Moment } from "moment";
import HttpUtil from "utils/http-util";
import { ROUTE_API } from "utils/route-util";
import ErrorResponse from "ErrorRespone";
import theme from "themes";
import { BackdropLoading } from "components/Loading";

interface Iforminput {
  operatingHour: Iform[];
}
interface Iform {
  // hour?: Itime[];
  openTime?: Moment | null;
  closeTime?: Moment | null;
  open?: boolean;
  index: number;
  day: string;
  opentime?: string;
  closetime?: string;
}
// interface Itime {
//   openTime?: Moment | null;
//   closeTime?: Moment | null;
// }

const days = [
  { id: 0, title: "Sunday", name: "sunday" },
  { id: 1, title: "Monday", name: "monday" },
  { id: 2, title: "Tuesday", name: "tuesday" },
  { id: 3, title: "Wednesday", name: "wednesday" },
  { id: 4, title: "Thursday", name: "thursday" },
  { id: 5, title: "Friday", name: "friday" },
  { id: 6, title: "Saturday", name: "saturday" },
];

// const days = {
//   0: { title: "Sunday", name: "sunday" },
//   1: { title: "Monday", name: "monday" },
//   2: { title: "Tuesday", name: "tuesday" },
//   3: { title: "Wednesday", name: "wednesday" },
//   4: { title: "Thursday", name: "thursday" },
//   5: { title: "Friday", name: "friday" },
//   6: { title: "Saturday", name: "saturday" },
// };

interface Ihour {
  Operating: IShop.OperatingHour[] | undefined;
  shopError: Error | undefined;
  refresh: () => void;
  shoploding: boolean;
}
function OperatingHours(props: Ihour) {
  // const [index, setIndex] = useState<number>();
  const { selectedShop } = useContext(AuthContext);
  // console.log(
  //   "Props",
  //   props.Operating?.map((el) => {
  //     const arr = el.hours[0];
  //     const splitTime = arr.split("-");
  //     const startTime = splitTime[0];
  //     const closeTime = splitTime[1];
  //     console.log("start time", startTime);
  //     console.log("close:", closeTime);
  //   })
  // );
  // const [selectedTime, setSelectTime] = useState<Date | null>(null);
  // console.log("Time:", setSelectTime);
  const { control, handleSubmit, watch } = useForm<Iforminput>();

  const SetTime = ({ open, index, day, opentime, closetime }: Iform) => {
    // const [isOpen, setIsOpen] = useState(open);
    const Addtime = watch(`operatingHour.${index}.open`);

    return (
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          spacing={2}
          height={{ xs: Addtime ? "auto" : "50px", md: "auto" }}
          mb={{ xs: "15px", md: "0px" }}
        >
          <Grid item xs={5} md={2}>
            <Controller
              control={control}
              name={`operatingHour.${index}.day`}
              render={({ field, fieldState: { error } }) => (
                <Typography
                  sx={{
                    fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                  }}
                >
                  {day}
                </Typography>
              )}
            />
          </Grid>
          <Grid item xs={7} md={2}>
            <Controller
              control={control}
              defaultValue={open}
              name={`operatingHour.${index}.open`}
              render={({ field, fieldState: { error } }) => (
                <FormControlLabel
                  sx={{
                    display: "block",
                    "& .MuiFormControlLabel-label": {
                      fontSize: { xs: 14, md: 16 },
                    },
                  }}
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log(e.target.checked);
                      }}
                      size="small"
                      // name="loading"
                      color="primary"
                    />
                  }
                  {...field}
                  label={field.value ? "Open" : "Closed"}
                />
              )}
            />
          </Grid>

          <>
            <Grid
              item
              xs={6}
              md={2}
              sx={{
                // display: Addtime ? "block" : "none",
                visibility: Addtime ? "visible" : "hidden",
                // md: { visibility: Addtime ? "visible" : "hidden" },
                // xs: { display: Addtime ? "block" : "none" },
                // mb: Addtime ? 2 : 0,
              }}
            >
              <Controller
                control={control}
                name={`operatingHour.${index}.openTime`}
                defaultValue={moment(opentime, "H:mm")}
                render={({ field, fieldState: { error } }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      slotProps={{ textField: { size: "small" } }}
                      {...field}
                      // onChange={(e) => field.onChange(e)}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
              sx={{
                visibility: Addtime ? "visible" : "hidden",
                // display: Addtime ? "block" : "none",
                // md: { visibility: Addtime ? "visible" : "hidden" },
                // xs: { display: Addtime ? "block" : "none" },
                // mb: Addtime ? 2 : 0,
                paddingTop: Addtime ? "0px" : "10px",
              }}
            >
              <Controller
                control={control}
                name={`operatingHour.${index}.closeTime`}
                defaultValue={moment(closetime, "H:mm")}
                render={({ field, fieldState: { error } }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      slotProps={{ textField: { size: "small" } }}
                      {...field}
                      // onChange={(e) => field.onChange(e)}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
          </>
          <Grid item xs={5} md={5}></Grid>
        </Grid>
      </Stack>
    );
  };

  const { run, loading: loadUpdateHour } = useRequest(
    (data) =>
      HttpUtil.post(
        ROUTE_API.updateOpHour.replace(":id", `${selectedShop?.id}`),
        {
          operatingHour: data,
        }
      ),
    {
      manual: true,
      onSuccess: (data) => {
        console.log("Success:", data.data);
        props.refresh();
      },
    }
  );
  const onSubmit: SubmitHandler<Iforminput> = (data) => {
    console.log(
      "onSubmit:",
      data.operatingHour.map((el, index) => {
        return {
          day: index,
          Open: el.open,
          hours: el.openTime &&
            el.closeTime && [
              el.openTime?.format("HH:mm") +
                "-" +
                el.closeTime?.format("HH:mm"),
            ],
        };
      })
    );

    const Mydata = data.operatingHour.map((el, index) => {
      return {
        day: index,
        open: el.open,
        hours: el.openTime &&
          el.closeTime && [
            el.openTime?.format("HH:mm") + "-" + el.closeTime?.format("HH:mm"),
          ],
      };
    });

    try {
      run(Mydata);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <Box>
      {loadUpdateHour ? (
        <>
          <Box
            marginTop={{ xs: 15, md: 28 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BackdropLoading open />
          </Box>
        </>
      ) : props.shopError ? (
        <>
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
        </>
      ) : (
        <>
          <Paper
            sx={{
              mt: 2,
              p: 3,
              background: theme.palette.background.default,
              marginBottom: { xs: 10, md: 0 },
            }}
            variant="outlined"
          >
            <Stack>
              <Typography
                fontWeight={"bold"}
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Set Operating Hours
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "body2.fontSize", md: "body1.fontSize" },
                }}
              >
                Configure the standard hours of operating for this shop
              </Typography>
            </Stack>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ marginTop: "30px" }}
            >
              {props.Operating?.map((el, i) => {
                const arr = el.hours[0];
                const splitTime = arr.split("-");
                const startTime = splitTime[0];
                const closeTime = splitTime[1];

                return (
                  <Box key={i}>
                    <SetTime
                      index={i}
                      open={el.open}
                      closetime={closeTime}
                      opentime={startTime}
                      day={days[i].title}
                    />
                  </Box>
                );
              })}
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              </Box>
            </form>
          </Paper>
        </>
      )}
    </Box>
  );
}

export default OperatingHours;
