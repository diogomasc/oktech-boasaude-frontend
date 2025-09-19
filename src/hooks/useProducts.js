'use client'

import { useState, useEffect, useCallback } from 'react';
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from '@/services/products';
import api from '@/services/api';


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Buscar produtos com paginação
  const fetchProducts = useCallback(async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/v1/products?page=${page}&size=${size}`);
      const data = response.data;
      const productsData = data.content || [];
      setProducts(productsData);
      setTotalElements(data.totalElements || 0);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(page);
      
      // Lógica de carregamento de imagens removida
      
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  // Buscar produto por ID
  const fetchProductById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const product = await getProductById(id);
      return product;
      
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      setError('Erro ao carregar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar novo produto
  const addProduct = useCallback(async (productData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar shopId do usuário
      let shopId;
      try {
        const shop = await api.get('/v1/shops');
        shopId = shop.data.id;
      } catch (shopError) {
        if (shopError.response?.status === 404) {
          throw new Error('Você precisa ter uma loja cadastrada para criar produtos.');
        } else if (shopError.response?.status === 403) {
          throw new Error('Acesso negado. Verifique se você está logado corretamente.');
        } else {
          throw new Error('Erro ao buscar dados da loja.');
        }
      }
      
      const newProduct = await createProduct(shopId, productData);
      
      // Adicionar produto à lista local
      setProducts(prev => [newProduct, ...prev]);
      
      // Atualizar contadores de paginação
      setTotalElements(prev => prev + 1);
      
      return newProduct;
      
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      setError('Erro ao criar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar produto
  const editProduct = useCallback(async (id, productData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedProduct = await updateProduct(id, productData);
      
      // Atualizar produto na lista local
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? updatedProduct : product
        )
      );
      
      return updatedProduct;
      
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setError('Erro ao atualizar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Deletar produto
  const removeProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      await deleteProduct(id);
      
      // Remover produto da lista local
      setProducts(prev => prev.filter(product => product.id !== id));
      
      // Atualizar contadores de paginação
      setTotalElements(prev => Math.max(0, prev - 1));
      
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      setError('Erro ao deletar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);



  // Limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Carregar produtos na inicialização
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Mudar página
  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchProducts(page, pageSize);
    }
  };

  // Mudar tamanho da página
  const changePageSize = (size) => {
    setPageSize(size);
    setCurrentPage(0);
    fetchProducts(0, size);
  };

  return {
    // Estado
    products,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    
    // Ações
    fetchProducts,
    fetchProductById,
    addProduct,
    editProduct,
    removeProduct,
    goToPage,
    changePageSize,
    clearError,
    
    // Utilitários
    hasProducts: products.length > 0,
    isEmpty: !loading && products.length === 0,
  };
};