import React from "react";
import { Box, Typography } from "@mui/material";
import UpdateVenueForm from "../../components/forms/update-venue-form";

export default function UpdateVenuePage(): React.ReactElement {
  return (
    <Box sx={{ backgroundColor: "primary.main", color: "primary.dark", padding: 2, display: "flex", justifyContent: "center" }}>
      <UpdateVenueForm />
    </Box>
  );
}