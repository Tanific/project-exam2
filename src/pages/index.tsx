import * as React from "react";
import { useGetTrendingVenuesQuery } from "../api/holidaze";
import VenueCard from "../components/venue/venue-card";
import { Box, Button, Container, Typography, Divider } from "@mui/material";
import homeImage from "../assets/homepage.png";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function HomePage(): React.ReactElement {
  const { data, isLoading } = useGetTrendingVenuesQuery();
  console.log(data);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        background: "linear-gradient(180deg, #262626 0%,rgb(10, 17, 35) 120%)",
        minWidth: "100vw",
        overflow: "hidden",
        padding: 0,
      }}
    >
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 6,
          marginTop: 6,
          marginBottom: 6,
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: "1 1 50%",
            maxWidth: 566,
            minHeight: "30vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            
          }}
        >
          <Typography 
          variant="h1" 
          gutterBottom 
          sx={{ color: "white", fontSize: { xs: "2.3rem", sm: "3.2rem", md: "3.6rem", lg: "5rem" } }}>
            Turn dreams
            <br /> into
            <strong>
              <span style={{ color: "#8E00E0" }}> reality</span>.
            </strong>
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            component="h2"
            sx={{ color: "white", fontWeight: "lighter", fontSize: { xs: "1.4rem", sm: "2.2rem", md: "2.6rem", lg: "3rem" }}}
          >
            Start the journey with <br></br>a simple click
          </Typography>
          <Button
            component={Link}
            to="/venues"
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "secondary.detail",
              fontSize: "1.2rem",
              padding: "1rem 2rem",
              color: "black",
              boxShadow: "0 0 8px #73DE7F",
              maxWidth: "300px",
              height: "48px",
            }}
          >
            Begin journey
          </Button>
        </Box>
        <Box
          sx={{
            flex: "1 1 50%",
            maxWidth: 566,
            maxHeight: 478,
            display: { xs: "none", md: "block" },
            backgroundImage: `url(${homeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 4,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        ></Box>
      </Box>
      <Divider 
        variant="middle" 
        sx={{ 
          borderColor: "#545454", 
          width: "70%", 
          margin: "0 auto" 
        }} 
      />
      <Box
        sx={{
          minWidth: "100vw",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              paddingTop: 6,
              color: "white",
              textAlign: "center",
              fontWeight: "light",
              margin: 5,
              fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2rem"},
            }}
          >
            Feeling adventurous?
            <br />
            Check out our trending venues
          </Typography>
        </Box>
        <Box sx={{ marginTop: 6, marginBottom: 4 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Holidaze <span style={{ color: "#8E00E0" }}>recommends</span>
          </Typography>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                minHeight: "300px",
                alignItems: "center",
              }}
            >
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          ) : (
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
          )}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <Button
              variant="contained"
              component={Link}
              to="/venues"
              sx={{
                width: "auto",
                backgroundColor: "secondary.detail",
                color: "black",
              }}
            >
              VIEW ALL VENUES
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
