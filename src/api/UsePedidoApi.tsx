import { useApi } from "@/hooks/UseApi";
import { IPedidoMinimo } from "@/types/PedidoMinimo";
import { pedidoRotasApi } from "./rotas/PedidoRotasApi";
import { ICreatePedido } from "@/types/CreatePedido";
import { IPedido, StatusPedido } from "@/types/Pedido";

export function UsePedidoApi() {
  const apiPedidoMinimo = useApi({
    method: "GET",
    url: pedidoRotasApi.pedidoMinimo,
    naoRenderizarErro: true,
    naoRenderizarResposta: true,
  });

  const apiPedidoStatus = useApi({
    method: "GET",
    url: pedidoRotasApi.pedidoStatus,
    statusInicial: "loading",
  });

  const apiPedidoId = useApi({
    method: "GET",
    url: pedidoRotasApi.pedidoId,
    statusInicial: "loading",
  });

  const apiPedidoCreate = useApi({
    method: "POST",
    url: pedidoRotasApi.createPedido,
  });

  const apiPedidoCancelar = useApi({
    method: "PUT",
    url: pedidoRotasApi.cancelarPedido,
  });

  async function obterPedidoMinimo(): Promise<IPedidoMinimo | undefined> {
    return await apiPedidoMinimo.action();
  }

  async function criarPedido(body: ICreatePedido): Promise<any> {
    return await apiPedidoCreate.action({
      body,
      message: "Pedido criado com sucesso!",
    });
  }

  async function obterPorStatus(
    statusPedido: StatusPedido
  ): Promise<IPedido[] | undefined> {
    return await apiPedidoStatus.action({ urlParams: `${statusPedido}` });
  }

  async function obterPorId(pedidoId: string): Promise<IPedido | undefined> {
    return await apiPedidoId.action({ urlParams: `${pedidoId}` });
  }

  async function cancelarPedido(body: any): Promise<any> {
    return await apiPedidoCancelar.action({
      body,
      message: "Pedido cancelado com sucesso!",
    });
  }

  return {
    obterPedidoMinimo: {
      fetch: obterPedidoMinimo,
      status: apiPedidoMinimo.status,
    },
    criarPedido: {
      fecth: criarPedido,
      status: apiPedidoCreate.status,
    },
    obterPorStatus: {
      fetch: obterPorStatus,
      status: apiPedidoStatus.status,
    },
    obterPorId: {
      fetch: obterPorId,
      status: apiPedidoId.status,
    },
    cancelarPedido: {
      fetch: cancelarPedido,
      status: apiPedidoCancelar.status,
    },
  };
}
