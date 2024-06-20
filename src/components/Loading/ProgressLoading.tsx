import { Box, CircularProgress } from "@mui/material";
import React from "react";

function ProgressLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={20} />
    </Box>
  );
}

export default ProgressLoading;
