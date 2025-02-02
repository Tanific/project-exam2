import * as React from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/holidaze";
import { logIn } from "../../slice/userSlice";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm(): React.ReactElement {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError }] = useLoginMutation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginError, setLoginError] = React.useState<string>("");

  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(logIn(result));
      navigate("/");
    } catch (error) {
      const errorMessage = (error as any)?.data?.errors?.[0]?.message;
      console.error(error);
      setLoginError(errorMessage);
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
        handleLogin();
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
        Login
      </Typography>
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
          {loginError}
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
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <Button
        component={Link}
        to="/register"
        sx={{ color: "secondary.main", textDecoration: "underline" }}
      >
        Don't have an account? Register here
      </Button>
    </Box>
  );
}
