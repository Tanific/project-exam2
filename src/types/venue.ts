import { Booking } from "./booking.ts";

interface VenueOwner {
  name: string;
  email: string;
  avatar: string;
}

export interface Media {
  url: string;
  alt: string;
}

export interface ImageGallery {
  images: VenueGalleryProps[];
}

export interface VenueLocation {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
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
  media?: Media[];
  price?: number;
  maxGuests?: number;
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
  meta: VenueMeta;
  location?: VenueLocation;
}

export interface UpdateVenue {
  venueId: string;
  body: CreateVenue;
}

export interface VenueListProps {
  venues: Venue[];
  cardHeadingLevel?: 2 | 3 | 4 | 5 | 6;
  venueManager?: boolean;
}

export interface VenueCardProps {
  id: string;
  name: string;
  media?: Media[];
  price?: number;
  location?: VenueLocation;
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
  cardHeadingLevel?: 2 | 3 | 4 | 5 | 6;
}

export interface VenueInfoProps {
  wifi?: boolean;
  pets?: boolean;
  rating?: 0 | 1 | 2 | 3 | 4 | 5;
  breakfast?: boolean;
  parking?: boolean;
  maxGuests?: number;
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
  gallery: ImageGallery;
}

export interface VenueDetailed extends VenueWithOwner, VenueWithBookings {}

export interface VenueGalleryProps extends Media {}
