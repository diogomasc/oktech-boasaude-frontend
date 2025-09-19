import ProdutoDetalheTemplate from "@/template/ProdutoDetalheTemplate/produtoDetalheTemplate";

export default function ProdutoDetalhePage({ params }) {
  return <ProdutoDetalheTemplate productId={params.id} />;
}