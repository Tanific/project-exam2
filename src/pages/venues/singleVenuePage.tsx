import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { useGetVenueByIdQuery } from "../../api/holidaze";
import { I18nProvider } from "react-aria-components";
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
import VenueGallery from "../../components/venue/venue-gallery";
import BookingCalendar from "../../components/venue/booking-calendar";

export default function SingleVenuePage(): React.ReactElement {
  const { venueId } = useParams();
  const { data, error, isError, isLoading } = useGetVenueByIdQuery(
    venueId ?? ""
  );
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userName = useSelector((state: RootState) => state.user.user.name);
  const isOwnVenue = userName === data?.owner.name;

  console.log(data);

  if (error != null) console.error(error);

  return (
    <>
      {isError ? (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          <p>Oh no, there was an error</p>
        </Box>
      ) : isLoading ? (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.main",
            color: "white",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : data != null ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "primary.main",
            minWidth: "100vw",
            flex: 1,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              maxWidth: "md",
              color: "white",
              padding: 2,
            }}
          >
            <Box
              sx={{
                marginTop: 2,
                paddingX: 2,
              }}
            >
              <Button
                variant="outlined"
                component={Link}
                to="/venues"
                sx={{ borderColor: "secondary.main", color: "secondary.light" }}
              >
                Back to all venues
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                padding: 2,
                borderRadius: 1,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              <Box sx={{ marginBlock: 1 }}>
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      sm: "2.4rem",
                      md: "2.8rem",
                      lg: "3.5rem",
                    },
                  }}
                >
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
              </Box>
              <VenueInfo
                wifi={data.meta.wifi}
                pets={data.meta.pets}
                rating={data.rating}
                breakfast={data.meta.breakfast}
                parking={data.meta.parking}
                maxGuests={data.maxGuests}
              />

              <VenueGallery images={data.media} />

            </Box>
          <Box component="section" sx={{ padding: 2, marginBlock: 2 }}>
            <I18nProvider locale="en-NO">
              <BookingCalendar
                bookings={data.bookings}
                maxGuests={data.maxGuests}
                venueId={data.id}
                enableBooking={isLoggedIn}
              />
            </I18nProvider>
          </Box>
          </Box>
        </Container>
      ) : null}
    </>
  );
}
