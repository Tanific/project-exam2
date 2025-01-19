import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Branding from "./branding";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
} from "@mui/material";

export default function Navigation() {
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
            to="/" sx={{ fontWeight: "bold" }}>All Venues</Button>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
