import { Box, Container, Divider, Typography } from "@mui/material";
import Logo from "../assets/logo-70.svg";
import Bar from "./Bar";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#282828" }}>
      <Container sx={{ marginY: "50px" }} maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginY: "80px",
          }}
        >
          <img src={Logo} style={{ width: "150px" }} />
          <Typography variant="h3" sx={{ marginY: "50px", color: "white" }}>
            Subscribe To Your Newsletter to Stay Updated About Discounts
          </Typography>
          <Bar
            placeholder={"person@mail.com"}
            Icon={NavigateNextOutlinedIcon}
            width={"70%"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: { xs: "wrap", sm: "nowrap" },
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body1"
              sx={{
                color: "#9A9A9A",
                marginBottom: "30px",
                marginTop: { xs: "30px", sm: "0px" },
              }}
            >
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body1"
              sx={{
                color: "#9A9A9A",
                marginBottom: "30px",
                marginTop: { xs: "30px", sm: "0px" },
              }}
            >
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body1"
              sx={{
                color: "#9A9A9A",
                marginBottom: "30px",
                marginTop: { xs: "30px", sm: "0px" },
              }}
            >
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body1"
              sx={{
                color: "#9A9A9A",
                marginBottom: "30px",
                marginTop: { xs: "30px", sm: "0px" },
              }}
            >
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body1"
              sx={{
                color: "#9A9A9A",
                marginBottom: "30px",
                marginTop: { xs: "30px", sm: "0px" },
              }}
            >
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              Products
            </Typography>
          </Box>
        </Box>
      </Container>
      <Divider sx={{ borderColor: "white" }} />
      <Typography sx={{ textAlign: "center", color: "white", padding: "20px" }}>
        Copyright © 2023 Renew Bariatrics, Inc
      </Typography>
    </Box>
  );
}

export default Footer;
