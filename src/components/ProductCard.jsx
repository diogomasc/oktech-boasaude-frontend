"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { getCategoryImage } from "@/utils/categoryImages";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const router = useRouter();

  const handleProductClick = () => {
    router.push(`/produtos/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Previne a navegação quando clica no botão
    addItem(product, 1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden min-w-[260px] w-[260px] flex-shrink-0">
      {/* Imagem do Produto */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <Image
          src={getCategoryImage(product.category)}
          alt={product.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 200px, 300px br-10"
        />

        {/* Badge de Categoria */}
        {product.category && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </div>
        )}
      </div>

      {/* Informações do Produto */}
      <div className="p-4">
        <h3
          className="font-semibold text-gray-800 mb-2 text-base hover:text-orange-600 transition-colors line-clamp-2 cursor-pointer"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-orange-500">
              R$ {(product.price ?? 0).toFixed(2)}
            </span>
            {product.stock !== undefined && (
              <span
                className={`text-xs ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} em estoque`
                  : "Fora de estoque"}
              </span>
            )}
          </div>
        </div>

        {/* Botão de Adicionar ao Carrinho */}
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 flex items-center justify-center gap-2"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0 ? "Indisponível" : "Adicionar ao Carrinho"}
        </Button>
      </div>
    </div>
  );
}
