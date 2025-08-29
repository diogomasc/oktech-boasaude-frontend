// app/page.jsx
import { redirect } from 'next/navigation';

// Função fictícia para verificar se o usuário está logado
// Aqui você pode substituir pela lógica real do seu sistema
function isUserLoggedIn() {
    // Exemplo: verificar token no localStorage ou cookies
    if (typeof window !== "undefined") {
        return !!localStorage.getItem("token"); // true se existir token
    }
    return false;
}

export default function Home() {
    if (isUserLoggedIn()) {
        redirect("/catalogo"); // se estiver logado, vai direto pro catálogo
    } else {
        redirect("/login"); // se não estiver logado, vai pro login
    }
}
