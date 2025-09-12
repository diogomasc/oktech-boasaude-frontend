'use client'

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import api from '@/services/api';
import { CATEGORIAS_COM_SELECIONE, CATEGORIAS_PRODUTOS, CATEGORIA_SELECIONE } from '@/constantes/categorias_produtos';

// Schema para cadastro e edição (não permite estoque 0)
const ProdutoSchema = z.object({
  name: z.string().min(1, 'O nome do produto é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z.string().min(1, 'A descrição é obrigatória').max(512, 'Descrição deve ter no máximo 512 caracteres'),
  category: z.string().refine((categoria) => CATEGORIAS_PRODUTOS.includes(categoria), {
    message: 'Selecione uma categoria válida'
  }),
  stock: z.coerce.number({
    required_error: 'O estoque é obrigatório',
    invalid_type_error: 'O estoque deve ser um número válido'
  }).int('O estoque deve ser um número inteiro').min(1, 'O estoque deve ser maior que 0'),
  price: z.coerce.number({
    required_error: 'O preço é obrigatório',
    invalid_type_error: 'O preço deve ser um número válido'
  }).min(0.01, 'O preço deve ser maior que R$ 0,00'),
});

export default function ProdutoModal({ isOpen, onClose, onSuccess, mode = 'create', product = null }) {
  const [error, setError] = useState('');
  const [descriptionLength, setDescriptionLength] = useState(0);

  const isEditMode = mode === 'edit';
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(ProdutoSchema),
    defaultValues: {
      name: '',
      description: '',
      category: CATEGORIA_SELECIONE,
      stock: isEditMode ? '' : '',
      price: '',
    },
  });

  const description = watch('description');

  // Atualizar contador de caracteres
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescriptionLength(value.length);
  };

  // Preencher formulário quando o produto for fornecido (modo edição)
  useEffect(() => {
    if (isEditMode && product && isOpen) {
      setValue('name', product.name || '');
      setValue('description', product.description || '');
      setValue('category', product.category || CATEGORIA_SELECIONE);
      setValue('stock', product.stock?.toString() || '');
      setValue('price', product.price?.toString() || '');
      setDescriptionLength((product.description || '').length);
    }
  }, [product, isOpen, setValue, isEditMode]);

  const validateAndSubmit = async (data) => {
    // Validações customizadas com toast
    if (!data.name || data.name.trim() === '') {
      toast.error('O nome do produto é obrigatório!');
      return;
    }

    if (data.category === CATEGORIA_SELECIONE) {
      toast.error('Por favor, selecione uma categoria válida!');
      return;
    }

    if (!CATEGORIAS_PRODUTOS.includes(data.category)) {
      toast.error('Categoria selecionada é inválida!');
      return;
    }

    if (data.price <= 0) {
      toast.error('O preço deve ser maior que R$ 0,00!');
      return;
    }

    // Validação específica para cada modo
    if (isEditMode) {
      // No modo edição, permite estoque 0 mas mostra warning
      if (data.stock === 0) {
        toast.warning('Produto será atualizado para estoque zero e ficará indisponível para venda até que o estoque seja atualizado.');
      }
    } else {
      // No modo cadastro, não permite estoque 0
      if (data.stock <= 0 || isNaN(data.stock)) {
        toast.error('O estoque deve ser maior que 0!');
        return;
      }
    }

    // Prosseguir com a operação
    if (isEditMode) {
      await updateProduct(data);
    } else {
      await createProduct(data);
    }
  };

  const onSubmit = async (data) => {
    await validateAndSubmit(data);
  };

  const createProduct = async (data) => {
    setError('');

    try {
      // Buscar o shopId do usuário através da API
      let shopId;
      try {
        const shopResponse = await api.get('/v1/shops');
        shopId = shopResponse.data.id;
      } catch (shopError) {
        if (shopError.response?.status === 404) {
          throw new Error('Você precisa ter uma loja cadastrada para criar produtos.');
        } else if (shopError.response?.status === 403) {
          throw new Error('Acesso negado. Verifique se você está logado corretamente.');
        } else {
          throw new Error('Erro ao buscar dados da loja. Tente novamente.');
        }
      }

      // Criar o produto
      const response = await api.post(`/v1/products/${shopId}`, data);
      
      toast.success('Produto cadastrado com sucesso!');
      
      // Chamar callback de sucesso se fornecido
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      // Resetar formulário e fechar modal
      reset();
      onClose();
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao cadastrar produto. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  const updateProduct = async (data) => {
    setError('');

    if (!product?.id) {
      setError('Produto não encontrado.');
      return;
    }

    try {
      // Atualizar o produto
      const response = await api.put(`/v1/products/${product.id}`, data);
      
      toast.success('Produto atualizado com sucesso!');
      
      // Chamar callback de sucesso se fornecido
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      // Fechar modal
      onClose();
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar produto. Tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const handleClose = () => {
    reset();
    setError('');
    onClose();
  };

  // Configurações baseadas no modo
  const modalConfig = {
    title: isEditMode ? 'Editar Produto' : 'Cadastrar Novo Produto',
    submitButtonText: isEditMode ? 'Salvar Alterações' : 'Cadastrar Produto',
    submitButtonLoadingText: isEditMode ? 'Salvando...' : 'Cadastrando...',
    stockPlaceholder: isEditMode ? '0' : '1',
    stockMinValue: isEditMode ? '0' : '1',
    nameId: isEditMode ? 'edit-name' : 'name',
    descriptionId: isEditMode ? 'edit-description' : 'description',
    categoryId: isEditMode ? 'edit-category' : 'category',
    stockId: isEditMode ? 'edit-stock' : 'stock',
    priceId: isEditMode ? 'edit-price' : 'price',
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]" style={{animation: 'none'}}>
        <DialogHeader>
          <DialogTitle>{modalConfig.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome */}
          <div>
            <Label htmlFor={modalConfig.nameId}>
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Nome do produto"
              id={modalConfig.nameId}
              type="text"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor={modalConfig.descriptionId}>Descrição</Label>
            <Textarea
              placeholder="Descrição do produto (máximo 512 caracteres)"
              id={modalConfig.descriptionId}
              {...register('description', {
                onChange: handleDescriptionChange
              })}
              maxLength={512}
              rows={3}
            />
            <div className="flex justify-between items-center mt-1">
              <div>
                {errors.description && (
                  <p className="text-red-500 text-sm flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.description.message}
                  </p>
                )}
              </div>
              <p className={`text-sm ${
                (description?.length || 0) > 180 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {description?.length || 0}/512 caracteres
              </p>
            </div>
          </div>

          {/* Categoria */}
          <div>
            <Label htmlFor={modalConfig.categoryId}>
              Categoria <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS_COM_SELECIONE.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Estoque e Preço em linha */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={modalConfig.stockId}>
                Estoque <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder={modalConfig.stockPlaceholder}
                id={modalConfig.stockId}
                type="number"
                min={modalConfig.stockMinValue}
                {...register('stock')}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={modalConfig.priceId}>
                Preço (R$) <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="0.00"
                id={modalConfig.priceId}
                type="number"
                step="0.01"
                min="0"
                {...register('price')}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Placeholder para Imagens - Funcionalidade será implementada futuramente */}
          <div>
            <Label>Imagens do Produto</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
              <p>Funcionalidade de upload de imagens será implementada em breve</p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600"
            >
              {isSubmitting ? modalConfig.submitButtonLoadingText : modalConfig.submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}