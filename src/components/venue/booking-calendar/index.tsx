import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Button as MuiButton,
} from "@mui/material";
import { useCreateBookingMutation } from "../../../api/holidaze";
import { BookingCalendarProps } from "../../../types/booking";

export default function BookingCalendar(
  props: BookingCalendarProps
): React.ReactElement {
  const { bookings, maxGuests = 100, venueId, enableBooking = false } = props;
  const [guestsError, setGuestsError] = useState<string>("");
  const [createBooking] = useCreateBookingMutation();
  const [guests, setGuests] = useState<number>(1);
  const [bookingError, setBookingError] = useState<string>("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(width < 900px)");

  const [dates, setDates] = useState({
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
      /*navigate("/profile");*/
    } catch (error) {
      const errorMessage =
      error?.data?.errors?.[0]?.message
      console.error("Booking failed:", errorMessage);
      setBookingError(errorMessage);
    }
  };

  return (
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
          <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
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
              if (value >= 1 && value <= maxGuests) {
                setGuestsError(""); // Clear error when valid
              } else {
                setGuestsError(
                  `Number of guests must be between 1 and ${maxGuests}.` // Set appropriate error message
                );
              }
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
            onClick={handleBooking}
            sx={{
              marginBlock: 2,
              backgroundColor: "secondary.detail",
              color: "white",
            }}
          >
            Book Venue
          </MuiButton>
          
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
  );
}
