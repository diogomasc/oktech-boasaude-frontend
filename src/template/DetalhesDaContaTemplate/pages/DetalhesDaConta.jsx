'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import React from "react";
import ActionButtons from '../components/ActionButtons';
import { maskCPF, maskCNPJ } from '@/lib/utils';

export default function DetalhesDaConta({
  userData,
  handleEditInfo,
  handleDeleteAccount,
  isProducer,
  shopData,
  hasShop
}) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-6">Informações de Contato</h2>
      <div className="space-y-6 mb-10 max-w-sm">
        <div>
          <Label className="text-gray-700 text-sm" htmlFor="name">
            Nome
          </Label>
          <Input
            id="name"
            value={userData?.name || ''}
            disabled
            readOnly
            className="bg-gray-100 mt-1"
          />
        </div>
        <div>
          <Label className="text-gray-700 text-sm" htmlFor="email">
            E-mail
          </Label>
          <Input
            id="email"
            value={userData?.email || ''}
            disabled
            readOnly
            className="bg-gray-100 mt-1"
          />
        </div>
        <div>
          <Label className="text-gray-700 text-sm" htmlFor="cpf">
            CPF
          </Label>
          <Input
            id="cpf"
            value={maskCPF(userData?.cpf) || ''}
            disabled
            readOnly
            className="bg-gray-100 mt-1"
          />
        </div>
      </div>

      {/* Seção específica para produtores */}
      {isProducer && (
        <>
          <h2 className="text-lg font-semibold mb-6">Informações da Loja</h2>
          {hasShop && shopData ? (
            <div className="space-y-6 mb-10 max-w-sm">
              <div>
                <Label className="text-gray-700 text-sm" htmlFor="shopName">
                  Nome da Loja
                </Label>
                <Input
                  id="shopName"
                  value={shopData.name || ''}
                  disabled
                  readOnly
                  className="bg-gray-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm" htmlFor="shopDescription">
                  Descrição
                </Label>
                <Textarea
                  id="shopDescription"
                  value={shopData.description || ''}
                  disabled
                  readOnly
                  className="bg-gray-100 mt-1 min-h-20"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-gray-700 text-sm" htmlFor="shopCnpj">
                  CNPJ
                </Label>
                <Input
                  id="shopCnpj"
                  value={maskCNPJ(shopData.cnpj) || ''}
                  disabled
                  readOnly
                  className="bg-gray-100 mt-1"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 mb-6">
              <p>Você ainda não possui uma loja cadastrada.</p>
              <p className="text-sm mt-2">Cadastre sua loja para começar a vender produtos.</p>
            </div>
          )}
        </>
      )}

      {/* Botões componentizados */}
      <ActionButtons 
        primaryAction={handleEditInfo}
        primaryLabel="Editar Informações"
        secondaryAction={handleDeleteAccount}
        secondaryLabel="Excluir Conta"
      />
    </>
  );
}
