import * as React from "react";
import Navigation from "../../components/layout/header/navigation";
import LoginForm from "../../components/forms/login-form";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function LoginPage(): React.ReactElement {
  return (
    <>
      <Navigation />
        <LoginForm />
    </>
  );
}