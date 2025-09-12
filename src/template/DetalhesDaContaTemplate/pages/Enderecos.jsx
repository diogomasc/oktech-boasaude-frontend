import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAddresses } from '../hook/useAddresses';
import EnderecoForm from '../components/EnderecoForm';
import DialogConfirming from '@/components/modals/DialogConfirming';
import { Button } from '@/components/ui/button';

export default function Enderecos() {
  const {
    addresses,
    loading,
    error,
    submitting,
    addAddress,
    removeAddress,
    setError
  } = useAddresses();

  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleAddAddress = async (addressData) => {
    try {
      await addAddress(addressData);
      setShowForm(false); // Isso agora fechará o modal
      toast.success('Endereço adicionado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      toast.error('Erro ao adicionar endereço. Tente novamente.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDeleteClick = (address) => {
    setAddressToDelete(address);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (addressToDelete) {
      try {
        await removeAddress(addressToDelete.id);
        toast.success('Endereço removido com sucesso!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (err) {
        toast.error('Erro ao remover endereço. Tente novamente.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
    setAddressToDelete(null);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setAddressToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-6">Meus Endereços</h2>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              Adicionar Endereço
            </Button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        )}

        <div className="space-y-4">
          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum endereço cadastrado.</p>
              {!showForm && (
                <Button
                  variant="link"
                  onClick={() => setShowForm(true)}
                  className="mt-4 text-green-500 hover:text-green-600"
                >
                  Adicionar seu primeiro endereço
                </Button>
              )}
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{address.street}</p>
                    <p className="text-gray-600">
                      {address.city}, {address.state}
                    </p>
                    <p className="text-gray-600">CEP: {address.cep}</p>
                    {address.complement && (
                      <p className="text-gray-600">Complemento: {address.complement}</p>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(address)}
                    disabled={submitting}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Modal de Endereço */}
      <EnderecoForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleAddAddress}
        submitting={submitting}
      />
      
      {/* Dialog de Confirmação */}
      <DialogConfirming
        isOpen={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Excluir Endereço"
        text={`Tem certeza que deseja excluir o endereço "${addressToDelete?.street}"? Esta ação não pode ser desfeita.`}
        cancelButtonText="Não, manter"
        confirmButtonText="Sim, excluir"
      />
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}