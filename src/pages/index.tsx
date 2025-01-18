import * as React from "react";
import Navigation from "../components/layout/header/navigation";
import { useGetTrendingVenuesQuery } from "../api/holidaze";
import VenueCard from "../components/venue/venue-card";
import { Box, Button, Container, Typography } from "@mui/material";

export default function HomePage(): React.ReactElement {
  const { data, error, isLoading } = useGetTrendingVenuesQuery();
  
  return (
    <>
      <Navigation />
      <Container sx={{ backgroundColor: "primary.main", minHeight: "100vh", minWidth: "100vw" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ paddingTop: 6, color: "text.primary" }}>
            Turn dreams into reality
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: "text.primary"}}>
            Start the journey with a simple click
          </Typography>
          <Button variant="contained" sx={{ marginTop: 2, backgroundColor: "secondary.detail" }}>
            Chase your dreams
          </Button>
        </Box>
        <Box sx={{ marginTop: 6 }}>
          <Typography variant="h4" component="h3" gutterBottom sx={{ textAlign: "center", color: "text.primary" }}>
            Holidaze <span style={{ color: "#8E00E0" }}>recommends</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {Array.isArray(data) &&
              data.map((venue) => (
                <Box key={venue.id} sx={{ flex: "1 1 300px", maxWidth: "345px" }}>
                  <VenueCard {...venue} />
                </Box>
              ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}