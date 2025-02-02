import * as React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        backgroundColor: "secondary.main",
        paddingBlock: 1,
      }}
    >
      <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
        {`©${currentYear} - `}Project Exam 2 - Tonje Stensen
      </Typography>
    </Box>
  );
}
