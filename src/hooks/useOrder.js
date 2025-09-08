'use client'

import { useCart } from '@/context/CartContext';
import { createOrder, completeOrder } from '@/services/orders';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// Hook customizado para gerenciar a página de pedidos
export const useOrder = () => {
  const { items, totalQuantity, totalPrice, getItemTotal, removeItem, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Função para alterar quantidade de um item
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Função para finalizar a compra
  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    setIsProcessing(true);
    try {
      // Criar o pedido
      const orderPayload = items.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      }));

      const order = await createOrder(orderPayload);
      
      // Finalizar a compra com status COMPLETED
      await completeOrder(order.id, 'COMPLETED');
      
      // Limpar carrinho e mostrar sucesso
      clearCart();
      toast.success('Compra finalizada com sucesso!');
      
      // Redirecionar para página inicial após 2 segundos
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      toast.error('Erro ao finalizar compra. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Função para formatar preços
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return {
    // Estados do carrinho
    items,
    totalQuantity,
    totalPrice,
    isProcessing,
    
    // Funções do carrinho
    getItemTotal,
    removeItem,
    clearCart,
    handleQuantityChange,
    handleCheckout,
    formatPrice,
    
    // Router
    router
  };
};