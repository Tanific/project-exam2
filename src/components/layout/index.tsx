import * as React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navigation from "./header/navigation";
import Footer from "./footer";

export default function Layout(): React.ReactElement {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation />
      <Box
        component="main"
        id="content"
      >
      </Box>
      <Outlet/>
      <Footer />
    </Box>
  );
}
