"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, ShoppingCart, Package, CreditCard, CheckCircle, Heart, Store, Upload, Users, TrendingUp, Settings, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComoFunciona() {
  const router = useRouter();
  const userSteps = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "1. Encontre Produtos",
      description: "Navegue por nossa ampla seleção de produtos",
      details: "Filtros por categoria e preço"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "2. Escolha seus Favoritos",
      description: "Adicione produtos ao carrinho",
      details: "Compare produtos e salve para depois"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      title: "3. Finalize sua Compra",
      description: "Revise seus itens e prossiga para pagamento",
      details: "Carrinho seguro e checkout simplificado"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "4. Pague com Segurança",
      description: "Múltiplas formas de pagamento disponíveis",
      details: "Cartões, PIX e transferências bancárias"
    },
    {
      icon: <Package className="h-8 w-8 text-primary" />,
      title: "5. Acompanhe seu Pedido",
      description: "Receba atualizações em tempo real",
      details: "Notificações por email e WhatsApp"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "6. Receba e Aproveite",
      description: "Produtos entregues na sua porta",
      details: "Entrega rápida e produtos de qualidade"
    }
  ];

  const producerSteps = [
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "1. Crie sua Conta",
      description: "Registre-se como produtor na plataforma",
      details: "Preencha seus dados pessoais e de contato"
    },
    {
      icon: <Store className="h-8 w-8 text-green-600" />,
      title: "2. Cadastre sua Loja",
      description: "Configure sua loja virtual",
      details: "Adicione informações da sua empresa e localização"
    },
    {
      icon: <Upload className="h-8 w-8 text-green-600" />,
      title: "3. Adicione Produtos",
      description: "Cadastre seus produtos com fotos e descrições",
      details: "Defina preços, estoque e categorias"
    },
    {
      icon: <Settings className="h-8 w-8 text-green-600" />,
      title: "4. Configure Preços",
      description: "Estabeleça preços competitivos",
      details: "Ajuste valores conforme demanda e sazonalidade"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "5. Gerencie Pedidos",
      description: "Receba e processe pedidos dos clientes",
      details: "Acompanhe vendas e atualize status"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "6. Monitore Resultados",
      description: "Acompanhe suas vendas e performance",
      details: "Relatórios detalhados de vendas e clientes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Como Funciona
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra como é fácil comprar ou vender produtos em nossa plataforma.
          </p>
        </div>

        {/* Seção para Usuários */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Para Clientes
            </h2>
            <p className="text-lg text-muted-foreground">
              Como comprar produtos em nossa plataforma
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userSteps.map((step, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base mb-2">
                    {step.description}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground">
                    {step.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Seção para Produtores */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Para Produtores
            </h2>
            <p className="text-lg text-muted-foreground">
              Como vender seus produtos em nossa plataforma
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {producerSteps.map((step, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-600/20">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base mb-2">
                    {step.description}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground">
                    {step.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Pronto para começar?
              </CardTitle>
              <CardDescription className="text-lg">
                Explore nossa seleção de produtos e encontre o que você precisa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group" onClick={() => router.push("/")}>
                  Ver Produtos
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push("/cadastro")} className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  Criar Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="col-span-1 md:col-span-2">
              <p className="text-gray-300 mb-4">
                Conectamos você aos melhores produtos frescos da região, 
                garantindo qualidade e sabor em cada entrega.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Produtos</a></li>
                <li><a href="/como-funciona" className="text-gray-300 hover:text-white transition-colors">Como Funciona</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-300">
                <li>📧 contato@boasaude.com</li>
                <li>📞 (11) 99999-9999</li>
                <li>📍 Feira de Santana, BA</li>
                <li>🕒 Seg-Sex: 8h-18h</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BOA SAUDE. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
