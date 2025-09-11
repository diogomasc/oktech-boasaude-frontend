"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShoppingCart, Eye } from "lucide-react";

export default function CartSheet() {
  const { items, totalQuantity, totalPrice, removeItem, updateQuantity } = useCart();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const goToCartPage = () => {
    setOpen(false);
    router.push('/order');
  };

  return (
    <div className="relative">
      <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2" onClick={() => setOpen((v) => !v)}>
        <ShoppingCart className="w-4 h-4" />
        Carrinho ({totalQuantity})
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl z-50 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Seu carrinho</h3>
            <button className="text-sm text-gray-500" onClick={() => setOpen(false)}>Fechar</button>
          </div>
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <ul className="space-y-3 max-h-72 overflow-auto pr-1">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-start gap-2 border-b pb-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        {formatPrice(product.price)} cada
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                      <input
                        className="w-16 border rounded px-2 py-1 text-sm"
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                      />
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white h-8 px-3"
                        onClick={() => removeItem(product.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {items.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold text-green-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          )}
          
          <div className="mt-3 flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Continuar
            </Button>
            {items.length > 0 && (
              <Button 
                onClick={goToCartPage}
                className="flex-1 bg-green-500 hover:bg-green-600 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Ver Carrinho
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


