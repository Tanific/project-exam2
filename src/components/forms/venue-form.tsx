import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateVenueMutation } from "../../api/holidaze";
import { CreateVenue, UpdateVenue } from "../../types/venue";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function VenueForm(): React.ReactElement {
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

  const [createVenue, { isLoading, isError, error }] = useCreateVenueMutation();
  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const onSubmit: SubmitHandler<CreateVenue> = async (formData) => {
    try {
      await createVenue(formData).unwrap();
      reset();
      navigate("/venues");
    } catch (err) {
      console.error("Failed to create venue:", err);
    }
  };

  return (
    <Box maxWidth="md" sx={{ mt: 4, backgroundColor: "background.paper", p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Venue
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              min: { value: 0, message: "Price cannot be negative" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price*"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? "" : Number(value));
                }}
              />
            )}
          />
          <Controller
            name="maxGuests"
            control={control}
            rules={{
              required: "Max Guests is required",
              min: { value: 1, message: "At least 1 guest required" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Max Guests*"
                type="number"
                error={!!errors.maxGuests}
                helperText={errors.maxGuests?.message}
                fullWidth
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? "" : Number(value));
                }}
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
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? "" : Number(value));
              }}
            />
          )}
        />

        {/* Media */}
        <Typography variant="h6">Media</Typography>
        {fields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <Controller
              name={`media.${index}.url`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`Media URL ${index + 1}`}
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
            {fields.length > 1 && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </Box>
        ))}
        <Button variant="outlined" onClick={() => append({ url: "", alt: "" })}>
          Add Media
        </Button>

        {/* Amenities */}
        <Typography variant="h6">Amenities</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Controller
            name="meta.wifi"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="WiFi"
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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
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
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
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

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
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

        {/* Submit and Cancel Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Create Venue"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => reset()}
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>

        {/* Error Handling */}
        {isError && (
          <Typography color="error">
            {String(error) || "An error occurred while creating the venue."}
          </Typography>
        )}
      </Box>
    </Box>
  );
}