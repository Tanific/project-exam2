import React from "react";
import { Box, Alert } from "@mui/material";
import VenueForm from "../../components/forms/venue-form";
import { useCreateVenueMutation } from "../../api/holidaze";
import { useNavigate } from "react-router-dom";
import { CreateVenue } from "../../types/venue";
import { SubmitHandler } from "react-hook-form";

export default function CreateVenuePage(): React.ReactElement {
  const [createVenue, { isLoading }] = useCreateVenueMutation();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  const handleCreateVenue: SubmitHandler<CreateVenue> = async (formData) => {
    try {
      const createdVenue = await createVenue(formData).unwrap();
      navigate(`/venues/${createdVenue.id}`);
    } catch (error) {
      const errorMessage = error?.data?.errors?.[0]?.message;
      setError(errorMessage);
      console.error("Failed to create venue:", error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "primary.dark",
        padding: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2, width: "400px", position: "fixed", zIndex: 1000 }}
        >
          CREATE FAILED: {error}
        </Alert>
      )}
      <VenueForm
        onSubmit={handleCreateVenue}
        mode="create"
        isLoading={isLoading}
      />
    </Box>
  );
}
