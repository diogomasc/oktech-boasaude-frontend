import api from './api';

// Buscar todos os endereços do usuário logado
export const getUserAddresses = async () => {
  try {
    const response = await api.get('/v1/addresses/me');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar endereços:', error);
    throw error;
  }
};

// Buscar um endereço específico por ID
export const getAddressById = async (addressId) => {
  try {
    const response = await api.get(`/v1/addresses/${addressId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    throw error;
  }
};

// Criar um novo endereço
export const createAddress = async (addressData) => {
  try {
    const response = await api.post('/v1/addresses', addressData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar endereço:', error);
    throw error;
  }
};

// Deletar um endereço
export const deleteAddress = async (addressId) => {
  try {
    const response = await api.delete(`/v1/addresses/${addressId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar endereço:', error);
    throw error;
  }
};