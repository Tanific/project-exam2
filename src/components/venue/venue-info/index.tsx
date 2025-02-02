import * as React from "react";
import { VenueInfoProps } from "../../../types/venue";
import { Badge, Rating, Stack, Tooltip } from "@mui/material";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import BakeryDiningOutlinedIcon from "@mui/icons-material/BakeryDiningOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function VenueInfo(props: VenueInfoProps): React.ReactElement {
  const { wifi, pets, breakfast, parking, maxGuests, rating } = props;

  return (
    <Stack
      spacing={3}
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
      paddingBlock={2}
      marginBlockEnd={1}
    >
     <Stack spacing={1} direction={"row"} alignItems="center">
        <Rating
          size="large"
          value={rating}
          readOnly
          sx={{ color: "gold" }}
          emptyIcon={<StarBorderIcon style={{ color: "gold", fontSize:"inherit", fontWeight:"lighter" }} />}
        />
      </Stack>
      <Stack spacing={3} direction={"row"}>
        <Tooltip title={`Maximum ${maxGuests} guests`}>
          <Badge badgeContent={maxGuests} color="primary">
            <PeopleOutlinedIcon />
          </Badge>
        </Tooltip>
        {wifi && (
          <Tooltip title={"Has Wifi"}>
            <WifiOutlinedIcon />
          </Tooltip>
        )}
        {pets && (
          <Tooltip title={"Pets allowed"}>
            <PetsOutlinedIcon />
          </Tooltip>
        )}
        {parking && (
          <Tooltip title={"Parking available"}>
            <LocalParkingOutlinedIcon />
          </Tooltip>
        )}
        {breakfast && (
          <Tooltip title={"Breakfast included"}>
            <BakeryDiningOutlinedIcon />
          </Tooltip>
        )}
      </Stack>
    </Stack>
  );
}
