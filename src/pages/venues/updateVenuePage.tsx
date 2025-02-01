import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import VenueForm from "../../components/forms/venue-form";
import { useUpdateVenueMutation, useGetVenueByIdQuery } from "../../api/holidaze"; 
import { useNavigate, useParams } from "react-router-dom";
import { UpdateVenue } from "../../types/venue";
import { SubmitHandler } from "react-hook-form";

export default function UpdateVenuePage(): React.ReactElement {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();

  const { data, isLoading: isFetching, isError, error } = useGetVenueByIdQuery(venueId ?? "");
  const [updateVenue, { isLoading: isUpdating }] = useUpdateVenueMutation();

  const handleUpdateVenue: SubmitHandler<UpdateVenue> = async (formData) => {

    try {
      await updateVenue({ venueId: venueId!, body: formData }).unwrap();
      navigate(`/venues/${venueId}`);
    } catch (err) {
      console.error("Failed to update venue:", err);
    }
  };

  if (isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          backgroundColor: "primary.main",
          color: "primary.dark",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          backgroundColor: "primary.main",
          color: "primary.dark",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">Failed to load venue data.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "primary.dark",
        padding: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <VenueForm
        onSubmit={handleUpdateVenue}
        initialValues={data}
        mode="update"
        isLoading={isUpdating}
      />
    </Box>
  );
}