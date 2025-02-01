import React, { useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { CreateVenue } from "../../types/venue";
import { UpdateVenue } from "../../types/venue";

interface CreateVenueFormProps {
  onSubmit: SubmitHandler<CreateVenue>;
  initialValues?: CreateVenue;
  mode: "create";
  isLoading?: boolean;
}

interface UpdateVenueFormProps {
  onSubmit: SubmitHandler<UpdateVenue>;
  initialValues: CreateVenue;
  mode: "update";
  isLoading?: boolean;
}
export type VenueFormProps = CreateVenueFormProps | UpdateVenueFormProps;

export default function VenueForm({
  onSubmit,
  initialValues,
  isLoading = false,
  mode,
}: VenueFormProps): React.ReactElement {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateVenue>({
    defaultValues: initialValues || {
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
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <Box
      maxWidth="md"
      sx={{ mt: 4, backgroundColor: "background.paper", p: 4 }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {mode === "create" ? "Create Venue" : "Edit Venue"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(
          onSubmit as SubmitHandler<CreateVenue | UpdateVenue>
        )}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        {/* Venue Name */}
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
              slotProps={{ htmlInput: { min: 0, max: 5 } }}
              helperText="Optional (0-5)"
              fullWidth
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value === "" ? "" : Number(value));
              }}
            />
          )}
        />

        {/* Media Section */}
        <Typography variant="h6">Media</Typography>
        {fields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Controller
              name={`media.${index}.url`}
              control={control}
              rules={{ required: "Media URL is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="URL"
                  error={!!errors.media?.[index]?.url}
                  helperText={errors.media?.[index]?.url?.message}
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
                  error={!!errors.media?.[index]?.alt}
                  helperText={errors.media?.[index]?.alt?.message}
                  fullWidth
                />
              )}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => remove(index)}
            >
              Remove
            </Button>
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
                control={
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="WiFi"
              />
            )}
          />
          <Controller
            name="meta.parking"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Parking"
              />
            )}
          />
          <Controller
            name="meta.breakfast"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Breakfast"
              />
            )}
          />
          <Controller
            name="meta.pets"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
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
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Controller
            name="location.zip"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="ZIP"
                fullWidth
                placeholder="ZIP Code"
              />
            )}
          />
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
          <Controller
            name="location.lat"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Latitude"
                type="number"
                fullWidth
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? "" : Number(value));
                }}
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
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? "" : Number(value));
                }}
              />
            )}
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            alignSelf: "flex-start",
            backgroundColor: "#42B34E",
            color: "black",
            mt: 2,
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : mode === "create" ? (
            "Create Venue"
          ) : (
            "Update Venue"
          )}
        </Button>
      </Box>
    </Box>
  );
}
