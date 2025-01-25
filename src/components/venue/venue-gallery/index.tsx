import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import VenuePlaceholder from "../../../assets/VenuePlaceholder.svg";
import { ImageGallery } from "../../../types/venue";



export default function VenueGallery(props: ImageGallery) {
  const { images } = props;
  const [currentImage, setCurrentImage] = React.useState<number>(0);

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <Box sx={{ padding: 1 }}>
      <img
        src={images[currentImage]?.url ?? VenuePlaceholder}
        alt={images[currentImage]?.alt ?? ""}
        style={{
          objectFit: "contain",
          display: "block",
          width: "100%",
          maxHeight: "380px",
        }}
      />
      {images.length > 1 && (
        <Box paddingBlock={1}>
          <ImageList
            cols={3}
            rowHeight={130}
            variant="quilted"
            sx={{ gridTemplateColumns: "repeat(3, auto)" }}
          >
            {images.map((image, index) => (
              <ImageListItem
                key={index}
                sx={{ cursor: "pointer" }}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </Box>
  );
}
