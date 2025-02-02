import * as React from "react";
import LoginForm from "../../components/forms/login-form";
import { Box, Container } from "@mui/material";
import backgroundImage from "../../assets/login.png";

export default function LoginPage(): React.ReactElement {
  return (
    <Container
      sx={{
        minWidth: "100vw",
        flex: 1,
        alignContent: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
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
