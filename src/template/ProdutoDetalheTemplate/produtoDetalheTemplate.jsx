"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useProdutoEspecifico } from "./hook/useProdutoEspecifico";
import { getCategoryImage } from "@/utils/categoryImages";

export default function ProdutoDetalheTemplate({ productId }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { product, loading, error } = useProdutoEspecifico(productId);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
    }
  };

  const handleBackToCatalog = () => {
    router.push("/produtos");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center ">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Produto não encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "O produto solicitado não existe."}
          </p>
          <Button
            onClick={handleBackToCatalog}
            className="bg-orange-500 hover:bg-orange-600 "
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com navegação */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto py-4 px-4">
          <Button
            variant="ghost"
            onClick={handleBackToCatalog}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Catálogo
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seção da Imagem */}
            <div className="p-8">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={getCategoryImage(product.category)}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Seção das Informações */}
            <div className="p-8">
              {/* Badge de Categoria */}
              {product.category && (
                <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {product.category}
                </div>
              )}

              {/* Nome do Produto */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              {/* Preço */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-orange-500">
                    R$ {(product.price ?? 0).toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    R$ {((product.price ?? 0) * 1.2).toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    20% OFF
                  </span>
                </div>
              </div>

              {/* Descrição */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Descrição
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Informações de Estoque */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Disponibilidade:
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} unidades em estoque`
                      : "Fora de estoque"}
                  </span>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="mb-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock === 0
                    ? "Indisponível"
                    : "Adicionar ao Carrinho"}
                </Button>
              </div>

              {/* Informações Adicionais */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">SKU:</span>
                    <span className="ml-2 font-medium">{product.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Categoria:</span>
                    <span className="ml-2 font-medium">
                      {product.category || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
