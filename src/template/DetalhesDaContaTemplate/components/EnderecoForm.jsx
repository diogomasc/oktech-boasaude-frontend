import React, { useState } from 'react';
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
import { maskCEP, removeSpecialCharacters } from '@/lib/utils';

export default function EnderecoForm({ isOpen, onClose, onSubmit, submitting }) {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    complement: '',
    cep: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Aplicar máscara no CEP durante a digitação
    if (name === 'cep') {
      processedValue = maskCEP(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [];
    
    if (!formData.street.trim()) {
      newErrors.street = 'Rua é obrigatória';
      requiredFields.push('Rua');
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
      requiredFields.push('Cidade');
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'Estado é obrigatório';
      requiredFields.push('Estado');
    }
    
    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
      requiredFields.push('CEP');
    } else {
      // Validar CEP sem máscara
      const cepSemMascara = removeSpecialCharacters(formData.cep);
      if (!/^\d{8}$/.test(cepSemMascara)) {
        newErrors.cep = 'CEP deve ter 8 dígitos';
      }
    }
    
    setErrors(newErrors);
    
    // Se há campos obrigatórios não preenchidos, mostrar toast
    if (requiredFields.length > 0) {
      const fieldsText = requiredFields.join(', ');
      toast.error(`Há campos obrigatórios que devem ser preenchidos: ${fieldsText}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Remover máscara do CEP antes de enviar para o backend
      const dataToSubmit = {
        ...formData,
        cep: removeSpecialCharacters(formData.cep)
      };
      onSubmit(dataToSubmit);
    }
  };

  const handleClose = () => {
    // Resetar formulário ao fechar
    setFormData({
      street: '',
      city: '',
      state: '',
      complement: '',
      cep: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]" style={{animation: 'none'}}>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Endereço</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rua */}
          <div>
            <Label htmlFor="street" className={errors.street ? 'text-red-500' : ''}>
              Rua <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className={errors.street ? 'border-red-500 bg-red-50' : ''}
              placeholder="Digite o nome da rua"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.street}
              </p>
            )}
          </div>

          {/* Cidade e Estado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className={errors.city ? 'text-red-500' : ''}>
                Cidade <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'border-red-500 bg-red-50' : ''}
                placeholder="Digite a cidade"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="state" className={errors.state ? 'text-red-500' : ''}>
                Estado <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'border-red-500 bg-red-50' : ''}
                placeholder="Digite o estado"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.state}
                </p>
              )}
            </div>
          </div>

          {/* CEP */}
          <div>
            <Label htmlFor="cep" className={errors.cep ? 'text-red-500' : ''}>
              CEP <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              className={errors.cep ? 'border-red-500 bg-red-50' : ''}
              placeholder="00000-000"
              maxLength="9"
            />
            {errors.cep && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.cep}
              </p>
            )}
          </div>

          {/* Complemento */}
          <div>
            <Label htmlFor="complement">
              Complemento
            </Label>
            <Textarea
              id="complement"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              placeholder="Apartamento, bloco, etc. (opcional)"
              maxLength={128}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600"
            >
              {submitting ? 'Salvando...' : 'Salvar Endereço'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}