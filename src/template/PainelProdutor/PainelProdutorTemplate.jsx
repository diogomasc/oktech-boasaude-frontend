'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Edit, Trash2, Search, Package, ImageIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import ProdutoModal from '@/modals/ProdutoModalForm';
import DialogConfirming from '@/components/modals/DialogConfirming';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PainelProdutorTemplate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const { isAuthenticated, authError, isLoading } = useAuth();
  const {
    products,
    loading,
    error,
    currentPage,
    pageSize,
    totalElements,
    totalPages,
    fetchProducts,
    removeProduct,
    goToPage,
    changePageSize
  } = useProducts();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated, fetchProducts]);



  // Abrir modal de confirmação para deletar produto
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Deletar produto
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      await removeProduct(productToDelete.id);
      toast.success('Produto excluído com sucesso!');
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      toast.error('Erro ao deletar produto');
    }
  };

  // Callback para quando um produto for cadastrado com sucesso
  const handleProductCreated = () => {
    fetchProducts(); // Recarregar lista para garantir dados atualizados
  };

  // Callback para quando um produto for editado com sucesso
  const handleProductUpdated = () => {
    fetchProducts(); // Recarregar lista para garantir dados atualizados
  };



  // Filtrar produtos por termo de busca
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar apenas a mensagem de erro
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{authError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel do Produtor</h1>
            <p className="text-gray-600 mt-1">Gerencie seus produtos</p>
          </div>
          <Button 
            onClick={() => setShowCadastroModal(true)}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>

        {/* Barra de pesquisa */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar produtos por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>



        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
            <span className="ml-2 text-gray-600">Carregando produtos...</span>
          </div>
        ) : (
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
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>
              
              {/* Contador de exibição */}
              <div className="text-sm text-gray-600">
                Exibindo {filteredProducts.length} de {totalElements}
              </div>
            </div>

            {/* Estado vazio */}
            {filteredProducts.length === 0 && products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum produto cadastrado</h3>
                <p className="text-gray-500 mb-6">Comece cadastrando seu primeiro produto</p>
                <Button 
                  onClick={() => setShowCadastroModal(true)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Cadastrar Primeiro Produto
                </Button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-500">Tente buscar com outros termos</p>
              </div>
            ) : (
              <>
                {/* Lista de produtos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-semibold leading-tight break-words break-all max-w-full">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                      {/* Placeholder para imagem - Funcionalidade será implementada futuramente */}
                      <div className="mb-3">
                        <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                          <span className="text-xs text-gray-500 ml-2">Sem imagem</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description || 'Sem descrição'}
                      </p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.category}
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          R$ {product.price?.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        Estoque: {product.stock} unidades
                      </div>
                      
                      {/* Botões de ação movidos para baixo */}
                      <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(product)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                    </Card>
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
          </>
        )}
      </div>

      {/* Modais */}
      <ProdutoModal
        isOpen={showCadastroModal}
        onClose={() => setShowCadastroModal(false)}
        onSuccess={handleProductCreated}
        mode="create"
      />
      
      <ProdutoModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleProductUpdated}
        mode="edit"
        product={selectedProduct}
      />

      <DialogConfirming
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteProduct}
        title="Excluir Produto"
        text={`Tem certeza que deseja excluir o produto "${productToDelete?.name}"? Esta ação não pode ser desfeita.`}
        cancelButtonText="Cancelar"
        confirmButtonText="Excluir"
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}