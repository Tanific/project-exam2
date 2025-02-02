import * as React from "react";
import { useRegisterMutation } from "../../api/holidaze";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm(): React.ReactElement {
  const navigate = useNavigate();
  const [register, { isLoading, isError }] = useRegisterMutation();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [registerError, setRegisterError] = React.useState<string>("");

  const handleRegister = async () => {
    try {
      const result = await register({ name, email, password }).unwrap();
      navigate("/login");
      console.log(result);
    } catch (error) {
      const errorMessage = (error as any)?.data?.errors?.[0]?.message;
      console.error(error);
      setRegisterError(errorMessage);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
        backgroundColor: "white",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          color: "primary.main",
        }}
      >
        Register
      </Typography>
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        slotProps={{
          input: { style: { color: "black" } },
        }}
      />
      <TextField
        label="Noroff Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        slotProps={{
          input: { style: { color: "black" } },
        }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        slotProps={{
          input: { style: { color: "black" } },
        }}
      />
      {isError && (
        <Typography color="error" variant="body2">
          {registerError}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
        }}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
      <Button
        component={Link}
        to="/login"
        sx={{ color: "secondary.main", textDecoration: "underline" }}
      >
        Already have an account? Sign in
      </Button>
    </Box>
  );
}
