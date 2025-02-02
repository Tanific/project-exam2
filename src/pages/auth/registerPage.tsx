import * as React from "react";
import RegisterForm from "../../components/forms/register-form";
import { Box, Container } from "@mui/material";
import backgroundImage from "../../assets/login.png";

export default function RegisterPage(): React.ReactElement {
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
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <RegisterForm />
      </Box>
    </Container>
  );
}
