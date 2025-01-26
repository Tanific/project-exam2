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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Placeholder from "../../../assets/VenuePlaceholder.svg";
import { BookingListProps } from "../../../types/booking";

export default function MyBookings(
  props: BookingListProps
): React.ReactElement {
  const { bookings } = props;
  const [deleteBooking] = useDeleteBookingMutation();
  const [bookingOpen, setBookingOpen] = React.useState(false);

  const handleDelete = async (id: string): Promise<void> => {
    await deleteBooking(id);
  };

  if (!bookings || bookings.length === 0) {
    return <Typography>No bookings available.</Typography>;
  }

  return (
    <List dense={false} sx={{ maxWidth: "675px" }}>
      {bookings.map((booking) => {
        return (
          <ListItem
            key={booking.id}
            secondaryAction={
              <Box>
                <Tooltip title={"Delete booking"}>
                  <IconButton
                    aria-label={`Delete booking at ${booking.venue.name}`}
                    onClick={() => handleDelete(booking.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    setBookingOpen(true);
                  }}
                  aria-label={`View booking for ${booking.venue.name} on ${
                    booking.venue.name
                  } on ${new Date(booking.dateFrom).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                    }
                  )}.`}
                >
                  View
                </Button>
              </Box>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <img
                  src={
                    booking.venue.media[0] != null
                      ? booking.venue.media[0].url
                      : Placeholder
                  }
                  alt=""
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${booking.venue.name} - ${booking.guests} ${
                booking.guests > 1 ? "Guests" : "Guest"
              }`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
