import { Venue } from './venue.ts';

interface Customer {
    name: 'string'
    email: 'string'
    avatar: 'string'
}

interface BookingBase {
    dateFrom: string
    dateTo: string
    guests: number
}

export interface BookingCalendarProps {
  bookings: Booking[]
  maxGuests: number
  venueId: string
  enableBooking?: boolean
}

export interface CreateBooking extends BookingBase {
    venueId: string
}

export interface Booking extends BookingBase {
    id: string
    created: string
    updated: string
}

export interface BookingWithVenue extends Booking {
    venue: Venue
}

export interface BookingDetailed extends BookingWithVenue {
    customer: Customer
}

export interface UpdateBooking {
    bookingId: string
    body: BookingBase
}
