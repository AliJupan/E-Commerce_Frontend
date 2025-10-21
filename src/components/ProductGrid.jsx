import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

function ProductGrid({ products = [] }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        mt: 2,
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
      }}
    >
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card
            onClick={() => navigate(`/products/${product.id}`)}
            sx={{
              cursor: "pointer",
              borderRadius: "16px",
              boxShadow: 3,
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.pictures[0]?.url}`}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Box>
  );
}

export default ProductGrid;
