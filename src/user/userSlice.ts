import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse, UserState } from "../types/user";

const initialState: UserState = {
  isLoggedIn: false,
  accessToken: "",
  user: {
    id: "",
    name: "",
    email: "",
    avatar: "",
    venueManager: false,
  },
};

function loadState(): UserState | undefined {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

function saveState(state: UserState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("user", serializedState);
  } catch (e) {
    console.error(e);
  }
}

function clearState(): void {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.error(e);
  }
}

export const userSlice = createSlice({
  name: "user",
  initialState: loadState() || initialState,
  reducers: {
    logIn: (state, action: PayloadAction<LoginResponse>) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload;
      saveState(state);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.user = initialState.user;
      clearState();
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      state.user.avatar = action.payload;
      saveState(state);
    },
    becomeVenueManager: (state) => {
      state.user.venueManager = true;
      saveState(state);
    },
  },
});

export const { logIn, logout, updateAvatar, becomeVenueManager } =
  userSlice.actions;

export default userSlice.reducer;
