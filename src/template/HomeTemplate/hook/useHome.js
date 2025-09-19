"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { listProducts } from "@/services/products";

export function useHome() {
  const scrollContainerRef = useRef(null);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef(null);

  // Função para criar array com loop infinito
  const createInfiniteArray = useCallback((products) => {
    if (products.length === 0) return [];
    
    // Limitar aos últimos 10 produtos
    const limitedProducts = products.slice(-10);
    
    // Criar array infinito: produtos + produtos + produtos (3x para garantir loop suave)
    return [...limitedProducts, ...limitedProducts, ...limitedProducts];
  }, []);

  const scrollLeft = useCallback(() => {
    if (!scrollContainerRef.current || isScrolling || originalProducts.length === 0) return;
    
    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const cardWidth = 280; // largura do card + gap
    
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    
    setTimeout(() => {
      const newIndex = currentIndex - 1;
      if (newIndex < 0) {
        // Volta para o final do segundo conjunto (posição equivalente)
        const targetIndex = originalProducts.length + newIndex;
        setCurrentIndex(targetIndex);
        container.scrollLeft = targetIndex * cardWidth;
      } else {
        setCurrentIndex(newIndex);
      }
      setIsScrolling(false);
    }, 300);
  }, [currentIndex, isScrolling, originalProducts.length]);

  const scrollRight = useCallback(() => {
    if (!scrollContainerRef.current || isScrolling || originalProducts.length === 0) return;
    
    setIsScrolling(true);
    const container = scrollContainerRef.current;
    const cardWidth = 280; // largura do card + gap
    
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    
    setTimeout(() => {
      const newIndex = currentIndex + 1;
      if (newIndex >= originalProducts.length * 2) {
        // Volta para o início do segundo conjunto
        const targetIndex = originalProducts.length;
        setCurrentIndex(targetIndex);
        container.scrollLeft = targetIndex * cardWidth;
      } else {
        setCurrentIndex(newIndex);
      }
      setIsScrolling(false);
    }, 300);
  }, [currentIndex, isScrolling, originalProducts.length]);

  // Funções para controlar hover
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Auto-scroll automático
  useEffect(() => {
    if (!isHovered && originalProducts.length > 0 && !isScrolling) {
      autoScrollRef.current = setInterval(() => {
        scrollRight();
      }, 4000); // Muda a cada 4 segundos
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isHovered, originalProducts.length, isScrolling, scrollRight]);

  // Auto-scroll para posição inicial (meio do array infinito)
  useEffect(() => {
    if (originalProducts.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 280;
      const initialPosition = originalProducts.length * cardWidth; // Começa no segundo conjunto
      
      setTimeout(() => {
        container.scrollLeft = initialPosition;
        setCurrentIndex(originalProducts.length);
      }, 100);
    }
  }, [originalProducts.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await listProducts();
        const products = Array.isArray(data?.content) ? data.content : [];
        
        setOriginalProducts(products.slice(-10)); // Últimos 10 produtos
        setDisplayProducts(createInfiniteArray(products));
      } catch (err) {
        setError("Falha ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [createInfiniteArray]);

  return {
    scrollContainerRef,
    scrollLeft,
    scrollRight,
    products: displayProducts,
    loading,
    error,
    handleMouseEnter,
    handleMouseLeave,
  };
}


