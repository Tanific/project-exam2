import * as React from "react";
import Navigation from "../../components/layout/header/navigation";
import RegisterForm from "../../components/forms/register-form";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function RegisterPage(): React.ReactElement {
  return (
    <>
      <Navigation />
        <RegisterForm />
    </>
  );
}