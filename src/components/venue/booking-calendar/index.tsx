import * as React from "react";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  DateValue,
  Heading,
  RangeCalendar,
} from "react-aria-components";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  Box,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button as MuiButton,
  Alert,
} from "@mui/material";
import { useCreateBookingMutation } from "../../../api/holidaze";
import { BookingCalendarProps } from "../../../types/booking";
import { formatDateWithSuffix } from "../../utils/formatDate";

export default function BookingCalendar(
  props: BookingCalendarProps
): React.ReactElement {
  const { bookings, maxGuests = 100, venueId, enableBooking = false } = props;

  const [createBooking] = useCreateBookingMutation();
  const [guests, setGuests] = React.useState<number>(1);
  const [bookingError, setBookingError] = React.useState<string>("");
  const [bookingSuccess, setBookingSuccess] = React.useState(false);
  const isMobile = useMediaQuery("(width < 900px)");
  const [openBookingDialog, setOpenBookingDialog] = React.useState(false);

  const handleOpenBookingDialog = () => {
    if (guests < 1 || guests > maxGuests) {
      setBookingError(`Number of guests must be between 1 and ${maxGuests}.`);
      return;
    }
    setOpenBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false);
  };

  const [dates, setDates] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });

  const isDateUnavailable = (currentDate: DateValue): boolean => {
    return bookings.some(
      (booking) =>
        currentDate.compare(parseDate(booking.dateFrom.split("T")[0])) >= 0 &&
        currentDate.compare(parseDate(booking.dateTo.split("T")[0])) <= 0
    );
  };

  const handleBooking = async (): Promise<void> => {
    const dateFrom = new Date(dates.start.toString()).toISOString();
    const dateTo = new Date(dates.end.toString()).toISOString();

    try {
      await createBooking({ dateTo, dateFrom, guests, venueId }).unwrap();
      handleCloseBookingDialog();
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 4000);
    } catch (error) {
      const errorMessage = error?.data?.errors?.[0]?.message;
      console.error("Booking failed:", errorMessage);
      setBookingError(errorMessage);
    }
  };

  return (
    <>
      {bookingSuccess && (
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
          Booking successful! View your bookings in your profile.
        </Alert>
      )}
      <Box
        sx={{
          marginBlock: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <RangeCalendar
          isReadOnly={!enableBooking}
          aria-label="Booking dates"
          value={dates}
          onChange={(newDates) => {
            setDates(newDates);
          }}
          minValue={today(getLocalTimeZone())}
          visibleDuration={{ months: isMobile ? 1 : 2 }}
          isDateUnavailable={isDateUnavailable}
          style={{ width: "max-content" }}
        >
          <Box
            component="header"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button slot="previous">◀</Button>
            <Heading />
            <Button slot="next">▶</Button>
          </Box>
          <Box sx={{ display: "flex", gap: 10, overflow: "auto" }}>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
            {!isMobile && (
              <CalendarGrid offset={{ months: 1 }}>
                {(date) => <CalendarCell date={date} />}
              </CalendarGrid>
            )}
          </Box>
        </RangeCalendar>

        {bookingError && (
          <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
            {bookingError}
          </Typography>
        )}
        {enableBooking ? (
          <Stack
            direction="row"
            alignItems="center"
            gap={4}
            sx={{ marginBlock: 1 }}
          >
            <TextField
              label={"Guests"}
              margin={"normal"}
              type={"number"}
              value={guests}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.valueAsNumber;
                setGuests(value);
              }}
              slotProps={{
                htmlInput: {
                  min: 1,
                  max: maxGuests,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  style: {
                    color: "white",
                    backgroundColor: "#303030",
                    padding: "15px 35px",
                    border: "none",
                  },
                },
                inputLabel: { style: { color: "white" } },
              }}
            />
            <MuiButton
              variant="contained"
              onClick={handleOpenBookingDialog}
              sx={{ backgroundColor: "secondary.detail" }}
            >
              Book Venue
            </MuiButton>
            <Dialog open={openBookingDialog} onClose={handleCloseBookingDialog}>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Book this venue from{" "}
                  {formatDateWithSuffix(new Date(dates.start.toString()))} to{" "}
                  {formatDateWithSuffix(new Date(dates.end.toString()))} for{" "}
                  {guests} guests?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <MuiButton onClick={handleCloseBookingDialog}>Cancel</MuiButton>
                <MuiButton onClick={handleBooking} color="primary">
                  Confirm
                </MuiButton>
              </DialogActions>
            </Dialog>
          </Stack>
        ) : (
          <Typography
            component="p"
            variant="body1"
            textAlign="center"
            marginBlock={2}
            width={"100%"}
          >
            Log in to book this venue
          </Typography>
        )}
      </Box>
    </>
  );
}
