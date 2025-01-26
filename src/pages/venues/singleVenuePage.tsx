import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { useGetVenueByIdQuery, useDeleteVenueMutation } from "../../api/holidaze";
import { Booking } from "../../types/booking";
import { Venue, VenueGalleryProps } from "../../types/venue";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Tooltip,
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
  const { data, error, isError, isLoading } = useGetVenueByIdQuery(venueId ?? "");
  const [deleteVenue, { isLoading: isDeleting }] = useDeleteVenueMutation();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
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
      navigate("/venues"); // Navigate to venues list after deletion
    } catch (err) {
      console.error("Failed to delete venue:", err);
      // Optionally, display an error message to the user
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
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "primary.main",
            minWidth: "100vw",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
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
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                to="/venues"
                sx={{ borderColor: "secondary.main", color: "secondary.light", textDecoration: "underline" }}
              >
                Go back
              </Button>
              {isOwnVenue && (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleOpenBookings}
                    sx={{ borderColor: "secondary.main", color: "secondary.light" }}
                  >
                  Bookings
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/venues/edit/${venueId}`}
                    sx={{ backgroundColor: "secondary.main", color: "white" }}
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
                </>
              )}
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
                        component={Link}
                        to={`/venues/edit/${data.id}/`}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
              </Box>
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
          <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            aria-labelledby="delete-venue-dialog-title"
          >
            <DialogTitle id="delete-venue-dialog-title">Delete Venue</DialogTitle>
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
            <Dialog open={openBookings} onClose={handleCloseBookings} fullWidth maxWidth="sm">
              <DialogTitle>All Bookings for This Venue</DialogTitle>
              <DialogContent dividers>
                {data.bookings && data.bookings.length > 0 ? (
                  <List>
                    {data.bookings.map((booking: Booking) => (
                      <ListItem key={booking.id} divider>
                        <ListItemText
                          primary={booking.customer.name} // Adjust based on your data structure
                          secondary={`${formatDate(booking.dateFrom)} to ${formatDate(booking.dateTo)}`}
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