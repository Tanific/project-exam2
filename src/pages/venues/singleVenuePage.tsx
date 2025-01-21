import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { useGetVenueByIdQuery } from "../../api/holidaze";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
  Typography,
  Button, 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VenueInfo from "../../components/venue/venue-info";

export default function SingleVenuePage(): React.ReactElement {
  const { venueId } = useParams();
  console.log("Venue ID:", venueId); // Debugging venueId

  const { data, error, isLoading } = useGetVenueByIdQuery(venueId ?? "");
  console.log("API Response:", { data, error, isLoading }); // Debugging API response

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userName = useSelector((state: RootState) => state.user.user.name);
  const isOwnVenue = userName === data?.owner.name;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "primary.main" }}>  
        <CircularProgress color="inherit"/>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "primary.main" }}>
        <Typography variant="h6" color="error">
          An error occurred while fetching the venue data.
        </Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "primary.main" }}>
        <Typography variant="h6" color="error">
          No data available for this venue.
        </Typography>
      </Box>
    );
  }

  return (
      <Container
        sx={{
          backgroundColor: "primary.main",
          minWidth: "100vw",
          color: "white",
          padding: 2,
          flex: 1,
        }}
      >
        <Box sx={{ marginTop: 2 }}>
          <Button variant="outlined" component={Link} to="/venues" sx={{ borderColor: "secondary.main", color: "secondary.light" }}> 
            Back to all venues
          </Button>
        </Box>
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
      </Container>
  );
}