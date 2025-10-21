import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
    background: { default: "#f9f9f9" },
  },
  typography: {
    fontFamily: "Oxygen, Arial, sans-serif",
    h1: { fontWeight: 700, fontSize: "3rem" },
    h2: { fontWeight: 700, fontSize: "2.25rem" },
    h3: { fontWeight: 700, fontSize: "1.75rem" },
    h4: { fontWeight: 400, fontSize: "1.5rem" },
    h6: { fontWeight: 400, fontSize: "1.375rem" },
    body1: { fontWeight: 400, fontSize: "1rem" },
    body2: { fontWeight: 300, fontSize: "0.875rem" },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "viewAll" }, // 👈 custom variant
          style: {
            backgroundColor: "black",
            borderRadius: "64px",
            textTransform: "none",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          },
        },
      ],
    },
  },
});

export default theme;
