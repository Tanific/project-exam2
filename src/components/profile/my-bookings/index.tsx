import * as React from "react";
import { useDeleteBookingMutation } from "../../../api/holidaze";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Placeholder from "../../../assets/VenuePlaceholder.svg";
import { BookingListProps } from "../../../types/booking";
import { Booking } from "../../../types/booking";

export default function MyBookings(
  props: BookingListProps
): React.ReactElement {
  const { bookings } = props;
  const [deleteBooking] = useDeleteBookingMutation();
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(
    null
  );

  const handleDelete = async (id: string): Promise<void> => {
    await deleteBooking(id);
  };

  const handleView = (booking: Booking): void => {
    setSelectedBooking(booking);
  };

  const handleClose = (): void => {
    setSelectedBooking(null);
  };

  if (!bookings || bookings.length === 0) {
    return (
      <Typography sx={{ color: "white" }}>No bookings available.</Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {bookings.map((booking) => (
          <Box
            key={booking.id}
            sx={{
              backgroundColor: "#424242",
              borderRadius: 2,
              color: "white",
              padding: 2,
              maxWidth: 350,
              width: {
                xs: "100%",
                sm: "100%",
                md: "48%", 
              },
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ListItemAvatar>
                <Avatar>
                  <img
                    src={booking.venue.media?.[0]?.url || Placeholder}
                    alt={`${booking.venue.name} Image`}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={booking.venue.name}
                secondary={`From: ${new Date(booking.dateFrom).toLocaleDateString(
                  "en-GB"
                )} To: ${new Date(booking.dateTo).toLocaleDateString("en-GB")}`}
                slotProps={{ secondary: { sx: { color: "white" } } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                marginTop: 2,
                flexDirection: {sm: "row" },
                alignItems: "center",
              }}
            >
              <Tooltip title="Delete booking">
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`Delete booking at ${booking.venue.name}`}
                  onClick={() => handleDelete(booking.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Button
                sx={{ color: "white", borderColor: "white" }}
                variant="outlined"
                onClick={() => handleView(booking)}
                aria-label={`View booking for ${
                  booking.venue.name
                } on ${new Date(booking.dateFrom).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}.`}
              >
                View
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Dialog for Viewing Booking Details */}
      {selectedBooking && (
        <Dialog
          open={selectedBooking !== null}
          onClose={handleClose}
          aria-labelledby="booking-details-dialog-title"
        >
          <DialogTitle id="booking-details-dialog-title">
            Booking Details
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Venue:</strong> {selectedBooking.venue.name}
              <br />
              <strong>Guests:</strong> {selectedBooking.guests}
              <br />
              <strong>From:</strong>{" "}
              {new Date(selectedBooking.dateFrom).toLocaleDateString(
                "en-GB",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
              <br />
              <strong>To:</strong>{" "}
              {new Date(selectedBooking.dateTo).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}