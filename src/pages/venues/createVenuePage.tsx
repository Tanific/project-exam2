import React from "react";
import { Box } from "@mui/material";
import VenueForm from "../../components/forms/venue-form";
import { useCreateVenueMutation } from "../../api/holidaze";
import { useNavigate } from "react-router-dom";
import { CreateVenue } from "../../types/venue";
import { SubmitHandler } from "react-hook-form";

export default function CreateVenuePage(): React.ReactElement {
  const [createVenue, { isLoading, isError, error }] = useCreateVenueMutation();
  const navigate = useNavigate();

  const handleCreateVenue: SubmitHandler<CreateVenue> = async (formData) => {
    try {
      const createdVenue = await createVenue(formData).unwrap();
      navigate(`/venues/${createdVenue.id}`); 
    } catch (err) {
      console.error("Failed to create venue:", err);
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
      <VenueForm
        onSubmit={handleCreateVenue}
        mode="create"
        isLoading={isLoading}
      />
    </Box>
  );
}