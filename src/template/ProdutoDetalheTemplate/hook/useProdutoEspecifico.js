"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/services/products";

export function useProdutoEspecifico(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!productId) {
            setError("ID do produto não fornecido");
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");
                
                const data = await getProductById(productId);
                setProduct(data);
            } catch (err) {
                console.error("Erro ao buscar produto:", err);
                setError("Falha ao carregar produto. Verifique se o ID está correto.");
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const refetch = () => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    setError("");
                    
                    const data = await getProductById(productId);
                    setProduct(data);
                } catch (err) {
                    console.error("Erro ao buscar produto:", err);
                    setError("Falha ao carregar produto. Verifique se o ID está correto.");
                    setProduct(null);
                } finally {
                    setLoading(false);
                }
            };
            
            fetchProduct();
        }
    };

    return {
        product,
        loading,
        error,
        refetch
    };
}