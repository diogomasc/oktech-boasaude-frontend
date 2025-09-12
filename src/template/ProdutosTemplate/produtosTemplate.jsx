'use client';

import React from 'react';
import { useProdutosAvancado } from './hook/useProdutos';
import ProductCard from '@/components/ProductCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export default function ProdutosTemplate() {
    const {
        products,
        loading,
        error,
        currentPage,
        pageSize,
        totalElements,
        totalPages,
        pagination,
        goToPage,
        changePageSize
    } = useProdutosAvancado();





    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto py-6 px-4">
                    <h1 className="text-4xl font-bold text-center text-orange-500">Catálogo de Produtos</h1>


                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="container mx-auto py-8 px-4">
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-red-600">{error}</p>
                        </div>
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-gray-600">Nenhum produto encontrado.</p>
                        </div>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <>
                        {/* Controles de paginação - Seletor de itens por página */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Itens por página:</span>
                                <select 
                                    value={pageSize} 
                                    onChange={(e) => changePageSize(Number(e.target.value))}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                                >
                                    <option value={12}>12</option>
                                    <option value={24}>24</option>
                                    <option value={36}>36</option>
                                </select>
                            </div>
                            
                            {/* Contador de exibição */}
                            <div className="text-sm text-gray-600">
                                Exibindo {pagination.numberOfElements || products.length} de {totalElements} produtos
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        
                        {/* Componente de Paginação */}
                        <div className="flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious 
                                            onClick={() => goToPage(currentPage - 1)}
                                            className={currentPage === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                        />
                                    </PaginationItem>
                                    
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                onClick={() => goToPage(i)}
                                                isActive={currentPage === i}
                                                className="cursor-pointer"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    
                                    <PaginationItem>
                                        <PaginationNext 
                                            onClick={() => goToPage(currentPage + 1)}
                                            className={currentPage >= totalPages - 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}