import { useState } from "react";
import { Container, Button, Typography, Box, Link } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Bar from "../components/Bar";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Box
        sx={{
          border: "1px solid #DEDFE1",
          p: 4,
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "white",
        }}
      >
        {/* Header */}
        <Box textAlign="center">
          <Typography variant="h5" fontWeight={600}>
            Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link href="#" underline="hover" fontWeight={500}>
              Login
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Name
            </Typography>
            <Bar
              placeholder="John"
              width="100%"
              showIcon={false}
              color="black"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Surname
            </Typography>
            <Bar
              placeholder="Doe"
              width="100%"
              showIcon={false}
              color="black"
            />
          </Box>
        </Box>

        {/* Email field */}
        <Box>
          <Typography variant="subtitle2" fontWeight={500} mb={1}>
            Email
          </Typography>
          <Bar
            placeholder="johndoe@mail.com"
            width="100%"
            showIcon={false}
            color="black"
          />
        </Box>

        {/* Password field */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Password
            </Typography>
            <Bar
              placeholder="••••••••"
              width="100%"
              Icon={showPassword ? VisibilityOff : VisibilityIcon}
              IconColor="secondary"
              color="black"
              backgroundColor="transparent"
              type={showPassword ? "text" : "password"}
              onIconClick={() => setShowPassword((prev) => !prev)}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Confirm Password
            </Typography>
            <Bar
              placeholder="••••••••"
              width="100%"
              Icon={showConfirmPassword ? VisibilityOff : VisibilityIcon}
              IconColor="secondary"
              color="black"
              backgroundColor="transparent"
              type={showConfirmPassword ? "text" : "password"}
              onIconClick={() => setShowConfirmPassword((prev) => !prev)}
            />
          </Box>
        </Box>

        {/* Login button */}
        <Button variant="viewAll" sx={{ mt: 2, py: 1.5, fontWeight: 600 }}>
          Create Account
        </Button>
      </Box>
    </Container>
  );
}

export default SignUp;
