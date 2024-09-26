import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
        // LinkComponent={Link}: Specifies that the button should be a link component. This is used with the Link component from react-router-dom to handle navigation without reloading the page.
//to="/books": Defines the route to navigate to when the button is clicked. In this case, it navigates to the /books route.
          LinkComponent={Link}
          to="/books"
          sx={{ marginTop: 15, background: "orangered" }}
          variant="contained"
        >
          <Typography variant="h3">View All products</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Home;
