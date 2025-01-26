import { Venue } from "./venue";
import { BookingWithVenue } from "./booking";

interface BaseUserObject {
  name: string;
  email: string;
  avatar: Avatar;
  venueManager?: boolean;
}

export interface Avatar {
  url: string;
  alt: string;
}

export interface RegisterUserObject extends BaseUserObject {
  password: string;
}

export interface UpdateAvatarProps {
  handleClose: () => void;
  open: boolean;
  name: string
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

export interface UserProfileResponse {
  data: UserWithBookings;
  meta: any;
}

export type UserProfile = UserWithBookings;

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

