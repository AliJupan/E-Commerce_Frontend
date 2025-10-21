import { useEffect, useState } from "react";

import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { getOrdersByUserId } from "../services/orderService"; // import service
import OrderDetailsDialog from "../components/OrderDetailsDialog";

function OrderHistory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByUserId();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container sx={{ my: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Order History
      </Typography>

      {isMobile ? (
        // Mobile view: cards
        <Stack spacing={2}>
          {orders.map((order) => (
            <Card key={order.id} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" fontWeight={600}>
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body2">Date: {order.createdAt}</Typography>
                <Typography variant="body2">
                  Status: {order.isDelivered}
                </Typography>
                <Typography variant="body2">
                  Total: {order.totalPrice}
                </Typography>
                <Box mt={1}>
                  <Button
                    variant="viewAll"
                    size="small"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </Button>

                  {selectedOrder && (
                    <OrderDetailsDialog
                      order={selectedOrder}
                      open={Boolean(selectedOrder)}
                      onClose={() => setSelectedOrder(null)}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        // Desktop view: table
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#9A9A9A" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Total
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>
                    {order.isDelivered
                      ? "Delivered"
                      : order.isPaid
                      ? "Paid"
                      : "Pending"}
                  </TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="viewAll"
                      size="small"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>

                    {selectedOrder && (
                      <OrderDetailsDialog
                        order={selectedOrder}
                        open={Boolean(selectedOrder)}
                        onClose={() => setSelectedOrder(null)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default OrderHistory;
