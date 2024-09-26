import { Box, Typography } from "@mui/material"; // Box and Typography are components provided by the Material-UI (MUI) library, a popular React component library for implementing Material Design
import React from "react";

const About = () => {
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography sx={{ fontFamily: "fantasy" }} variant="h2">
          This is a CRUD Application
        </Typography>
        <Typography sx={{ fontFamily: "fantasy" }} variant="h3">
          By MERN STACK
        </Typography>
      </Box>
    </div>
  );
};

export default About;
