import * as React from "react";
import { Stack, Typography } from "@mui/material";
import DeckIcon from "@mui/icons-material/Deck";
import { Link } from "react-router-dom";

export default function Branding() {
  return (
    <Stack
      component={Link}
      to="/"
      direction="row"
      gap={1}
      alignItems="flex-end"
      sx={{ textDecoration: "none" }}
    >
      <DeckIcon
        sx={{
          color: "primary.dark",
          fontSize: { xs: "30px", md: "50px" },
        }}
      />
      <Typography
        variant="h5"
        noWrap
        sx={{
          letterSpacing: ".1rem",
          textDecoration: "none",
          color: "primary.dark",
          fontSize: { xs: "18px", md: "30px" },
          fontWeight: "bold",
        }}
      >
        HOLIDAZE
      </Typography>
    </Stack>
  );
}
