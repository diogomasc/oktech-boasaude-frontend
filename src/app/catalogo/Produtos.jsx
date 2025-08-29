// src/app/catalogo/Produtos.jsx
import Image from "next/image";

export default function Produtos({ produtos }) {
  if (produtos.length === 0) {
    return <p className="text-gray-500 text-sm">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {produtos.map((p) => (
        <div
          key={p.id}
          className="bg-white shadow rounded-xl p-3 hover:shadow-md transition flex flex-col items-center text-sm"
        >
          <div className="w-full">
            <Image
              src={`/${p.img}`}
              alt={p.nome}
              width={200}
              height={200}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>

          <h3 className="mt-2 font-semibold text-base text-center">{p.nome}</h3>
          <p className="text-green-600 font-bold text-sm text-center">{p.preco}</p>
          <p className="text-gray-500 text-xs text-center">{p.categoria}</p>
          <button className="mt-2 w-full bg-green-500 text-white rounded-lg py-1 text-sm hover:bg-green-600">
            Adicionar
          </button>
        </div>
      ))}
    </div>
  );
}
