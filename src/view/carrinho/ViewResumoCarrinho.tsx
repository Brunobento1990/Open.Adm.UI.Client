import { BoxApp } from "@/components/Box/BoxApp";
import { Button } from "@/components/Button/ButtonApp";
import { TextApp } from "@/components/Text/TextApp";
import { AppCarrinhoContext } from "@/context/AppCarrinhoContext";
import { formatMoney } from "@/utils/FormatMoney";
import { useContext, useEffect, useState } from "react";
import { ViewTotalizadorCarrinho } from "./ViewTotalizadoCarrinho";
import { ITodasConfiguracoesDePedido } from "@/types/PedidoMinimo";
import { UsePedidoApi } from "@/api/UsePedidoApi";
import { useNavigateApp } from "@/hooks/UseNavigateApp";
import { rotas } from "@/config/ConfigRotas";
import { DividerApp } from "@/components/Divider/DividerApp";
import { AlertApp } from "@/components/Alert/AlertApp";
import { ViewEnderecoCarrinho } from "./ViewEnderecoCarrinho";
import { useSnackbar } from "@/components/SnackBar/UseSnackBar";
import { ViewModalFrete } from "./ViewModalFrete";
import { useFreteApi } from "@/api/UseFreteApi";
import { ICotacaoFreteResponse } from "@/types/Frete";
import { ICreatePedido } from "@/types/CreatePedido";

