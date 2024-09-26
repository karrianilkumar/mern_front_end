import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Ensure HomeIcon is imported
import { NavLink } from "react-router-dom"; // The NavLink component from "react-router-dom" is used to create navigation links in your React application. 

const Header = () => {
  const [value, setValue] = useState();
  
  return (
    <AppBar sx={{ backgroundColor: "#3CB371" }} position="sticky">
      <Toolbar>
        {/* Home Button styled like YouTube */}
        <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
          <IconButton edge="start" color="inherit" aria-label="home" sx={{ marginRight: 2 }}>
            <HomeIcon sx={{ fontSize: 30 }} /> {/* Adjust fontSize as needed */}
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
          <Tab LinkComponent={NavLink} to="/books" label="Books" />
          <Tab LinkComponent={NavLink} to="/about" label="About Us" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

