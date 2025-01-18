import { Booking } from "./booking.ts";

interface VenueOwner {
  name: string;
  email: string;
  avatar: string;
}

export interface Media  {
    url: string;
    alt: string;
}

export interface VenueLocation {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface CreateVenue {
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  meta: VenueMeta;
  location: VenueLocation;
}

export interface UpdateVenue {
  venueId: string;
  body: {
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    meta: VenueMeta;
    location: VenueLocation;
  };
}

export interface Venue extends CreateVenue {
  id: string;
  created: string;
  updated: string;
}

export interface VenueWithOwner extends Venue {
  owner: VenueOwner;
}

export interface VenueWithBookings extends Venue {
  bookings: Booking[];
}

export interface VenueDetailed extends VenueWithOwner, VenueWithBookings {}
