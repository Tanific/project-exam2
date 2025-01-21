import * as React from "react";
import { useGetTrendingVenuesQuery } from "../api/holidaze";
import VenueCard from "../components/venue/venue-card";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage(): React.ReactElement {
  const { data, error, isLoading } = useGetTrendingVenuesQuery();

  return (
      <Container
        maxWidth="lg"
        sx={{
          padding: 2,
          backgroundColor: "primary.main",
          minWidth: "100vw",
          flex: 1,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ paddingTop: 6, color: "text.primary" }}
          >
            Turn dreams into reality
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Start the journey with a simple click
          </Typography>
          <Button
            component={Link}
            to="/venues"
            variant="contained"
            sx={{ marginTop: 2, backgroundColor: "secondary.detail" }}
          >
            Chase your dreams
          </Button>
        </Box>
        <Box sx={{ marginTop: 6 }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ textAlign: "center", color: "text.primary" }}
          >
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
            {data?.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </Box>
        </Box>
      </Container>
  );
}