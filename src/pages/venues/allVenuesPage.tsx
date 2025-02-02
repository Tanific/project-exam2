import * as React from "react";
import { useGetVenuesQuery } from "../../api/holidaze";
import VenueCard from "../../components/venue/venue-card";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from "@mui/material";

export default function VenuesPage(): React.ReactElement {
  const { data, isLoading } = useGetVenuesQuery();
  const [visibleCount, setVisibleCount] = React.useState(12);
  const [searchInput, setSearchInput] = React.useState("");
  const [filters, setFilters] = React.useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const filteredData = data?.filter((venue) => {
    const matchesSearch = venue.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const meta = venue.meta;
    const matchesFilters = Object.keys(filters).every(
      (key) =>
        !filters[key as keyof typeof filters] ||
        (meta && meta[key as keyof typeof meta])
    );
    return matchesSearch && matchesFilters;
  });

  return (
    <Container
      sx={{
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
          All Venues
        </Typography>
        <TextField
          label="Search Venues"
          value={searchInput}
          onChange={handleSearchInputChange}
          variant="outlined"
          sx={{
            marginTop: 2,
            marginBottom: 4,
            width: "50%",
            maxWidth: "800px",
            borderRadius: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
          slotProps={{
            htmlInput: { style: { color: "white", backgroundColor: "#141414" } },
            inputLabel: { style: { color: "white" } },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginBottom: 4,
            color: "white",
            flexWrap: "wrap",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.wifi}
                onChange={handleFilterChange}
                name="wifi"
                style={{ color: "white" }}
              />
            }
            label="WiFi"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.parking}
                onChange={handleFilterChange}
                name="parking"
                style={{ color: "white" }}
              />
            }
            label="Parking"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.breakfast}
                onChange={handleFilterChange}
                name="breakfast"
                style={{ color: "white" }}
              />
            }
            label="Breakfast"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.pets}
                onChange={handleFilterChange}
                name="pets"
                style={{ color: "white" }}
              />
            }
            label="Pets"
          />
        </Box>
      </Box>
      {isLoading ? (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "300px",
    }}
  >
    <CircularProgress sx={{ color: "white" }} />
  </Box>
) : filteredData && filteredData.length > 0 ? (
  <>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 1400,
        margin: "0 auto",
        marginBottom: 4,
      }}
    >
      {filteredData.slice(0, visibleCount).map((venue) => (
        <Box key={venue.id} sx={{ maxWidth: 300, width: "100%" }}>
          <VenueCard {...venue} />
        </Box>
      ))}
    </Box>
    {visibleCount < filteredData.length && (
      <Box sx={{ textAlign: "center", margin: 4 }}>
        <Button
          variant="contained"
          onClick={loadMore}
          sx={{ backgroundColor: "secondary.detail", color: "black" }}
        >
          Load More
        </Button>
      </Box>
    )}
  </>
) : (
  <Typography
    sx={{
      textAlign: "center",
      marginTop: 4,
      color: "white",
      fontSize: 24,
    }}
  >
    No venues match your search criteria
  </Typography>
)}
    </Container>
  );
}