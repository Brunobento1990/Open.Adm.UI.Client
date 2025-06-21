"use client";

import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { CardProduto } from "@/components/CardProduto/CardProduto";
import { GridApp } from "@/components/Grid/GridApp";
import { LoadingApp } from "@/components/Loading/LoadingApp";
import { TextApp } from "@/components/Text/TextApp";
import { rotas } from "@/config/ConfigRotas";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { useContext, useEffect } from "react";
import { ViewResumoCarrinho } from "./ViewResumoCarrinho";
import { IProduto } from "@/types/Produto";

export function ViewCarrinho() {
  const {
    quantidadeItensCarrinho,
    obterProdutos,
    produtos,
    statusObterItens,
    setProdutos,
  } = useContext(AppCarrinhoContext);
  const { navigate } = useNavigateApp();

  function editarProduto(index: number, produto: IProduto) {
    let newProdutos = [...produtos];
    newProdutos[index] = produto;
    setProdutos(newProdutos);
  }

  useEffect(() => {
    obterProdutos();
  }, []);

  if (statusObterItens === "loading") {
    return <LoadingApp height="350px" />;
  }

  if (!quantidadeItensCarrinho || produtos.length === 0) {
    return (
      <BoxApp marginTop="1rem" padding="1rem" height="calc(100vh - 300px)">
        <TextApp
          titulo="Carrinho"
          fontSize="18px"
          fontWeight={600}
          marginBotton="1rem"
        />
        <TextApp titulo="Você não tem nada no seu carrinho. Vamos mudar isso, use o link abaixo para" />
        <TextApp
          titulo="começar a navegar pelos nossos produtos."
          marginBotton="1rem"
        />
        <Button
          endIcon={listaDeIcones.flechaDireita}
          onClick={() => navigate(rotas.produto)}
          title="Explorar produtos"
        />
      </BoxApp>
    );
  }

  return (
    <BoxApp width="100vw" padding="1rem">
      <GridApp container spacing={2}>
        <GridApp sm={8} xs={12}>
          <BoxApp
            height="calc(100vh - 60px)"
            overflowy="auto"
            padding="1rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            {produtos.map((produto, index) => (
              <CardProduto
                desabilitarBtnAddCarrinho
                key={produto.id}
                produto={produto}
                habilitarExclusaoProduto
                onBlur={(prod) => editarProduto(index, prod)}
                index={index}
              />
            ))}
          </BoxApp>
        </GridApp>
        <GridApp sm={4} xs={12}>
          <ViewResumoCarrinho />
        </GridApp>
      </GridApp>
    </BoxApp>
  );
}
