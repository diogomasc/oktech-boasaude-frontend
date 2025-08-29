// Componente que exibe a cesta semanal em destaque
export default function CestaSemanal() {
    return (
        <div className="text-center mb-10">
            {/* Imagem da cesta com borda laranja */}
            <img
                src="/imgprodutos/cesta.png"
                alt="Cesta semanal"
                className="mx-auto w-60 border-4 border-orange-400"
            />

            {/* Título */}
            <h2 className="font-bold text-lg mt-4">Cesta semanal</h2>

            {/* Texto explicativo */}
            <p className="text-gray-700 max-w-lg mx-auto">
                Esta é uma cesta completa que facilita sua vida, nela contém:
                500g de uva, 6 maçãs, 2 abacaxis, 6 abacates...
            </p>
        </div>
    );
}
