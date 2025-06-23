import { IProduto } from "@/types/Produto";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { Button } from "../Button/ButtonApp";
import { useThemeApp } from "@/hooks/UseThemeApp";
import { CardPesoTamanho } from "./CardPesoTamanho";
import { useContext, useState } from "react";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { cleanFormatMoney } from "@/utils/FormatMoney";
import { GridApp } from "../Grid/GridApp";
import { DividerApp } from "../Divider/DividerApp";

interface propsCardProduto {
  produto: IProduto;
  desabilitarBtnAddCarrinho?: boolean;
  onBlur?: (produto: IProduto) => void;
  habilitarExclusaoProduto?: boolean;
  index?: number;
  sm?: number;
}

export function CardProduto(props: propsCardProduto) {
  const [produto, setProduto] = useState(props.produto);
  const {
    adicionarItens,
    statusAdicionar,
    excluirProdutoCarrinho,
    statusExcluirItem,
  } = useContext(AppCarrinhoContext);
  const { borderRadius, isMobile } = useThemeApp();

  function onChangePeso(index: number, qtd?: number) {
    if (produto.pesos[index].precoProduto) {
      let novosPesos = [...produto.pesos];
      novosPesos[index].precoProduto!.quantidade = qtd;
      setProduto({
        ...produto,
        pesos: novosPesos,
      });
    }
  }

  function onChangeTamanho(index: number, qtd?: number) {
    if (produto.tamanhos[index].precoProduto) {
      let novosTamanhos = [...produto.tamanhos];
      novosTamanhos[index].precoProduto!.quantidade = qtd;
      setProduto({
        ...produto,
        tamanhos: novosTamanhos,
      });
    }
  }

  async function adicionar() {
    const tamanhos = produto.tamanhos
      .filter((x) => x.precoProduto?.quantidade)
      .map((x) => {
        return {
          tamanhoId: x.id,
          produtoId: produto.id,
          quantidade: cleanFormatMoney(x.precoProduto?.quantidade) ?? 0,
        };
      });
    const pesos = produto.pesos
      .filter((x) => x.precoProduto?.quantidade)
      .map((x) => {
        return {
          pesoId: x.id,
          produtoId: produto.id,
          quantidade: cleanFormatMoney(x.precoProduto?.quantidade) ?? 0,
        };
      });

    if (tamanhos.length === 0 && pesos.length === 0) {
      return;
    }

    await adicionarItens([...pesos, ...tamanhos]);

    setProduto({
      ...produto,
      pesos: produto.pesos.map((peso) => {
        return {
          ...peso,
          precoProduto: {
            ...peso.precoProduto,
            quantidade: undefined,
          } as any,
        };
      }),
      tamanhos: produto.tamanhos.map((tamanho) => {
        return {
          ...tamanho,
          precoProduto: {
            ...tamanho.precoProduto,
            quantidade: undefined,
          } as any,
        };
      }),
    });
  }

  async function excluir() {
    if (props.index === undefined || props.index === null) {
      return;
    }

    await excluirProdutoCarrinho(props.index);
  }

  function onBlur() {
    if (props.onBlur) {
      props.onBlur(produto);
    }
  }

  return (
    <GridApp xs={12} sm={props.sm ?? 3} width="100%">
      <BoxApp
        width="100%"
        boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;"
        hover={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
        }}
        borderRadius={borderRadius}
        padding="1rem"
      >
        <img
          src={produto.foto}
          alt={produto.descricao}
          style={{ maxWidth: "250px", width: "100%" }}
        />
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextApp titulo={produto.descricao} fontWeight={600} />
          <TextApp titulo={`# ${produto.referencia}`} />
        </BoxApp>
        <DividerApp width="100%" />
        <form
          style={{ width: "100%" }}
          onSubmit={async (e) => {
            e.preventDefault();
            await adicionar();
          }}
        >
          {produto.pesos.length > 0 && (
            <BoxApp
              width="100%"
              display="flex"
              flexDirection="column"
              gap=".5rem"
            >
              <TextApp
                titulo="Pesos disponíveis"
                marginTop="1rem"
                marginBotton="1rem"
              />
              {produto.pesos.map((peso, index) => (
                <CardPesoTamanho
                  id={peso.id}
                  onChange={(value) => onChangePeso(index, value)}
                  descricao={peso.descricao}
                  key={peso.id}
                  precoProduto={peso.precoProduto}
                  onBlur={onBlur}
                />
              ))}
            </BoxApp>
          )}
          {produto.tamanhos.length > 0 && (
            <BoxApp
              width="100%"
              display="flex"
              flexDirection="column"
              gap=".5rem"
            >
              <TextApp
                fontSize="12px"
                titulo="Tamanhos disponíveis"
                marginBotton="1rem"
                marginTop="1rem"
              />
              {produto.tamanhos.map((tamanho, index) => (
                <CardPesoTamanho
                  id={tamanho.id}
                  onChange={(value) => onChangeTamanho(index, value)}
                  key={tamanho.id}
                  descricao={tamanho.descricao}
                  precoProduto={tamanho.precoProduto}
                  onBlur={onBlur}
                />
              ))}
            </BoxApp>
          )}
          <BoxApp width="100%" marginTop="1rem">
            {!props.desabilitarBtnAddCarrinho && (
              <Button
                onClick={adicionar}
                endIcon={listaDeIcones.carrinho}
                title={isMobile ? "Adicionar" : "Adicionar ao carrinho"}
                variant="contained"
                width="100%"
                loading={statusAdicionar === "loading"}
                type="submit"
              />
            )}
            {props.habilitarExclusaoProduto && (
              <Button
                onClick={excluir}
                endIcon={listaDeIcones.lixeira}
                title={"Excluir"}
                variant="outlined"
                width="100%"
                coricon="red"
                loading={statusExcluirItem === "loading"}
              />
            )}
          </BoxApp>
        </form>
      </BoxApp>
    </GridApp>
  );
}
