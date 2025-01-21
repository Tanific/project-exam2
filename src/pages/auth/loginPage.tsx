import * as React from "react";
import Navigation from "../../components/layout/header/navigation";
import LoginForm from "../../components/forms/login-form";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function LoginPage(): React.ReactElement {
  return (
    <Container
      sx={{
        minWidth: "100vw",
        flex: 1,
        alignContent: "center",
      }}
    >
      <Box sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}>
        <LoginForm />
      </Box>
    </Container>
  );
}
