import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Typography,
  Container,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Bar from "../components/Bar";
import ProductGrid from "../components/ProductGrid";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // go to /products with search query
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ isFeatured: true });
        setProducts(data.products);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#282828",
          minHeight: "80vh",
          textAlign: "center",
          color: "white",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Crafting Comfort, Redefining Spaces. Your Home, Your Signature
            Style!
          </Typography>
          <Typography variant="body2" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            fringilla nunc in molestie feugiat. Nunc auctor consectetur elit,
            quis pulvina. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nulla fringilla nunc in molestie feugiat
          </Typography>
          <Bar
            placeholder="Search An Item..."
            width="100%"
            Icon={SearchIcon}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onIconClick={handleSearch} // click on search icon triggers navigation
            type="text"
          />
        </Container>
      </Box>

      {/* Featured Products */}
      <Box sx={{ backgroundColor: "#f5f6fa", py: "5%" }}>
        <Container>
          <Typography variant="h3" fontWeight="bold" mb={3}>
            Featured Products
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <ProductGrid products={products} />
          )}
        </Container>
      </Box>

      {/* Most Popular Products */}
      <Box sx={{ backgroundColor: "#f5f6fa", pb: "5%" }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "none", sm: "space-between" },
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h3">Most Popular Products</Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                borderRadius: "64px",
                textTransform: "none",
              }}
              onClick={() => navigate("/products")}
              endIcon={<NavigateNextOutlinedIcon />}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <ProductGrid products={products} />
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
