import * as React from "react";
import { useDeleteBookingMutation } from "../../../api/holidaze";
import { formatDateRange } from "../../utils/formatDate";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  Alert,
  Divider,
} from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Placeholder from "../../../assets/VenuePlaceholder.svg";
import { BookingListProps } from "../../../types/booking";
import { Link } from "react-router-dom";

export default function MyBookings(
  props: BookingListProps
): React.ReactElement {
  const { bookings } = props;
  const [deleteBooking] = useDeleteBookingMutation();
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteBooking(id);
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <Typography sx={{ color: "white", textAlign: "center", mb: 2 }}>
        No bookings to display
      </Typography>
    );
  }

  return (
    <>
      {deleteSuccess && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            top: 25,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1300,
            border: "2px solid green",
          }}
        >
          Booking deleted successfully!
        </Alert>
      )}
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
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={booking.venue.name}
                slotProps={{
                  primary: {
                    noWrap: true,
                    sx: {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    },
                  },
                  secondary: {
                    component: "div",
                  },
                }}
                secondary={
                  <>
                    <Typography component="span" sx={{ color: "white" }}>
                      {formatDateRange(booking.dateFrom)} -{" "}
                      {formatDateRange(booking.dateTo)}
                    </Typography>
                    <br />
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        pt: 1,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <PeopleOutlinedIcon sx={{ mr: 1 }} />
                      {booking.guests}
                    </Typography>
                  </>
                }
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                marginTop: 2,
                flexDirection: { sm: "row" },
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{ color: "white", textDecoration: "underline" }}
                component={Link}
                to={`/venues/${booking.venue.id}`}
              >
                View Venue
              </Button>
              <Tooltip title="Delete booking">
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`Delete booking at ${booking.venue.name}`}
                  onClick={() => handleDelete(booking.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
