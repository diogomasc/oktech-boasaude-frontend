/**
 * Mapeia categorias de produtos para suas respectivas imagens locais
 * @param {string} categoria - Nome da categoria do produto
 * @returns {string} - Caminho da imagem correspondente à categoria
 */
export const getCategoryImage = (categoria) => {
  const categoryImageMap = {
    'Frutas': '/img/categorias/Frutas.png',
    'Legumes e Verduras': '/img/categorias/Legumes_e_Verduras.png',
    'Ervas Frescas e Temperos Naturais': '/img/categorias/Ervas_Frescas_e_Temperos_Naturais.png',
    'Leguminosas e Grãos': '/img/categorias/Leguminosas_e_Graos.png',
    'Sementes e Oleaginosas': '/img/categorias/Sementes_e_Oleaginosas.png'
  };

  // Retorna a imagem da categoria ou uma imagem padrão se não encontrar
  return categoryImageMap[categoria] || '/img/categorias/Frutas.png';
};

/**
 * Lista todas as categorias disponíveis
 * @returns {Array<string>} - Array com todas as categorias disponíveis
 */
export const getAvailableCategories = () => {
  return [
    'Frutas',
    'Legumes e Verduras',
    'Ervas Frescas e Temperos Naturais',
    'Leguminosas e Grãos',
    'Sementes e Oleaginosas'
  ];
};