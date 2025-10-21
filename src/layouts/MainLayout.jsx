import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />

      {/* Main content area */}
      <Box
        component="main"
        flex="1"
        sx={{
          mt: { xs: "56px", sm: "64px" }, // 56px on mobile (xs), 64px on sm and up
          width: "100%",
        }}
      >
        <Outlet />
      </Box>

      <Footer/>
    </Box>
  );
}

export default MainLayout;
