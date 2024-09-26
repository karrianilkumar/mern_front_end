import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, Box } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  
  return (
    <div>
      <AppBar sx={{ backgroundColor: "#3CB371" }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: "white" }}>
            <Typography>
              <LibraryBooksOutlinedIcon />
            </Typography>
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
    </div>
  );
};

export default Header;

