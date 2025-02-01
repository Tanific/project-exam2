import * as React from "react";
import { useGetTrendingVenuesQuery } from "../api/holidaze";
import VenueCard from "../components/venue/venue-card";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage(): React.ReactElement {
  const { data, error, isLoading } = useGetTrendingVenuesQuery();
  console.log(data);

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
          sx={{ paddingTop: 6, color: "white" }}
        >
          Turn dreams into reality
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: "white" }}
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
      <Box sx={{ marginTop: 6, marginBottom: 4 }}>
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ textAlign: "center", color: "white" }}
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
          <Box
            key={venue.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 300px",
              maxWidth: "300px", 
              width: "100%",   
            }}
          >
            <VenueCard {...venue} />
          </Box>
        ))}
          
        </Box>
      </Box>
    </Container>
);
}