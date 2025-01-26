import * as React from "react";
import { Typography, Box } from "@mui/material";

import VenueCard from "../../venue/venue-card";
import { Venue } from "../../../types/venue";
import { VenueListProps } from "../../../types/venue";

export default function VenueList(props: VenueListProps): React.ReactElement {
  const { venues, cardHeadingLevel = 4 } = props;
  console.log(venues)

  return (
    <Box
      component="ul"
      sx={{
        listStyleType: "none",
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {venues.length > 0 ? (
        venues.map((venue: Venue) => (
          <Box component="li" key={venue.id} sx={{ flex: "1 1 300px" }}>
            <VenueCard cardHeadingLevel={cardHeadingLevel} {...venue} />
          </Box>
        ))
      ) : (
        <Typography variant="h5" component="p">
          No venues to display
        </Typography>
      )}
    </Box>
  );
}
