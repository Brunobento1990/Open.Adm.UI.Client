"use client";

import { useProdutoApi } from "@/api/UseProdutoApi";
import { BoxApp } from "@/components/Box/BoxApp";
import { GridApp } from "@/components/Grid/GridApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { IProduto } from "@/types/Produto";
import { useEffect, useState } from "react";
import { CardProduto } from "@/components/CardProduto/CardProduto";
import { useNavigateApp } from "@/hooks/UseNavigateApp";

export function ViewCategoria() {
  const { listarPorCategorias } = useProdutoApi();
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const { params } = useNavigateApp();

  async function init() {
    const response = await listarPorCategorias.fetch(params.id as string);
    if (response) {
      setProdutos(response);
    }
  }

  useEffect(() => {
    init();
  }, []);

  const categoria =
    produtos.length === 0 ? "" : produtos[0].categoria?.descricao;

  return (
    <BoxApp padding="1rem" width="100vw">
      {listarPorCategorias.status === "loading" && (
        <LoadingApp height="300px" marginTop="1rem" texto="Categorias..." />
      )}
      <BoxApp
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="1rem"
      >
        <TextApp fontSize="20px" fontWeight={600} titulo={categoria ?? ""} />
      </BoxApp>
      <GridApp container spacing={3}>
        {produtos.map((produto) => (
          <CardProduto produto={produto} key={produto.id} />
        ))}
      </GridApp>
    </BoxApp>
  );
}
