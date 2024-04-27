import React from "react";
import ListIcon from "@mui/icons-material/List";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import GroupIcon from '@mui/icons-material/Group';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from "@mui/icons-material/Menu";
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DashBoard from "../pages/dashboard";

export default function Header() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Button >Close</Button>
      <List>
          <ListItem>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon>
               <DashboardCustomizeRoundedIcon/>
              </ListItemIcon>
              <ListItemText primary={"DashBoard"}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/products" >
              <ListItemIcon>
               <ShoppingBagIcon/>
              </ListItemIcon>
              <ListItemText primary={"Products"}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/orders">
              <ListItemIcon>
               <FilterFramesIcon/>
              </ListItemIcon>
              <ListItemText primary={"Orders"}/>
            </ListItemButton>
          </ListItem>
        
      </List>
     
      <Divider />
      <List>
        
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={""} />
            </ListItemButton>
          </ListItem>
    
      </List>
    </Box>
  );

  return (
    <>
    
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toggleDrawer("right", true)}
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search> */}
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer open={state["right"]} onClose={toggleDrawer(false)}>
        {list("right")}
      </Drawer>


      {/* <DashBoard />/ */}

      
    </>
  );
}
