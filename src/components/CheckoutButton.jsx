"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { createOrder, completeOrder } from "@/services/orders";
import { toast } from "react-toastify";

export default function CheckoutButton() {
  const { items, totalPrice, clearCart, setIsCheckingOut, isCheckingOut } = useCart();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleCheckout = async () => {
    setError("");
    setSuccess("");
    
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    try {
      setIsCheckingOut(true);
      
      // Preparar payload para criar o pedido
      const payload = items.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      }));

      // Criar o pedido
      const order = await createOrder(payload);
      
      if (!order || !order.id) {
        throw new Error('Falha ao criar pedido - ID não retornado');
      }
      
      // Finalizar a compra com status COMPLETED
      await completeOrder(order.id, 'COMPLETED');
      
      // Limpar carrinho e mostrar sucesso
      clearCart();
      setSuccess(`Compra de ${formatPrice(totalPrice)} finalizada com sucesso!`);
      toast.success('Compra finalizada com sucesso!');
      
    } catch (err) {
      console.error('Erro ao finalizar compra:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Falha ao finalizar compra. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">
          {success}
        </div>
      )}
      
      {items.length > 0 && (
        <div className="text-right mb-2">
          <p className="text-sm text-gray-600">Total:</p>
          <p className="text-lg font-bold text-green-600">
            {formatPrice(totalPrice)}
          </p>
        </div>
      )}
      
      <Button
        className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
        disabled={items.length === 0 || isCheckingOut}
        onClick={handleCheckout}
      >
        {isCheckingOut ? "Processando..." : `Finalizar compra (${formatPrice(totalPrice)})`}
      </Button>
    </div>
  );
}


