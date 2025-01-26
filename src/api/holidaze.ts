import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Venue, VenueDetailed } from "../types/venue";
import { RootState } from "../store";
import {
  UserObject,
  LoginRequest,
  RegisterUserObject,
  LoginResponse,
  UserProfileResponse,
  UserProfile,
} from "../types/user";
import { BookingDetailed, BookingWithVenue, CreateBooking, UpdateBooking } from "../types/booking";

const API_KEY = "3eb358ce-011e-4cc5-89ee-17b4f02b7e39";

export const holidazeApi = createApi({
  reducerPath: "holidazeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://v2.api.noroff.dev/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.user.accessToken;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      headers.set("X-Noroff-API-Key", API_KEY);
      return headers;
    },
  }),
  tagTypes: ["Venue", "Profile", "Booking", "VenueList", "OwnProfile"],
  endpoints: (builder) => ({
    getVenues: builder.query<Venue[], void>({
      query: () => "holidaze/venues?sort=created",
      transformResponse: (response: { data: Venue[] }) => response.data,
      providesTags: ["VenueList"],
    }),
    getTrendingVenues: builder.query<Venue[], void>({
      query: () =>
        "holidaze/venues?sort=created&sortOrder=asc&offset=7&limit=4",
      transformResponse: (response: { data: Venue[] }) => response.data,
    }),
    getVenueById: builder.query<VenueDetailed, string>({
      query: (id) => `holidaze/venues/${id}?_owner=true&_bookings=true`,
      transformResponse: (response: { data: VenueDetailed }) => response.data,
      providesTags: ["Venue"],
    }),
    getOwnProfile: builder.query<UserProfile, string>({
      query: (name) => `holidaze/profiles/${name}?_bookings=true&_venues=true`, 
      transformResponse: (response: UserProfileResponse ) => response.data,
      providesTags: ["OwnProfile"],
    }),
    updateUserAvatar: builder.mutation<UserObject, { name: string; body: { avatar: { url: string; alt: string } } }>({
      query: ({ name, body }) => ({
        url: `holidaze/profiles/${name}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["OwnProfile"],
    }),
    createBooking: builder.mutation<BookingWithVenue, CreateBooking>({
      query: (body) => ({
        url: "holidaze/bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["OwnProfile", "VenueList"],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "auth/login?_holidaze=true",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: LoginResponse }) => response.data,
      invalidatesTags: ["OwnProfile"],
    }),
    becomeVenueManager: builder.mutation<UserObject, string>({
      query: (name) => ({
        url: `holidaze/profiles/${name}`,
        method: "PUT",
        body: { venueManager: true },
      }),
      invalidatesTags: ["OwnProfile"],
    }),
    register: builder.mutation<LoginResponse, RegisterUserObject>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: LoginResponse }) => response.data,
      invalidatesTags: ["OwnProfile"],
    }),
    createVenue: builder.mutation<Venue, VenueFormSchema>({
      query: (body) => ({
        url: "holidaze/venues",
        method: "POST",
        body,
      }),
      invalidatesTags: ["VenueList", "OwnProfile"],
    }),
    updateVenue: builder.mutation<Venue, { venueId: string; body: VenueFormSchema }>({
      query: ({ venueId, body }) => ({
        url: `holidaze/venues/${venueId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Venue", "VenueList", "OwnProfile"],
    }),
    deleteVenue: builder.mutation<Venue, string>({
      query: (venueId) => ({
        url: `holidaze/venues/${venueId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VenueList", "OwnProfile"],
    }),
    getBooking: builder.query<BookingDetailed, string>({
      query: (bookingId) => `holidaze/bookings/${bookingId}?_venue=true&_customer=true`,
      providesTags: ["Booking"],
    }),
    updateBooking: builder.mutation<BookingDetailed, UpdateBooking>({
      query: ({ bookingId, body }) => ({
        url: `holidaze/bookings/${bookingId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Booking", "Venue", "OwnProfile"],
    }),
    deleteBooking: builder.mutation<BookingWithVenue, string>({
      query: (bookingId) => ({
        url: `holidaze/bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking", "OwnProfile"],
    }),
  }),
});

export const {
  useGetVenuesQuery,
  useGetTrendingVenuesQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetVenueByIdQuery,
  useGetOwnProfileQuery,
  useUpdateUserAvatarMutation,
  useBecomeVenueManagerMutation,
  useCreateBookingMutation,
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useDeleteVenueMutation,
  useGetBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = holidazeApi;

