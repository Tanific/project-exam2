import { Venue } from "./venue";
import { BookingWithVenue } from "./booking";

interface BaseUserObject {
  name: string;
  email: string;
  avatar?: string;
  venueManager?: boolean;
}

export interface RegisterUserObject extends BaseUserObject {
  password: string;
}

export interface UserObject extends BaseUserObject {
  id: string;
}

export interface UserState {
  isLoggedIn: boolean;
  accessToken: string;
  user: UserObject;
}

export interface UserWithBookings extends UserObject {
  bookings: BookingWithVenue[];
  _count: { bookings: number; venues: number };
}

export interface UserWithVenues extends UserObject {
  venues: Venue[];
  _count: { bookings: number; venues: number };
}

export interface LoginResponse extends UserObject {
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
