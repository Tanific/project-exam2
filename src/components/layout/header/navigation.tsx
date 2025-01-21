import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Branding from "./branding";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { logout } from "../../../user/userSlice";

export default function Navigation() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "secondary.light",
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Branding />
          <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/venues"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              All Venues
            </Button>
            {isLoggedIn ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                  sx={{ color: "primary.main" }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleMenuClose}
                    sx={{ color: "black" }}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "black" }}>
                    Log Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                endIcon={<LoginIcon />}
                sx={{
                  backgroundColor: "secondary.main",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "secondary.hover" },
                }}
              >
                Sign in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
