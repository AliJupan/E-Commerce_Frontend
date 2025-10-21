import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 50; // flat shipping for demo
  const total = subtotal + shipping;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        my: 3,
        gap: 4,
      }}
    >
      {cart.length > 0 && (
        <>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              alignSelf: { xs: "none", md: "flex-start" },
              overflow: "hidden",
            }}
          >
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid #ddd",
                  p: 2,
                  backgroundColor: "#f9f9f9",
                }}
              >
                {/* Product Image */}
                <Box
                  sx={{
                    minWidth: 100,
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.pictures[0]?.url}`}
                    alt={item.name}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.name}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Item Code: <strong>{item.code}</strong>
                    </Typography>
                  </Box>
                </Box>

                {/* Product Details */}
                {/* <Box sx={{ mx: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Item Code: <strong>{item.code}</strong>
                  </Typography>
                </Box> */}

                {/* Prices & Controls */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    gap: 2,
                  }}
                >
                  <Typography>{item.price.toLocaleString()} MKD</Typography>

                  {/* Quantity Selector */}
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      size="small"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  {/* Total */}
                  <Typography fontWeight="bold">
                    {(item.price * item.quantity).toLocaleString()} MKD
                  </Typography>

                  <IconButton onClick={() => removeFromCart(item.id)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              alignSelf: "flex-start",
              width: { xs: "100%", md: "30%" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#A6A6A6",
                color: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
                p: 3,
              }}
            >
              <Typography variant="h6">Cart Total</Typography>
            </Box>
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
              >
                <Typography>SubTotal</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
              >
                <Typography>Shipping</Typography>
                <Typography>${shipping.toFixed(2)}</Typography>
              </Box>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
              >
                <Typography>Total</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
              {cart.length > 0 && (
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#000000",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "0 0 8px 8px",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                  onClick={() => navigate("/checkout")}
                >
                  <Typography>Proceed To Check Out</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
