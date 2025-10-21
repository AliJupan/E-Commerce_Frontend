import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Button, Typography, Box, Link } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Bar from "../components/Bar";
import { useAuth } from "../context/authContext"; // import AuthContext

function Login() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const handleLogin = async () => {
    try {
      const data = await login(email, password); // use context login
      if (data.token) {
        navigate("/"); // redirect after login
      }
    } catch (err) {
      setError("Invalid email or password");
    }
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
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Don’t have an account?{" "}
            <Link href="/register" underline="hover" fontWeight={500}>
              Create one
            </Link>
          </Typography>
        </Box>

        {/* Email field */}
        <Box>
          <Typography variant="subtitle2" fontWeight={500} mb={1}>
            Email
          </Typography>
          <Bar
            width="100%"
            showIcon={false}
            color="black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        {/* Password field */}
        <Box>
          <Typography variant="subtitle2" fontWeight={500} mb={1}>
            Password
          </Typography>
          <Bar
            width="100%"
            Icon={showPassword ? VisibilityOff : VisibilityIcon}
            IconColor="secondary"
            color="black"
            backgroundColor="transparent"
            type={showPassword ? "text" : "password"}
            onIconClick={handleTogglePassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        {error && (
          <Typography color="error" variant="body2" textAlign="center">
            {error}
          </Typography>
        )}

        {/* Login button */}
        <Button
          variant="viewAll"
          sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Forgot password */}
        <Box textAlign="center">
          <Link
            href="#"
            underline="hover"
            variant="body2"
            color="text.secondary"
          >
            Forgot your password?
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
