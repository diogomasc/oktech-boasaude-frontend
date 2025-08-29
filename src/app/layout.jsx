import { Header } from "@/components/header";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
<<<<<<< HEAD
  title: "My App",
};
=======
  title: "BOA SAUDE",
  };
>>>>>>> e25856fb71936920191945d9ac843966bf9221d3


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header/>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
