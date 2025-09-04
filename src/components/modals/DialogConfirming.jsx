import React from 'react';
import { Button } from '@/components/ui/button';

export default function DialogConfirming({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmação",
  text = "Você tem certeza que quer realizar essa ação?",
  cancelButtonText = "Não, cancelar",
  confirmButtonText = "Sim, confirmar"
}) {
  if (!isOpen) return null;

  // Fecha o modal ao clicar no fundo
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Confirma e fecha
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      // Fundo preto translúcido
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleBackdropClick}
    >
      {/* Conteúdo do modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transform transition-all z-10">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center flex-1">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors ml-2"
          >
            {/* Ícone de fechar */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Corpo */}
        <div className="mb-6">
          <p className="text-gray-700 text-sm leading-relaxed text-center break-all break-words">
            {text}
          </p>
        </div>

        {/* Rodapé - Botões */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
