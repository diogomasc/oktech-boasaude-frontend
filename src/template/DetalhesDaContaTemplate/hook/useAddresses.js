import { useState, useEffect } from 'react';
import { getUserAddresses, createAddress, deleteAddress } from '@/services/addresses';

export function useAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Buscar endereços do usuário
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserAddresses();
      setAddresses(data);
    } catch (err) {
      console.error('Erro ao buscar endereços:', err);
      setError('Erro ao carregar endereços');
    } finally {
      setLoading(false);
    }
  };

  // Adicionar novo endereço
  const addAddress = async (addressData) => {
    try {
      setSubmitting(true);
      setError(null);
      const newAddress = await createAddress(addressData);
      setAddresses(prev => [...prev, newAddress]);
      return newAddress;
    } catch (err) {
      console.error('Erro ao adicionar endereço:', err);
      setError('Erro ao adicionar endereço');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  // Remover endereço
  const removeAddress = async (addressId) => {
    try {
      setSubmitting(true);
      setError(null);
      await deleteAddress(addressId);
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    } catch (err) {
      console.error('Erro ao remover endereço:', err);
      setError('Erro ao remover endereço');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  // Carregar endereços na inicialização
  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    loading,
    error,
    submitting,
    fetchAddresses,
    addAddress,
    removeAddress,
    setError
  };
}