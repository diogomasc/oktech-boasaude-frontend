import React from "react";
import { Sprout, Clock, Shield } from "lucide-react";

export default function SobreNos() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative bg-cover bg-center h-[300px] flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Conheça a história da Boa Saúde e como estamos transformando a alimentação saudável com produtos frescos e orgânicos.
          </p>
        </div>
      </section>

      <section className="flex-1 py-16 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Nossa Missão</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-12">
            Na <span className="text-green-600 font-semibold">Boa Saúde</span>, acreditamos que a boa alimentação é a base de uma vida equilibrada. 
            Nosso propósito é conectar você aos melhores produtores da região, garantindo alimentos frescos, saborosos e livres de agrotóxicos, 
            entregues diretamente na sua porta.
          </p>
        </div>

                 <div className="grid md:grid-cols-3 gap-8 mt-10">
           <div className="p-6 bg-green-50 rounded-2xl transform transition-transform duration-200 hover:scale-105 shadow-md text-center">
             <div className="flex justify-center mb-4">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                 <Sprout className="h-6 w-6 text-green-600" />
               </div>
             </div>
             <h3 className="text-xl font-bold mb-2">Sustentabilidade</h3>
             <p className="text-gray-600">
               Trabalhamos com produtores locais que respeitam o meio ambiente e os ciclos naturais da produção.
             </p>
           </div>
           <div className="p-6 bg-green-50 rounded-2xl transform transition-transform duration-200 hover:scale-105 shadow-md text-center">
             <div className="flex justify-center mb-4">
               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                 <Clock className="h-6 w-6 text-blue-600" />
               </div>
             </div>
             <h3 className="text-xl font-bold mb-2">Compromisso</h3>
             <p className="text-gray-600">
               Garantimos entregas rápidas e seguras, preservando a qualidade e frescor de cada produto.
             </p>
           </div>
           <div className="p-6 bg-green-50 rounded-2xl transform transition-transform duration-200 hover:scale-105 shadow-md text-center">
             <div className="flex justify-center mb-4">
               <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                 <Shield className="h-6 w-6 text-yellow-600" />
               </div>
             </div>
             <h3 className="text-xl font-bold mb-2">Confiança</h3>
             <p className="text-gray-600">
               Prezamos pela transparência e pela confiança em cada etapa do processo, do campo até sua mesa.
             </p>
           </div>
         </div>
      </section>
    </div>
  );
}
