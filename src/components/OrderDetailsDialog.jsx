import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button
} from "@mui/material";
import { useState } from "react";

function OrderDetailsDialog({ order, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order #{order.id} Details</DialogTitle>
      <DialogContent>
        <List>
          {order.orderDetails.map((detail) => (
            <ListItem key={detail.id}>
              <ListItemText
                primary={`${detail.product.name} (${detail.quantity} × $${detail.price})`}
                secondary={`Category: ${detail.product.category} | Total: $${detail.totalPrice}`}
              />
            </ListItem>
          ))}
        </List>
        {order.invoice && (
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            component="a"
            href={`http://localhost:4500/uploads/${order.invoice.pdfUrl}`}
            target="_blank"
          >
            Download Invoice
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailsDialog;
