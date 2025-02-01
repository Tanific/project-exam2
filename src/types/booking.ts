import { Venue } from "./venue.ts";
import { Avatar } from "./user.ts";

export interface Customer {
  name: string;
  email: string;
  avatar: Avatar;
}

export interface BookingBase {
  dateFrom: string;
  dateTo: string;
  guests: number;
}

export interface BookingCalendarProps {
  bookings: Booking[];
  maxGuests?: number;
  venueId: string;
  enableBooking?: boolean;
}

export interface BookingListProps {
    bookings: BookingWithVenue[];
}

export interface CreateBooking extends BookingBase {
  venueId: string;
}

export interface Booking extends BookingBase {
  id: string;
  created: string;
  updated: string;
  customer: Customer;
  venue: Venue;
}

export interface BookingWithVenue extends Booking {
  venue: Venue;
}

export interface BookingDetailed extends Booking {
  customer: Customer;
}

export interface UpdateBooking {
  bookingId: string;
  body: BookingBase;
}

