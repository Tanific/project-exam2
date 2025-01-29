import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VenuePlaceholder from '../../../assets/VenuePlaceholder.svg'
import { VenueCardProps } from "../../../types/venue";
import { Link } from "react-router-dom";

export default function VenueCard(props: VenueCardProps): React.ReactElement {
  const { id, name, media, price, location, rating, cardHeadingLevel = 5 } = props;
  const imageUrl = media?.[0]?.url ?? VenuePlaceholder;

  return (
    <Card
      key={id}
      component={Link}
      to={`/venues/${id}`}
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={name}
        sx={{ height: 200, 
          width: "100%",
          objectFit: "cover", 
         }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant={`h${cardHeadingLevel}`} component={`h${cardHeadingLevel}`}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="secondary.main"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: { xs: "1rem" },
          }}
        >
          <LocationOnIcon
            sx={{
              color: "secondary.main",
              fontSize: { xs: "20px" },
            }}
          />
          {location ? `${location.city}, ${location.country}` : "Location unavailable"}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          paddingTop: 0,
        }}
      >
        <Rating value={rating} readOnly sx={{ color: "secondary.main" }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            color="primary.dark"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.3rem" },
              padding: 0,
              letterSpacing: "-1%",
              marginTop: 1,
            }}
          >
            kr {price}
          </Typography>
          <Typography
            color="secondary.dark"
            sx={{
              fontSize: { xs: "1rem" },
              padding: 0,
              letterSpacing: "3%",
              fontWeight: "light",
              marginLeft: 1,
              marginTop: 1,
            }}
          >
            /night
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}