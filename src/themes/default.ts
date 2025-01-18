import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#262626",
            dark: "#030711",
        },
        secondary: {
            main: "#8E00E0",
            detail: "#42B34E",
            light: "#F0F0F0",
            dark: "#8C9098",
            hover: "#7A00B3",
        },
        text: {
            primary: "#FFFFFF",
        },
    },
    typography: {
        fontFamily: '"Outfit", sans-serif',
    },
    
})

export default defaultTheme;