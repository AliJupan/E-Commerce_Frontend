import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Box, Link,Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Bar from "../components/Bar";
import { register } from "../services/authService";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill out all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register({
        name: firstName,
        surname: lastName,
        email,
        password,
        address,
        city,
        country,
        postCode: zipcode,
      });

      // Clear the form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAddress("");
      setCity("");
      setCountry("");
      setZipcode("");

      setSuccess("Registration successful! Redirecting to login...");

      // Redirect after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err + " Registration failed. Try again.");
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
            Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link href="/login" underline="hover" fontWeight={500}>
              Login
            </Link>
          </Typography>
        </Box>

        {/* Required fields */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              First Name
            </Typography>
            <Bar
              width="100%"
              showIcon={false}
              color="black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Last Name
            </Typography>
            <Bar
              width="100%"
              showIcon={false}
              color="black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
        </Box>

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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
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

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Confirm Password
            </Typography>
            <Bar
              width="100%"
              Icon={showConfirmPassword ? VisibilityOff : VisibilityIcon}
              IconColor="secondary"
              color="black"
              backgroundColor="transparent"
              type={showConfirmPassword ? "text" : "password"}
              onIconClick={handleToggleConfirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
        </Box>
        {/* Optional fields */}
        <Typography
          variant="subtitle2"
          fontWeight={500}
          color="text.secondary"
          mt={1}
        >
          Optional Information
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Country
            </Typography>
            <Bar
              width="100%"
              showIcon={false}
              color="black"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Address
            </Typography>
            <Bar
              width="100%"
              showIcon={false}
              color="black"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              City
            </Typography>
            <Bar
              width="100%"
              showIcon={false}
              color="black"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={500} mb={1}>
              Zip Code
            </Typography>
            <Bar
              width="100%"
              showIcon={false}
              color="black"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </Box>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 1 }}>
            {success}
          </Alert>
        )}

        {/* Register button */}
        <Button
          variant="viewAll"
          sx={{ mt: 2, py: 1.5, fontWeight: 600 }}
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
