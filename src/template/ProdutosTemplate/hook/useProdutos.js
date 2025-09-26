"use client";

import { useEffect, useState, useCallback } from "react";
import { getProductsWithPagination } from "@/services/products";

export function useProdutosAvancado() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 12,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
        numberOfElements: 0
    });

    // Função para buscar produtos
    const fetchProducts = useCallback(async (page = currentPage, size = pageSize) => {
        try {
            setLoading(true);
            setError("");
            
            const params = {
                page,
                size
            };
            
            const data = await getProductsWithPagination(params);
            
            setProducts(Array.isArray(data?.content) ? data.content : []);
            setCurrentPage(data.number || 0);
            setTotalElements(data.totalElements || 0);
            setTotalPages(data.totalPages || 0);
            setPagination({
                page: data.number || 0,
                size: data.size || 12,
                totalElements: data.totalElements || 0,
                totalPages: data.totalPages || 0,
                first: data.first || true,
                last: data.last || true,
                numberOfElements: data.numberOfElements || 0
            });
        } catch (err) {
            setError("Falha ao carregar produtos");
            console.error("Erro ao buscar produtos:", err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize]);

    // Função goToPage seguindo padrão do PainelProdutor
    const goToPage = useCallback((page) => {
        if (page >= 0 && page < totalPages) {
            fetchProducts(page, pageSize);
        }
    }, [fetchProducts, totalPages, pageSize]);

    // Função changePageSize seguindo padrão do PainelProdutor
    const changePageSize = useCallback((size) => {
        setPageSize(size);
        setCurrentPage(0);
        fetchProducts(0, size);
    }, [fetchProducts]);



    // Carregar produtos iniciais
    useEffect(() => {
        fetchProducts(0, pageSize);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        products,
        loading,
        error,
        currentPage,
        pageSize,
        totalElements,
        totalPages,
        pagination,
        goToPage,
        changePageSize,
        fetchProducts,
        refetch: () => fetchProducts(currentPage, pageSize)
    };
}


