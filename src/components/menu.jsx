'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Share2, Settings, User } from 'lucide-react'

export default function Menu() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-orange-100 z-50 shadow-md">
            <div className="w-5/5 mx-auto flex items-center justify-between px-6 py-3">

                {/* Logo à esquerda */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/img/logo.svg"
                        alt="Logo Boa Saúde"
                        width={60}
                        height={15}
                        priority
                    />
                </Link>

                {/* Links e ícones à direita */}
                <div className="flex items-center space-x-6">

                    {/* Links do menu */}
                    <div className="flex space-x-4 bg-green-600 rounded-lg px-4 py-2">
                        <Link href="/" className="text-white font-medium hover:underline">Home</Link>
                        <Link href="/catalogo" className="text-white font-medium hover:underline">Catalogo</Link>
                        <Link href="/meusProdutos" className="text-white font-medium hover:underline">Produtos</Link>
                        <Link href="/favoritos" className="text-white font-medium hover:underline">Favoritos</Link>
                        <Link href="/cadastro-loja" className="text-white font-medium hover:underline">Fornecedor</Link>
                        <Link href="/contatos" className="text-white font-medium hover:underline">Contatos</Link>
                    </div>

                    {/* Ícones / Usuário */}
                    <div className="flex items-center space-x-4 text-green-700 ml-4">
                        <Share2 className="cursor-pointer" />
                        <Settings className="cursor-pointer" />
                        <User className="cursor-pointer" />
                        <ShoppingCart className="cursor-pointer" />
                        <span className="font-semibold text-orange-700">nome do usuario</span>
                    </div>

                </div>

            </div>
        </nav>
    )
}
