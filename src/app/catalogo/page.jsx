// src/app/catalogo/page.jsx
"use client";
// app/catalogo/page.jsx ou seu componente de catálogo
import Image from "next/image";
import { useState } from "react";
import Produtos from "./Produtos";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import CestaSemanal from "./CestaSemanal";

export default function CatalogoPage() {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("");

  // Lista de produtos mockada
  const produtos = [
    { id: 1, nome: "Maçã", preco: "R$ 12,00", categoria: "Frutas", img: "imgproduto/maca.png" },
    { id: 2, nome: "Uva", preco: "R$ 5,00", categoria: "Frutas", img: "imgproduto/uva.png" },
    { id: 3, nome: "Manga", preco: "R$ 5,00", categoria: "Frutas", img: "imgproduto/manga.png" },
    { id: 4, nome: "Morango", preco: "R$ 15,00", categoria: "Frutas", img: "imgproduto/morango.png" },
    { id: 5, nome: "Banana", preco: "R$ 4,00", categoria: "Frutas", img: "imgproduto/banana.png" },
    { id: 3, nome: "Cenoura", preco: "R$ 3,50", categoria: "Legumes", img: "imgproduto/cenoura.png" },
    { id: 7, nome: "Alface", preco: "R$ 2,50", categoria: "Verduras", img: "imgproduto/alface.png" },
    { id: 8, nome: "Castanha", preco: "R$ 10,00", categoria: "Cereais", img: "imgproduto/castanha.png" },
    { id: 9, nome: "Aipim", preco: "R$ 10,00", categoria: "Cereais", img: "imgproduto/aipim.png" },
    { id: 10, nome: "Suco de Uva", preco: "R$ 25,00", categoria: "Bebidas", img: "imgproduto/suco.png" },
    { id: 11, nome: "Suco de laranja", preco: "R$ 6,00", categoria: "Bebidas", img: "imgproduto/sucolaranja.png" },
  ];

  // Filtro dinâmico
  const produtosFiltrados = produtos.filter((p) => {
    const matchSearch = p.nome.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = categoria ? p.categoria === categoria : true;
    return matchSearch && matchCategoria;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <Sidebar onCategoriaChange={setCategoria} />
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        {/* Barra de busca */}
        <SearchBar onSearch={setSearch} />

        {/* Cesta destaque */}
        <div className="my-6">
          <CestaSemanal />
        </div>

        {/* Lista de produtos filtrados */}
        <Produtos produtos={produtosFiltrados} />
      </main>
    </div>
  );
}
