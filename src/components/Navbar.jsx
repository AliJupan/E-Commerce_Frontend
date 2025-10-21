import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  AppBar,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";

import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/authContext"; // import auth context

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Contact Us", path: "/contact" },
];

function DrawerAppBar(props) {
  const navigate = useNavigate();

  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth(); // get auth info

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Container>
        <Typography variant="h6" sx={{ my: 2 }}>
          MUI Phone
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ boxShadow: 0, backgroundColor: "#282828" }}>
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  sx={{ color: "#fff" }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <PersonIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {isAuthenticated
                  ? [
                      <MenuItem
                        key="profile"
                        onClick={() => navigate("/profile")}
                      >
                        <AccountCircleIcon /> Profile
                      </MenuItem>,
                      <MenuItem
                        key="history"
                        onClick={() => navigate("/order-history")}
                      >
                        <HistoryIcon /> Order History
                      </MenuItem>,
                      <Divider key="divider" />,
                      <MenuItem
                        key="logout"
                        onClick={() => {
                          logout();
                          navigate("/login");
                        }}
                      >
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>,
                    ]
                  : [
                      <MenuItem key="login" onClick={() => navigate("/login")}>
                        Login
                      </MenuItem>,
                    ]}
              </Menu>
              <IconButton onClick={() => navigate("/cart")}>
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingBagIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
