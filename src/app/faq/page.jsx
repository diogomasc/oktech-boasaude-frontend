"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";

const faqData = [
  { id: "1", question: "Como funciona a entrega das frutas e verduras?", answer: "Realizamos entregas de segunda a sábado, das 8h às 20h. Após confirmar o pedido, você escolhe o horário disponível e nosso time garante que os produtos cheguem frescos à sua porta.", category: "Entrega" },
  { id: "2", question: "Vocês entregam em quais regiões?", answer: "Atualmente entregamos em toda a cidade e algumas áreas metropolitanas. Insira seu CEP na página inicial para verificar a disponibilidade na sua região.", category: "Entrega" },
  { id: "3", question: "Os produtos são realmente frescos?", answer: "Sim! Trabalhamos diretamente com produtores locais e selecionamos as frutas e verduras na manhã do envio para garantir qualidade e frescor.", category: "Qualidade" },
  { id: "4", question: "Posso agendar entregas semanais?", answer: "Sim, oferecemos planos de assinatura para entregas recorrentes. Você pode escolher os itens preferidos e a frequência, ajustando quando precisar.", category: "Assinatura" },
  { id: "5", question: "Qual é o valor mínimo para o pedido?", answer: "O valor mínimo para pedidos é de R$ 40,00. Assim conseguimos manter a logística e oferecer frete mais acessível.", category: "Pagamento" },
  { id: "6", question: "Quais formas de pagamento são aceitas?", answer: "Aceitamos cartões de crédito, débito, Pix e pagamento na entrega via cartão.", category: "Pagamento" },
  { id: "7", question: "E se um produto chegar danificado?", answer: "Caso algum item chegue em más condições, entre em contato pelo chat ou WhatsApp em até 24h. Substituímos ou reembolsamos sem custo.", category: "Suporte" },
  { id: "8", question: "Vocês usam embalagens sustentáveis?", answer: "Sim, utilizamos caixas recicláveis e reduzimos o uso de plásticos sempre que possível para minimizar o impacto ambiental.", category: "Sustentabilidade" },
  { id: "9", question: "Posso personalizar minha cesta de compras?", answer: "Claro! Ao montar sua cesta, você pode escolher as frutas e verduras que prefere, além de ver sugestões sazonais.", category: "Cesta" }
];

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState({});

  const categories = useMemo(() => {
    return Array.from(new Set(faqData.map(item => item.category).filter(Boolean)));
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return faqData.filter((item) => {
      const categoryMatch = !activeCategory || item.category === activeCategory;
      const favoriteMatch = !showOnlyFavorites || favorites[item.id];
      const searchMatch = !q || 
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);

      return categoryMatch && favoriteMatch && searchMatch;
    });
  }, [query, activeCategory, showOnlyFavorites, favorites]);

  const handleToggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleToggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClearFilters = () => {
    setQuery("");
    setActiveCategory(null);
    setShowOnlyFavorites(false);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 lg:p-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6">
          <Link href="/" className="text-green-700 hover:text-green-900 mb-4 inline-block">
            ← Voltar para home
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-green-900">
            FAQ — Perguntas Frequentes
          </h1>
          <p className="mt-2 text-green-700">
            Tire suas dúvidas sobre nosso e-commerce de frutas e verduras frescas.
          </p>
        </header>

        <div className="space-y-4">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-4 cursor-pointer"
              onClick={() => handleToggleOpen(item.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-green-900">{item.question}</h3>
                <button
                  onClick={(e) => handleToggleFavorite(e, item.id)}
                  className={`ml-2 ${favorites[item.id] ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                </button>
              </div>
              {openId === item.id && (
                <p className="mt-2 text-green-700">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
