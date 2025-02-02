import * as React from "react";
import { Typography, Box } from "@mui/material";

import VenueCard from "../../venue/venue-card";
import { Venue } from "../../../types/venue";
import { VenueListProps } from "../../../types/venue";

export default function VenueList(props: VenueListProps): React.ReactElement {
  const { venues, cardHeadingLevel = 5 } = props;
  console.log(venues);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        padding: 2,
      }}
    >
      {venues.length > 0 ? (
        venues.map((venue: Venue) => (
          <Box
            key={venue.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 300px",
              alignSelf: "center",
              maxWidth: "300px",
              width: "100%",
            }}
          >
            <VenueCard cardHeadingLevel={cardHeadingLevel} {...venue} />
          </Box>
        ))
      ) : (
        <Typography sx={{ color: "white", textAlign: "center", mb: 2 }}>
          No venues to display
        </Typography>
      )}
    </Box>
  );
}
