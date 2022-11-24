import { Box, Typography, CardContent } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  StyledCard,
  // StyledCardContent
} from "components/Card/StyledCard";

const ChapterSet = () => {
  return (
    <>
      <StyledCard variant="carpet">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "space-between",
            height: "100%",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>15 quizz(es)</Typography>
              <MoreVertIcon />
            </Box>
          </CardContent>
          <Typography variant="h6" noWrap>
            Unnamed chapter Unnamed chapter Unnamed chapter Unnamed chapter
            Unnamed chapter
          </Typography>
        </Box>
      </StyledCard>
    </>
  );
};

export default ChapterSet;
