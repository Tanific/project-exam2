import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Branding from './branding';
import LoginIcon from '@mui/icons-material/Login'
import { Typography } from '@mui/material';
import { Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'

export default function Navigation() {
    return (
        <AppBar position="static" color="secondary.light">
            <Container>
            <Toolbar disableGutters>
                    <Branding />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button>
                            All Venues
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<LoginIcon />}
                            sx={{
                                backgroundColor: 'secondary.main',
                                '&:hover': { backgroundColor: 'secondary.hover' },
                            }}
                        >
                            Sign in
                            </Button>
                            </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}