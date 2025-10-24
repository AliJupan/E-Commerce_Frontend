import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import { getProductById } from "../services/productService.js"; 

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        // Set main image as thumbnail or first image
        const thumbnail = data.pictures.find((p) => p.isThumbnail);
        setMainImage(thumbnail ? thumbnail.url : data.pictures[0]?.url || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  },[id]);

  if (!product) return <Typography>Loading...</Typography>;

  const images = product.pictures.map((p) => p.url);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <Container sx={{ my: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Thumbnails + Main Image */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Box sx={{ width: "90px" }}>
            <Swiper
              direction="vertical"
              spaceBetween={10}
              slidesPerView={3}
              style={{ height: "400px" }}
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${img}`}
                    alt={`thumb-${i}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border:
                        mainImage === img
                          ? "2px solid black"
                          : "1px solid #ccc",
                    }}
                    onClick={() => setMainImage(img)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          <Box sx={{ flex: 1 }}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${mainImage}`}
              alt="main product"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Box>

        {/* Mobile Swiper */}
        <Box sx={{ display: { xs: "block", md: "none" }, width: "100%" }}>
          <Swiper spaceBetween={10} slidesPerView={1} modules={[FreeMode]}>
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${img}`}
                  alt={`product-${i}`}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Product Details */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            {product.name}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ my: 1 }}>
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          {/* Quantity Selector */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <IconButton
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={() => setQuantity((q) => q + 1)} size="small">
              <AddIcon />
            </IconButton>

            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "64px",
                px: 4,
                flex: 1,
                backgroundColor: "black",
                textTransform: "none",
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ my: 4 }}>
        <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)}>
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={tabValue} index={0}>
          {product.description}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          No reviews yet.
        </CustomTabPanel>
      </Box>
    </Container>
  );
}

export default ProductPage;
