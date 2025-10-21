import api from "./api";

export const getProducts = async (filters = {}) => {
  const {
    page = 1,
    limit = 6,
    minPrice,
    maxPrice,
    category,
    search,
    isFeatured,
  } = filters;

  const { data } = await api.get("/products", {
    params: {
      page,
      limit,
      minPrice,
      maxPrice,
      category,
      search,
      isFeatured,
    },
  });

  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (productData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
