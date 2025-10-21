import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/authContext";

import { createOrder } from "../services/orderService";
import { getProfile } from "../services/authService";

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const { user } = useAuth();

  const [tab, setTab] = useState("1");
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const [loadingUser, setLoadingUser] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    country: "",
    zip: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const total = subtotal + shipping;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        setLoadingUser(true);
        try {
          const profile = await getProfile(user.id);
          
          setFormData((prev) => ({
            ...prev,
            firstName: profile.name || "",
            lastName: profile.surname || "",
            email: profile.email || "",
            street: profile.address || "",
            city: profile.city || "",
            country: profile.country || "",
            zip: profile.postal_code || "",
          }));
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        } finally {
          setLoadingUser(false);
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  const handleConfirmOrder = async () => {
    const orderData = {
      userId: user && user.id ? Number(user.id) : null,
      name: formData.firstName,
      surname: formData.lastName,
      email: formData.email,
      country: formData.country,
      city: formData.city,
      postalCode: formData.zip,
      address: formData.street,
      cardLast4: formData.cardNumber.slice(-4), // only last 4 digits
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await createOrder(orderData); // send order to backend
      setOpenModal(true); // show confirmation modal
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loadingUser) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          my: 2,
          gap: 4,
        }}
      >
        {/* Left Side - Tabs */}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            flex: 1,
            overflow: "hidden",
          }}
        >
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(e, val) => setTab(val)}
                variant="fullWidth"
                textColor="inherit"
                TabIndicatorProps={{ style: { backgroundColor: "white" } }}
                sx={{
                  backgroundColor: "#A6A6A6",
                  color: "white",
                  fontSize: "1.375rem",
                  p: 2,
                }}
              >
                <Tab label="Personal" value="1" />
                <Tab label="Billing" value="2" />
                <Tab label="Confirmation" value="3" />
              </TabList>
            </Box>

            {/* Personal */}
            <TabPanel value="1">
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  name="firstName"
                  label="First Name*"
                  size="small"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <TextField
                  name="lastName"
                  label="Last Name*"
                  size="small"
                  fullWidth
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  name="email"
                  label="Email Address*"
                  size="small"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  name="phone"
                  label="Phone Number*"
                  size="small"
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Box>
              <TextField
                name="street"
                label="Street Address*"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.street}
                onChange={handleChange}
              />
              <TextField
                name="city"
                label="Town/City*"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.city}
                onChange={handleChange}
              />
              <TextField
                name="country"
                label="Country*"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.country}
                onChange={handleChange}
              />
              <TextField
                name="zip"
                label="PostCode/Zip*"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.zip}
                onChange={handleChange}
              />

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  backgroundColor: "black",
                  borderRadius: "64px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#333" },
                }}
                onClick={() => setTab("2")}
              >
                Proceed to Billing
              </Button>
            </TabPanel>

            {/* Billing */}
            <TabPanel value="2">
              <TextField
                name="cardNumber"
                label="Card Number"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <TextField
                name="cardHolder"
                label="Card Holder Name"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.cardHolder}
                onChange={handleChange}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  name="expiry"
                  label="Expiry Date"
                  size="small"
                  fullWidth
                  value={formData.expiry}
                  onChange={handleChange}
                />
                <TextField
                  name="cvv"
                  label="CVV"
                  size="small"
                  fullWidth
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  backgroundColor: "black",
                  borderRadius: "64px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#333" },
                }}
                onClick={() => setTab("3")}
              >
                Proceed to Confirmation
              </Button>
            </TabPanel>

            {/* Confirmation */}
            <TabPanel value="3">
              <Typography variant="h6" gutterBottom>
                Confirm Your Order
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Please review your details and confirm to place the order.
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography fontWeight="bold">Personal Info</Typography>
                <Typography>
                  {formData.firstName} {formData.lastName}
                </Typography>
                <Typography>{formData.email}</Typography>
                <Typography>{formData.phone}</Typography>
                <Typography>
                  {formData.street}, {formData.city}, {formData.country}{" "}
                  {formData.zip}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography fontWeight="bold">Billing Info</Typography>
                <Typography>Card Holder: {formData.cardHolder}</Typography>
                <Typography>
                  Card Number: **** **** **** {formData.cardNumber.slice(-4)}
                </Typography>
                <Typography>Expiry: {formData.expiry}</Typography>
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  backgroundColor: "black",
                  borderRadius: "64px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#333" },
                }}
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </Button>
            </TabPanel>
          </TabContext>
        </Box>

        {/* Right Side - Cart Details */}
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            alignSelf: "flex-start",
            width: { xs: "100%", md: "40%" },
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
            <Typography variant="h6">Cart Details</Typography>
          </Box>
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      SubTotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">
                        ${item.price * item.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
          </Box>
        </Box>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>🎉 Order Confirmed!</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Thank you {formData.firstName}, your order has been placed
            successfully.
          </Typography>
          <Typography gutterBottom>
            A confirmation email has been sent to {formData.email}.
          </Typography>
          <Typography>Total Paid: ${total.toFixed(2)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false);
              navigate("/"); // Redirect to home
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Checkout;
