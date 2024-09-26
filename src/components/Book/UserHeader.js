import React, { useState } from "react";
import { AppBar, Tabs,Tab, Toolbar, Typography, Box, IconButton } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

const UserHeader = () => {  // Correct name
  const [value, setValue] = useState();

  return (
    <AppBar sx={{ backgroundColor: "#3CB371" }} position="sticky">
      <Toolbar>
        {/* Home Button */}
        <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
          <IconButton edge="start" color="inherit" aria-label="home">
            <HomeIcon />
          </IconButton>
        </NavLink>
        
        {/* Box component to center the heading */}
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "black" }}>
            ONLINE BOOK STORE
          </Typography>
        </Box>
        
        <Tabs
          sx={{ ml: "auto" }}
          textColor="inherit"
          indicatorColor="primary"
          value={value}
          onChange={(e, val) => setValue(val)}
        >
          {/* Add Tab items here if needed */}
           <Tab LinkComponent={NavLink} to="/about" label="About" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;  // Correct name

