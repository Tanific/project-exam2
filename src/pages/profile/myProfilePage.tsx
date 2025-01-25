import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useBecomeVenueManagerMutation, useGetOwnProfileQuery } from "../../api/holidaze";
import { becomeVenueManager as updateVenueManagerStatus } from "../../user/userSlice";
import { updateAvatar } from "../../user/userSlice";
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

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (!isLoggedIn) {
    navigate("/login");
  }

  const { data, isError, error, isLoading } = useGetOwnProfileQuery(user?.name);

  if (isError) {
    console.error(error);
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
    if (data?.avatar != null) {
      dispatch(updateAvatar(data.avatar));
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
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          padding: 2,
        }}
      >
        <Avatar src={user?.avatar} sx={{ width: 100, height: 100 }} />
        <Stack direction="column" spacing={2}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>

        {user?.venueManager === true && (
            <Chip
              label="Venue Manager"
              color="secondary"
              variant="outlined"
            />
        )}

        {user?.venueManager === false && (
          <Button
            variant="contained"
            onClick={handleBecomeVenueManager}
          >
            Become Venue Manager
          </Button>
        )}
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
      >
      </Box>
    </Container>
  );
}
