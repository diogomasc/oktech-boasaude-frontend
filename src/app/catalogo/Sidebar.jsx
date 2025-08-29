// src/app/catalogo/Sidebar.jsx
export default function Sidebar({ onCategoriaChange }) {
  const categorias = ["Frutas", "Verduras", "Legumes", "Cereais", "Bebidas"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Categorias</h2>
      <ul className="space-y-2">
        {categorias.map((cat, i) => (
          <li key={i}>
            <button
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-green-100 transition"
              onClick={() => onCategoriaChange(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
        <li>
          <button
            className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 transition"
            onClick={() => onCategoriaChange("")}
          >
            Limpar Filtros
          </button>
        </li>
      </ul>
    </div>
  );
}
