import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useBecomeVenueManagerMutation,
  useGetOwnProfileQuery,
} from "../../api/holidaze";
import { becomeVenueManager as updateVenueManagerStatus } from "../../slice/userSlice";
import UpdateAvatar from "../../components/profile/update-avatar";
import MyBookings from "../../components/profile/my-bookings";
import VenueList from "../../components/profile/my-venues";
import {
  Avatar,
  Container,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  Alert,
  Divider,
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

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 4,
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
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            padding: 2,
          }}
        >
          <Avatar
            src={user?.avatar?.url}
            sx={{ width: { xs: 100, md: 200 }, height: { xs: 100, md: 200 } }}
          />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleOpen}
            style={{ borderColor: "#8E00E0", color: "white" }}
          >
            Update Avatar
          </Button>
        </Box>
        <UpdateAvatar open={open} handleClose={handleClose} name={user.name} />
        <Stack direction="column" spacing={2} alignSelf="center">
          <Typography variant="h4" color="white">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="white">
            {user.email}
          </Typography>

          {user?.venueManager === true && (
            <Chip
              label="Venue Manager"
              variant="outlined"
              style={{ borderColor: "#42B34E", color: "white" }}
            />
          )}

          {user?.venueManager === false && (
            <Button
              variant="contained"
              style={{ backgroundColor: "#42B34E", color: "black" }}
              onClick={handleBecomeVenueManager}
            >
              Become Venue Manager
            </Button>
          )}
          {user?.venueManager === true && (
          <Button
            component={Link}
            to="/venues/create"
            variant="contained"
            style={{ backgroundColor: "#42B34E", color: "black" }}
            startIcon={<AddIcon />}
          >
            Create a Venue
          </Button>
          )}
        </Stack>
        
      </Box>
      <Divider 
        variant="middle" 
        sx={{ 
          borderColor: "#545454", 
          width: "50%", 
          margin: "0 auto" 
        }} 
      />
      <Typography
        variant="h4"
        sx={{ color: "white", padding: 2, textAlign: "center", margin: 2 }}
      >
        My Bookings
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <MyBookings bookings={data?.bookings || []} />
      )}
      <Divider 
        variant="middle" 
        sx={{ 
          borderColor: "#545454", 
          width: "50%", 
          margin: "0 auto"
        }} 
      />
      <Typography
        variant="h4"
        sx={{ color: "white", padding: 2, textAlign: "center" }}
      >
        My Venues
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <VenueList venues={data?.venues || []} />
      )}
    </Container>
  );
}
