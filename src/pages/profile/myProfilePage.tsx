import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useBecomeVenueManagerMutation,
  useGetOwnProfileQuery,
} from "../../api/holidaze";
import { becomeVenueManager as updateVenueManagerStatus } from "../../slice/userSlice";
import { updateAvatar } from "../../slice/userSlice";

import UpdateAvatar from "../../components/profile/update-avatar";
import MyBookings from "../../components/profile/my-bookings";
import VenueList from "../../components/profile/my-venues";

import {
  Avatar,
  Container,
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  List,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

export default function MyProfilePage(): React.ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.user);
  const [becomeVenueManager] = useBecomeVenueManagerMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!isLoggedIn) {
    navigate("/login");
  }

  const { data, isError, error, isLoading } = useGetOwnProfileQuery(user?.name);

  if (isError) {
    console.error(error);
  }
  if (data) {
    console.log(data);
  }

  const handleBecomeVenueManager = async () => {
    try {
      await becomeVenueManager(user?.name).unwrap();
      dispatch(updateVenueManagerStatus());
    } catch (error) {
      console.error("Failed to become venue manager:", error);
    }
  };

  React.useEffect(() => {
    if (user?.avatar != null) {
      dispatch(updateAvatar(user?.avatar));
    }
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        flex: 1,
        minWidth: "100vw",
        backgroundColor: "primary.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          padding: 2,
        }}
      >
        <Avatar src={user?.avatar?.url} sx={{ width: 100, height: 100 }} />
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleOpen}
        >
          Update Avatar
        </Button>
        <UpdateAvatar open={open} handleClose={handleClose} name={user.name} />
        <Stack direction="column" spacing={2}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>

          {user?.venueManager === true && (
            <Chip label="Venue Manager" color="secondary" variant="outlined" />
          )}

          {user?.venueManager === false && (
            <Button variant="contained" onClick={handleBecomeVenueManager}>
              Become Venue Manager
            </Button>
          )}
          <Box>
        <Button
          component={Link}
          to="/venues/create"
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Create a Venue
        </Button>
      </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          padding: 2,
        }}
      ></Box>
      <Box component="section" sx={{ padding: 2 }}>
      <Typography variant="h4">My Bookings</Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <MyBookings bookings={data?.bookings || []} />
        )}
      </Box>
      <Box>
        <Typography variant="h4">My Venues</Typography>
        <VenueList venues={data?.venues || []} />
      </Box>
    </Container>
  );
}
