import React from "react";
import { Box, Typography } from "@mui/material";
import VenueForm from "../../components/forms/venue-form";

export default function CreateVenuePage(): React.ReactElement {
  return (
    <Box sx={{ backgroundColor: "primary.main", color: "primary.dark", padding: 2, display: "flex", justifyContent: "center" }}>
      <VenueForm />
    </Box>
  );
}
