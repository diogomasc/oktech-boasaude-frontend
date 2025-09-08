"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { useOrder } from "../../hooks/useOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import DialogConfirming from "@/components/modals/DialogConfirming";

export function OrderTemplate() {
  const {
    items,
    totalQuantity,
    totalPrice,
    isProcessing,
    getItemTotal,
    removeItem,
    clearCart,
    handleQuantityChange: originalHandleQuantityChange,
    updateQuantity,
    handleCheckout,
    formatPrice,
    router
  } = useOrder();

  // Função para interceptar mudanças de quantidade e confirmar remoção quando vai para 0
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      // Encontrar o produto que será removido
      const product = items.find(item => item.product.id === productId);
      if (product) {
        setProductToRemove(product.product);
        setShowRemoveModal(true);
      }
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const [mounted, setMounted] = useState(false);
  
  // Estados para controlar os modais de confirmação
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  // Função para confirmar checkout após modal
  const handleConfirmCheckout = () => {
    handleCheckout();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Meu Carrinho</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Carregando...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Meu Carrinho</h1>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>

      {items.length === 0 ? (
        /* Carrinho vazio */
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-500 mb-6">
            Adicione alguns produtos para começar suas compras!
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-green-500 hover:bg-green-600 text-sm"
          >
            Continuar Comprando
          </Button>
        </div>
      ) : (
        /* Carrinho com itens */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de itens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">
                  Itens do Carrinho ({totalQuantity})
                </h2>
              </div>

              <div className="divide-y">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="p-6 flex gap-4">
                    {/* Imagem do produto (placeholder) */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Informações do produto */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {product.category}
                      </p>
                      <p className="text-green-600 font-semibold mt-1">
                        {formatPrice(product.price)} cada
                      </p>
                    </div>

                    {/* Controles de quantidade */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(product.id, quantity - 1)
                          }
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>

                        <Input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 text-center"
                        />

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(product.id, quantity + 1)
                          }
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Subtotal e remover */}
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {formatPrice(getItemTotal(product, quantity))}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setProductToRemove(product);
                            setShowRemoveModal(true);
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Resumo do Pedido</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({totalQuantity} itens)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span className="text-green-600">Grátis</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <Button
                  onClick={() => setShowCheckoutModal(true)}
                  disabled={isProcessing}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-sm"
                >
                  {isProcessing ? "Processando..." : "Finalizar Compra"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="w-full text-sm"
                >
                  Continuar Comprando
                </Button>

                {items.length > 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => setShowClearCartModal(true)}
                    className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 text-sm"
                  >
                    Limpar Carrinho
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modais de Confirmação */}
      
      {/* Modal de Confirmação - Finalizar Compra */}
      <DialogConfirming
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onConfirm={handleConfirmCheckout}
        title="Finalizar Compra"
        text={`Confirmar a compra de ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'itens'} no valor total de ${formatPrice(totalPrice)}?`}
        cancelButtonText="Cancelar"
        confirmButtonText="Confirmar Compra"
        confirmButtonVariant="default"
      />
      
      {/* Modal de Confirmação - Remover Produto */}
      <DialogConfirming
        isOpen={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false);
          setProductToRemove(null);
        }}
        onConfirm={() => {
          if (productToRemove) {
            removeItem(productToRemove.id);
            setProductToRemove(null);
          }
        }}
        title="Remover Produto"
        text={productToRemove ? `Deseja remover "${productToRemove.name}" do seu carrinho?` : ""}
        cancelButtonText="Cancelar"
        confirmButtonText="Remover"
      />
      
      {/* Modal de Confirmação - Limpar Carrinho */}
      <DialogConfirming
        isOpen={showClearCartModal}
        onClose={() => setShowClearCartModal(false)}
        onConfirm={clearCart}
        title="Limpar Carrinho"
        text={`Deseja remover todos os ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'itens'} do seu carrinho? Esta ação não pode ser desfeita.`}
        cancelButtonText="Cancelar"
        confirmButtonText="Limpar Tudo"
      />
    </div>
  );
}
