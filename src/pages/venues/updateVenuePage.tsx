import React from "react";
import { Box, Alert } from "@mui/material";
import VenueForm from "../../components/forms/venue-form";
import { useUpdateVenueMutation, useGetVenueByIdQuery } from "../../api/holidaze"; 
import { useNavigate, useParams } from "react-router-dom";
import { UpdateVenue } from "../../types/venue";
import { SubmitHandler } from "react-hook-form";

export default function UpdateVenuePage(): React.ReactElement {
  const [updateVenue, { isLoading }] = useUpdateVenueMutation();
  const navigate = useNavigate();
  const { venueId } = useParams<{ venueId: string }>();
  const { data } = useGetVenueByIdQuery(venueId ?? "");
  const [error, setError] = React.useState<string>("");

  const handleUpdateVenue: SubmitHandler<UpdateVenue> = async (formData) => {
    try {
      await updateVenue({ venueId: venueId!, body: formData }).unwrap();
      navigate(`/venues/${venueId}`);
    } catch (error) {
      const errorMessage = error?.data?.errors?.[0]?.message;
      setError(errorMessage);
      console.error("Failed to update venue:", error);
      setTimeout(() => { setError(""); }, 5000);
    }
  };

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
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: "400px", position: "fixed", zIndex: 1000 }}>
          UPDATE FAILED: {error}
        </Alert>
      )}
      {data && (
        <VenueForm
          onSubmit={handleUpdateVenue}
          initialValues={data}
          mode="update"
          isLoading={isLoading}
        />
      )}
    </Box>
  );
}