export function ViewResumoCarrinho() {
  const [todasConfiguracoes, setTodasConfiguracoes] = useState<ITodasConfiguracoesDePedido>();
  const [cotacaoFrete, setCotacaoFrete] = useState<ICotacaoFreteResponse>();
  const { obterTodasConfiguracoesDePedido, criarPedido } = UsePedidoApi();
  const { produtos, resetarCarrinho, enderecoUsuario } =
    useContext(AppCarrinhoContext);
  const { navigate } = useNavigateApp();
  const { cotarFrete } = useFreteApi();
  const { show } = useSnackbar();
  const pesosComQuantidade = produtos.flatMap((x) =>
    x.pesos.filter((y) => y.precoProduto?.quantidade)
  );
  const tamanhosComQuantidade = produtos.flatMap((x) =>
    x.tamanhos.filter((y) => y.precoProduto?.quantidade)
  );

  const totalPorPeso = pesosComQuantidade.reduce(
    (valor, peso) =>
      valor +
      (peso.precoProduto?.valorUnitario ?? 0) *
      (peso.precoProduto?.quantidade ?? 0),
    0
  );

  const totalPorTamanho = tamanhosComQuantidade.reduce(
    (valor, peso) =>
      valor +
      (peso.precoProduto?.valorUnitario ?? 0) *
      (peso.precoProduto?.quantidade ?? 0),
    0
  );

  const totalPedido = totalPorPeso + totalPorTamanho;
  const naoFechouPedidoMinimo = totalPedido > (todasConfiguracoes?.pedidoMinimo ?? 0);

  async function init() {
    const response = await obterTodasConfiguracoesDePedido.fetch();
    setTodasConfiguracoes(response);
  }

  function montarBodyItens() {
    return [
      ...produtos.flatMap((produto) => {
        return produto.tamanhos
          .filter((x) => x.precoProduto?.quantidade)
          .map((tamanho) => {
            return {
              produtoId: produto.id,
              tamanhoId: tamanho.id,
              quantidade: tamanho.precoProduto?.quantidade ?? 0,
              valorUnitario: tamanho.precoProduto?.valorUnitario ?? 0,
            };
          });
      }),
      ...produtos.flatMap((produto) => {
        return produto.pesos
          .filter((x) => x.precoProduto?.quantidade)
          .map((peso) => {
            return {
              produtoId: produto.id,
              pesoId: peso.id,
              quantidade: peso.precoProduto?.quantidade ?? 0,
              valorUnitario: peso.precoProduto?.valorUnitario ?? 0,
            };
          });
      }),
    ]
  }

  async function submit() {
    if (
      (pesosComQuantidade.length === 0 && tamanhosComQuantidade.length === 0) ||
      !naoFechouPedidoMinimo
    ) {
      return;
    }

    if (!enderecoUsuario) {
      show("Informe o endereço de entrega");
      return;
    }

    const body = montarBodyItens();

    if (todasConfiguracoes?.cobrarFrete) {
      const response = await cotarFrete.fetch({
        cep: enderecoUsuario.cep,
        produtos: body
      });
      setCotacaoFrete(response);
      return;
    }


    if (body.length === 0) {
      return;
    }

    await submitGeral({
      itens: body,
      enderecoEntrega: enderecoUsuario,
    });
  }

  async function submitGeral(body: ICreatePedido) {
    const response = await criarPedido.fecth(body);

    if (response) {
      resetarCarrinho();
      navigate(rotas.home);
    }
  }

  async function submitFrete(freteId: number) {
    const cotacao = cotacaoFrete?.itens.find(x => x.id === freteId)
    if (!cotacao) {
      show("Frete não selecionado");
      return;
    }

    setCotacaoFrete(undefined);

    await submitGeral({
      itens: montarBodyItens(),
      enderecoEntrega: enderecoUsuario!,
      freteId,
      valorFrete: cotacao.preco
    });
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ViewModalFrete loading={cotarFrete.loading} submit={submitFrete} cotacao={cotacaoFrete} open={!!cotacaoFrete || cotarFrete.loading} close={() => setCotacaoFrete(undefined)} />
      <BoxApp
        height="calc(100vh - 150px)"
        display="flex"
        flexDirection="column"
        padding="1rem"
      >
        <TextApp titulo="Resumo" fontSize="18px" fontWeight={600} />
        <DividerApp width="100%" />
        <BoxApp
          display="flex"
          alignItems="start"
          justifyContent="center"
          flexDirection="column"
          gap=".5rem"
          width="100%"
          marginTop="1rem"
          height="100%"
        >
          <ViewTotalizadorCarrinho
            titulo="Quantidade de produtos"
            texto={`${produtos.length}`}
          />

          <ViewTotalizadorCarrinho
            titulo="Quantidade de tamanhos"
            texto={`${tamanhosComQuantidade.length}`}
          />
          <ViewTotalizadorCarrinho
            titulo="Quantidade de pesos"
            texto={`${pesosComQuantidade.length}`}
          />
        </BoxApp>
        <DividerApp width="100%" />
        <BoxApp
          height="100%"
          display="flex"
          alignItems="start"
          justifyContent="center"
          flexDirection="column"
          gap=".5rem"
          width="100%"
          marginTop="1rem"
        >
          <ViewTotalizadorCarrinho
            titulo="Total por peso"
            texto={formatMoney(totalPorPeso) ?? ""}
          />
          <ViewTotalizadorCarrinho
            titulo="Total por tamanho"
            texto={formatMoney(totalPorTamanho) ?? ""}
          />
          <ViewTotalizadorCarrinho
            titulo="Total"
            texto={formatMoney(totalPedido) ?? ""}
          />
        </BoxApp>
        <DividerApp width="100%" />
        {todasConfiguracoes?.pedidoMinimo && !naoFechouPedidoMinimo ? (
          <AlertApp
            tipo="error"
            texto={`Atenção, pedido mínimo no valor de: ${formatMoney(
              todasConfiguracoes.pedidoMinimo
            )}`}
            sx={{ marginTop: "1rem" }}
          />
        ) : (
          <></>
        )}
        <ViewEnderecoCarrinho />
        <BoxApp marginTop="1rem">
          <Button
            disabled={!naoFechouPedidoMinimo}
            title="FINALIZAr pedido"
            variant="contained"
            fullWidth
            loading={criarPedido.status === "loading"}
            onClick={submit}
          />
        </BoxApp>
      </BoxApp>
    </>
  );
}
