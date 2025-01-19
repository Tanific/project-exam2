import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import { useGetVenueByIdQuery } from "../../api/holidaze";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VenueInfo from "../../components/venue/venue-info";
import Navigation from "../../components/layout/header/navigation";

export default function SingleVenuePage(): React.ReactElement {
  const { venueId } = useParams();
  const { data, error, isLoading } = useGetVenueByIdQuery(venueId ?? "");
  console.log(data);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userName = useSelector((state: RootState) => state.user.user.name);
  const isOwnVenue = userName === data?.owner.name;

 if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6" color="error">
          An error occurred while fetching the venue data.
        </Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6" color="error">
          No data available for this venue.
        </Typography>
      </Box>
    );
  }

  return (
    <>
    <Navigation />
      <Box component="hgroup" sx={{ marginBlock: 2 }}>
        <Typography component="h1" variant="h2">
          {data.name}
          {isOwnVenue && (
            <Tooltip title="Edit venue">
              <IconButton
                aria-label="edit venue"
                href={`/venues/edit/${data.id}/`}
              >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        <VenueInfo
          wifi={data.meta.wifi}
          pets={data.meta.pets}
          rating={data.rating}
          breakfast={data.meta.breakfast}
          parking={data.meta.parking}
          maxGuests={data.maxGuests}
        />
      </Box>
    </>
  );
}