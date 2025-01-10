import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from './themes/default';
import Navigation from './components/layout/header/navigation';

function App() {
  return (
    <>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Navigation />
            {/* Other components */}
        </ThemeProvider>
    </>
  );
}

export default App;
