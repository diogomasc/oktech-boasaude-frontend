import api from "@/services/api";

// Criar pedido - payload: [{ quantity: number, productId: string }]
export async function createOrder(payload) {
  const response = await api.post("/v1/orders", payload);
  return response.data;
}

// Finalizar compra com status
export async function completeOrder(orderId, status = "COMPLETED") {
  const response = await api.post(`/v1/orders/buy/${orderId}/${status}`);
  return response.data;
}

// Listar pedidos com paginação
export async function getOrders(page = 0, size = 10, sort = []) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());
  
  if (sort.length > 0) {
    sort.forEach(s => params.append('sort', s));
  }
  
  const response = await api.get(`/v1/orders?${params.toString()}`);
  return response.data;
}

// Obter itens vendidos
export async function getSoldItems() {
  const response = await api.get("/v1/orders/items/sold");
  return response.data;
}


