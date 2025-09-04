import api from "@/services/api";

// Listar todos os produtos (com paginação)
export async function listProducts(params = {}) {
  const response = await api.get("/v1/products", { params });
  return response.data;
}

// Buscar produto por ID
export async function getProductById(id) {
  const response = await api.get(`/v1/products/${id}`);
  return response.data;
}

// Criar novo produto
export async function createProduct(shopId, productData) {
  const response = await api.post(`/v1/products/${shopId}`, productData);
  return response.data;
}

// Atualizar produto
export async function updateProduct(id, productData) {
  const response = await api.put(`/v1/products/${id}`, productData);
  return response.data;
}

// Deletar produto
export async function deleteProduct(id) {
  const response = await api.delete(`/v1/products/${id}`);
  return response.data;
}