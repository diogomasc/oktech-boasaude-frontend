'use client';

import React from 'react';
import { useProdutos } from './hook/useProdutos';
import ProductCard from '@/components/ProductCard';

export default function ProdutosTemplate() {
    const { products, loading, error } = useProdutos();

    return (
    <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">Todos os Produtos</h1>
    
        {loading && (
        <p className="text-center text-gray-600">Carregando produtos...</p>
        )}

        {error && (
        <div className="text-center text-red-600">
            <p>{error}</p>
        </div>
        )}

        {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
            <ProductCard key={p.id} product={p} />
            ))}
        </div>
        )}
    </div>
    );
}