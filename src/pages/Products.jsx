import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Slider,
  Divider,
  Button,
  Drawer,
  Pagination,
} from "@mui/material";
import ProductGrid from "../components/ProductGrid";
import Bar from "../components/Bar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { getProducts } from "../services/productService";

function valuetext(value) {
  return `${value}$`;
}

function Products() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0, 100]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);
  const handleChange = (event, newValue) => setValue(newValue);
  const handlePageChange = (event, value) => setPage(value);
  const handleCategoryChange = (category) => setSelectedCategory(category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({
          page,
          limit: itemsPerPage,
          minPrice: value[0],
          maxPrice: value[1],
          category: selectedCategory || undefined,
          search: searchTerm || undefined, // 👈 send search
        });
        setProducts(data.products);
        setTotal(data.pagination.total);

        if (data.filters) {
          setPriceRange([data.filters.min, data.filters.max]);

          if (value[0] === 0 && value[1] === 100) {
            setValue([data.filters.min, data.filters.max]);
          }
          if (data.filters.categories) {
            setCategories(data.filters.categories);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, value, selectedCategory, searchTerm]); // 👈 re-run when search changes

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <Container sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: "250px",
            flexShrink: 0,
            border: "1px solid #ddd",
            borderRadius: "8px",
            height: "fit-content",
            display: { xs: "none", md: "block" },
          }}
        >
          <Box sx={{ width: 250, p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              onClick={() => handleCategoryChange("")}
              sx={{
                cursor: "pointer",
                fontWeight: selectedCategory === "" ? "bold" : "normal",
              }}
            >
              Categories
            </Typography>
            {categories.map((cat) => (
              <Typography
                key={cat}
                variant="body2"
                sx={{
                  cursor: "pointer",
                  fontWeight: selectedCategory === cat ? "bold" : "normal",
                }}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Price Range
            </Typography>
            <Slider
              getAriaLabel={() => "Price range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={priceRange[0]}
              max={priceRange[1]}
            />
          </Box>
        </Box>

        {/* Products */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h3">Our Collection Of Products</Typography>

          {/* Mobile Filter Button */}
          <Button
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              backgroundColor: "black",
              borderRadius: "64px",
              textTransform: "none",
            }}
            variant="contained"
            endIcon={<TuneIcon />}
          >
            Filter
          </Button>

          {/* Drawer */}
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250, p: 2 }}>
              {/* Categories inside drawer */}
              <Typography
                variant="h6"
                gutterBottom
                onClick={() => handleCategoryChange("")}
                sx={{
                  cursor: "pointer",
                  fontWeight: selectedCategory === "" ? "bold" : "normal",
                }}
              >
                Categories
              </Typography>
              {categories.map((cat) => (
                <Typography
                  key={cat}
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    fontWeight: selectedCategory === cat ? "bold" : "normal",
                  }}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </Typography>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Price Range
              </Typography>
              <Slider
                getAriaLabel={() => "Price range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={priceRange[0]}
                max={priceRange[1]}
              />
            </Box>
          </Drawer>

          {/* 🔎 Search Bar */}
          <Bar
            placeholder="Search An Item..."
            width="100%"
            Icon={SearchIcon}
            color="black"
            value={searchTerm}
            onChange={(e) => {
              setPage(1); // reset to first page when searching
              setSearchTerm(e.target.value);
            }}
          />

          {loading ? (
            <Typography>Loading products...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <ProductGrid products={products} />
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={Math.ceil(total / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Products;
