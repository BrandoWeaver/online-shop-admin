import { Box } from '@mui/material';

// interface Itime {
//   openTime?: Moment | null;
//   closeTime?: Moment | null;
// }

// const days = [
//   { id: 0, title: 'Sunday', name: 'sunday' },
//   { id: 1, title: 'Monday', name: 'monday' },
//   { id: 2, title: 'Tuesday', name: 'tuesday' },
//   { id: 3, title: 'Wednesday', name: 'wednesday' },
//   { id: 4, title: 'Thursday', name: 'thursday' },
//   { id: 5, title: 'Friday', name: 'friday' },
//   { id: 6, title: 'Saturday', name: 'saturday' },
// ];

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
  // const { selectedShop } = useContext(AuthContext);
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

  // const { run, loading: loadUpdateHour } = useRequest(
  //   (data) =>
  //     HttpUtil.post(
  //       ROUTE_API.updateOpHour.replace(":id", `${1}`),
  //       {
  //         operatingHour: data,
  //       }
  //     ),
  //   {
  //     manual: true,
  //     onSuccess: (data) => {
  //       console.log("Success:", data.data);
  //       props.refresh();
  //     },
  //   }
  // );

  return (
    <Box>
      {/* {loadUpdateHour ? (
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
      )} */}
      h
    </Box>
  );
}

export default OperatingHours;
