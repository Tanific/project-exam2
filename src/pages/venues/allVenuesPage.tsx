import * as React from "react";
import Navigation from "../../components/layout/header/navigation";
import { useGetVenuesQuery } from "../../api/holidaze";
import VenueCard from "../../components/venue/venue-card";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function VenuesPage(): React.ReactElement {
  const { data, error, isLoading } = useGetVenuesQuery();
  const [visibleCount, setVisibleCount] = React.useState(12);
  const [searchInput, setSearchInput] = React.useState("");

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredData = data?.filter((venue) =>
    venue.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  console.log("Filtered Data:", filteredData);
  return (
    <>
      <Navigation />
      <Container
        sx={{
          backgroundColor: "primary.main",
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ paddingTop: 6, color: "text.primary" }}
          >
            All Venues
          </Typography>
          <TextField
            label="Search Venues"
            variant="outlined"
            value={searchInput}
            onChange={handleSearchInputChange}
            sx={{ marginTop: 2, marginBottom: 4, width: "50%", backgroundColor: "background.paper" }}
            slotProps={{
                input: { style: { color: 'black' } },
            }}
          />
        </Box>
        <Box sx={{ marginTop: 6 }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ textAlign: "center", color: "text.primary" }}
          ></Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              maxWidth: 1400,
              margin: "0 auto",
            }}
          >
            {Array.isArray(filteredData) &&
              filteredData.slice(0, visibleCount).map((venue) => (
                <Box key={venue.id} sx={{ flex: "1 1 300px", maxWidth: "345px" }}>
                  <VenueCard {...venue} />
                </Box>
              ))}
          </Box>
          {filteredData && visibleCount < filteredData.length && (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <Button variant="contained" onClick={loadMore} sx={{ backgroundColor: "secondary.main" }}>
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
}