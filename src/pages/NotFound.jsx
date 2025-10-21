// pages/NotFound.jsx
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", my: 10 }}>
      <Box>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Page Not Found
        </Typography>
        <Button
          variant="viewAll"
          onClick={() => navigate("/")}
          sx={{ mt: 3 }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
