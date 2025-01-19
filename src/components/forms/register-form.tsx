import * as React from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../api/holidaze"; 
import { Button, TextField, Typography, Box, Link } from "@mui/material";

export default function RegisterForm(): React.ReactElement {
  const dispatch = useDispatch();
  const [register, { isLoading, isError }] = useRegisterMutation();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async () => {
    try {
      const result = await register({ name, email, password }).unwrap();
    } catch (error) {
      console.error("Failed to register:", error);
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
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{
                color: "primary.main",
            }}>
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
        label="Email"
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
          Failed to register. Please check your details and try again.
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
      <Link href="/login" variant="body2">
        Already have an account? Sign in
      </Link>
    </Box>
  );
}
