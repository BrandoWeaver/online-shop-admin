import { Box } from "@mui/material";
import React, { useState } from "react";
import { Dialog } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import ColorCom from "./ColorCom";
import { SketchPicker } from "react-color";

interface Idetail {
  primaryColor?: string;
  secondaryColor?: string;
  run: (data: any) => any;
  loading: boolean;
}
const CusWebDefaultColors = {
  main: "#99025B",
  light: "#FFF5FB",
};
function ChangeColor(props: Idetail) {
  const [primaryColor, setPrimaryColor] = useState(false);
  const [secondColor, setSecondColor] = useState(false);
  const { control, watch } = useFormContext<Idetail>();
  const watchPri = watch("primaryColor");
  const watchSec = watch("secondaryColor");

  const handleClosePrim = () => {
    setPrimaryColor(false);
    const formData = new FormData();
    formData.append("primaryColor", watchSec || `${props.primaryColor}`);
    props.run(formData);
  };
  const reStorePrime = (main: string) => {
    if (main !== null) {
      const formData = new FormData();
      formData.append("primaryColor", CusWebDefaultColors.main);
      props.run(formData);
    }
  };

  const reStoreSec = (light: string) => {
    if (light !== null) {
      const formData = new FormData();
      formData.append("secondaryColor", CusWebDefaultColors.light);
      props.run(formData);
    }
  };
  const handleCloseSecond = () => {
    setSecondColor(false);
    const formData = new FormData();
    formData.append("secondaryColor", watchPri || `${props.secondaryColor}`);
    props.run(formData);
  };
  return (
    <Box pt={{ xs: 2, md: 3 }} pb={{ xs: 2, md: 3 }}>
      <Dialog open={secondColor} onClose={handleCloseSecond}>
        <Controller
          defaultValue={props.secondaryColor}
          render={({
            field: { onChange: sec, value },
            fieldState: { error },
          }) => (
            <>
              <SketchPicker
                color={value}
                width="290px"
                onChange={(e) => {
                  console.log("second:", e.hex);
                  sec(e.hex);
                }}
              />
            </>
          )}
          rules={{
            required: { value: true, message: "Invalid Input" },
          }}
          name="primaryColor"
          control={control}
        />
      </Dialog>

      <Dialog open={primaryColor} onClose={handleClosePrim}>
        <Controller
          defaultValue={props.primaryColor}
          render={({
            field: { onChange: pri, value },
            fieldState: { error },
          }) => (
            <>
              <SketchPicker
                color={value}
                width="290px"
                onChange={(e) => {
                  console.log("Primary:", e.hex);
                  pri(e.hex);
                }}
              />
            </>
          )}
          name="secondaryColor"
          control={control}
        />
      </Dialog>
      <Box mb={2}>
        <ColorCom
          Colorhex={props.primaryColor || ""}
          main={"Main Color"}
          setPrimaryColor={() => setPrimaryColor(true)}
          reStorePrime={() => reStorePrime(CusWebDefaultColors.main)}
        />
      </Box>
      <Box>
        <ColorCom
          Colorhex={props.secondaryColor || ""}
          main={"Accent Color"}
          setPrimaryColor={() => setSecondColor(true)}
          reStorePrime={() => reStoreSec(CusWebDefaultColors.light)}
        />
      </Box>
    </Box>
  );
}

export default ChangeColor;
