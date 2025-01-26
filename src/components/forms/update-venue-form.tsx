import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useGetVenueByIdQuery, useUpdateVenueMutation } from "../../api/holidaze";
import { CreateVenue, UpdateVenue } from "../../types/venue";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

export default function UpdateVenueForm(): React.ReactElement {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetVenueByIdQuery(venueId ?? "");
  const [updateVenue, { isLoading: isUpdating }] = useUpdateVenueMutation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<CreateVenue>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      maxGuests: 0,
      rating: 0,
      media: [{ url: "", alt: "" }],
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
        lat: 0,
        lng: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<CreateVenue> = async (formData) => {
    const updateData: UpdateVenue = {
      venueId: venueId!,
      body: formData,
    };
    try {
      await updateVenue(updateData).unwrap();
      navigate(`/venues/${venueId}`);
    } catch (err) {
      console.error("Failed to update venue:", err);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h6">Failed to load venue data.</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="md" sx={{ mt: 4, backgroundColor: "background.paper", p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Venue
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {/* Name */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Venue name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name*"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description*"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
            />
          )}
        />

        {/* Price and Max Guests */}
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Controller
            name="price"
            control={control}
            rules={{ required: "Price is required", min: { value: 0, message: "Price cannot be negative" } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price*"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          <Controller
            name="maxGuests"
            control={control}
            rules={{ required: "Max Guests is required", min: { value: 1, message: "At least 1 guest required" } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Max Guests*"
                type="number"
                error={!!errors.maxGuests}
                helperText={errors.maxGuests?.message}
                fullWidth
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </Box>

        {/* Rating */}
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rating"
              type="number"
              inputProps={{ min: 0, max: 5 }}
              helperText="Optional (0-5)"
              fullWidth
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />

        {/* Media */}
        <Typography variant="h6">Media</Typography>
        {fields.map((item, index) => (
          <Box key={item.id} sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
            <Controller
              name={`media.${index}.url`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Media URL"
                  type="url"
                  fullWidth
                />
              )}
            />
            <Controller
              name={`media.${index}.alt`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Alt Text"
                  placeholder="Image description"
                  fullWidth
                />
              )}
            />
            <Button variant="outlined" color="error" onClick={() => remove(index)}>
              Remove
            </Button>
          </Box>
        ))}
        <Button variant="outlined" onClick={() => append({ url: "", alt: "" })}>
          Add Media
        </Button>

        {/* Amenities */}
        <Typography variant="h6">Amenities</Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Controller
            name="meta.wifi"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Wi-Fi"
              />
            )}
          />
          <Controller
            name="meta.parking"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Parking"
              />
            )}
          />
          <Controller
            name="meta.breakfast"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Breakfast"
              />
            )}
          />
          <Controller
            name="meta.pets"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Pets"
              />
            )}
          />
        </Box>

        {/* Location */}
        <Typography variant="h6">Location</Typography>
        <Controller
          name="location.address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              placeholder="123 Main St"
            />
          )}
        />
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Controller
            name="location.city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                placeholder="City Name"
              />
            )}
          />
          <Controller
            name="location.zip"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Zip Code"
                type="text"
                fullWidth
                placeholder="12345"
              />
            )}
          />
        </Box>
        <Controller
          name="location.country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country"
              fullWidth
              placeholder="Country Name"
            />
          )}
        />
        <Controller
          name="location.continent"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Continent"
              fullWidth
              placeholder="Continent Name"
            />
          )}
        />
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Controller
            name="location.lat"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Latitude"
                type="number"
                fullWidth
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          <Controller
            name="location.lng"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Longitude"
                type="number"
                fullWidth
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Venue"}
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}