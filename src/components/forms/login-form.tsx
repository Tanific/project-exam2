import * as React from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/holidaze";
import { logIn } from "../../user/userSlice";
import { Button, TextField, Typography, Box, Link, collapseClasses } from "@mui/material";

export default function LoginForm(): React.ReactElement {
    const dispatch = useDispatch();
    const [login, { isLoading, isError }] = useLoginMutation();
    
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const handleLogin = async () => {
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(logIn(result));
        } catch (error) {
            console.error("Failed to login:", error);
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
                handleLogin();
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                slotProps={{
                    input: { style: { color: 'black' } },
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
                    input: { style: { color: 'black' } },
                }}
            />
            {isError && (
                <Typography color="error" variant="body2">
                    Failed to login. Please check your credentials and try again.
                </Typography>
            )}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Link href="/register" variant="body2">
                Don't have an account? Register
            </Link>
        </Box>
    );
}