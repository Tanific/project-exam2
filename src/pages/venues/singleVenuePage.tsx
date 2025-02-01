import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import {
  useGetVenueByIdQuery,
  useDeleteVenueMutation,
} from "../../api/holidaze";
import { Booking } from "../../types/booking";
import { VenueGalleryProps } from "../../types/venue";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import VenueInfo from "../../components/venue/venue-info";
import VenueGallery from "../../components/venue/venue-gallery";
import BookingCalendar from "../../components/venue/booking-calendar";

export default function SingleVenuePage(): React.ReactElement {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetVenueByIdQuery(
    venueId ?? ""
  );
  const [deleteVenue, { isLoading: isDeleting }] = useDeleteVenueMutation();
  const [openDeleteDialog, setOpenDeleteDialog] =
    React.useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userName = useSelector((state: RootState) => state.user.user.name);
  const [openBookings, setOpenBookings] = React.useState<boolean>(false);
  const isOwnVenue = userName === data?.owner.name;
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(data);

  if (error != null) console.error(error);
  const handleOpenBookings = () => {
    setOpenBookings(true);
  };

  const handleCloseBookings = () => {
    setOpenBookings(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteVenue(venueId!).unwrap();
      navigate("/venues");
    } catch (err) {
      console.error("Failed to delete venue:", err);
    }
  };

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
          <Typography variant="h5">Oh no, there was an error.</Typography>
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
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "primary.main",
            minWidth: "100vw",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            overflow: "hidden",
            color: "white",
          }}
        >
          <Box
            sx={{
              marginTop: 2,
              paddingX: 2,
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexDirection: "column",
            }}
          >
            <Button
              component={Link}
              to="/venues"
              sx={{
                color: "white",
                textDecoration: "underline",
                mt: 3,
              }}
            >
              Go back
            </Button>
            {isOwnVenue && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  textAlign: "center",
                  flex: 1,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleOpenBookings}
                  sx={{
                    backgroundColor: "grey.800",
                    color: "white",
                  }}
                >
                  View Bookings
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/venues/edit/${venueId}`}
                  sx={{ backgroundColor: "secondary.main", color: "white" }}
                  startIcon={<EditIcon />}
                >
                  Edit Venue
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleOpenDeleteDialog}
                >
                  Delete Venue
                </Button>
              </Box>
            )}
            <Box
              sx={{
                marginBlock: 1,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <Typography
                component="h2"
                variant="h3"
                noWrap
                sx={{
                  display: "inline-block",
                  margin: 1,
                  fontWeight: "bold",
                  maxWidth: "75vw",
                }}
              >
                {data.name}
              </Typography>
              <Typography
                component="h3"
                variant="h6"
                
                sx={{ margin: 1, fontStyle: "italic", fontWeight: "light", maxWidth: "75vw" }}
              >
                {data.description}
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{ margin: 1, fontWeight: "light", color: "#8E00E0" }}
              >
                <span style={{ fontWeight: "bold", fontSize: "larger" }}>
                  {data.price}
                </span>{" "}
                kr / night
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                noWrap
                sx={{ margin: 1, fontWeight: "light", maxWidth: "75vw" }}
              >
                {data.location &&
                data.location.city?.trim() &&
                data.location.country?.trim()
                  ? `${data.location.city}, ${data.location.country}`
                  : "Location not found"}
              </Typography>
              <VenueInfo
                wifi={data.meta?.wifi}
                pets={data.meta?.pets}
                rating={data.rating}
                breakfast={data.meta?.breakfast}
                parking={data.meta?.parking}
                maxGuests={data.maxGuests}
              />
              <VenueGallery images={data.media as VenueGalleryProps[]} />
            </Box>
            <Box sx={{ padding: 1, marginBlock: 1 }}>
              <BookingCalendar
                bookings={data.bookings}
                maxGuests={data.maxGuests}
                venueId={data.id}
                enableBooking={isLoggedIn}
              />
            </Box>
          </Box>
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle id="delete-venue-dialog-title">
              Delete Venue
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete <strong>{data.name}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                color="error"
                variant="contained"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
          {isOwnVenue && (
            <Dialog
              open={openBookings}
              onClose={handleCloseBookings}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>All Bookings for This Venue</DialogTitle>
              <DialogContent dividers>
                {data.bookings && data.bookings.length > 0 ? (
                  <List>
                    {data.bookings.map((booking: Booking) => (
                      <ListItem key={booking.id} divider>
                        <ListItemText
                          primary={booking.customer.name}
                          secondary={`${formatDate(
                            booking.dateFrom
                          )} to ${formatDate(booking.dateTo)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>No bookings available for this venue.</Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseBookings} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      ) : null}
    </>
  );
}
