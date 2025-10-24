import api from "./api";

// 🔹 Register
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// 🔹 Login
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const getProfile = async (id) => {
  const { data } = await api.get(`/auth/profile/me`);
  return data;
};
// 🔹 Forgot password (sends reset link to email)
export const forgotPassword = async (email) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};

// 🔹 Reset password (requires valid token + new password)
export const resetPassword = async (passwordData) => {
  const { data } = await api.put("/auth/reset-password", passwordData);
  return data;
};

// 🔹 Change password (old + new password, backend uses token to verify)
export const changePassword = async (passwordData) => {
  const { data } = await api.put("/auth/change-password", passwordData);
  return data;
};
