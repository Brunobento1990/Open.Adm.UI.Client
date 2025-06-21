import { useApi } from "@/hooks/UseApi";
import { IPaginacaoResponse } from "@/types/PaginacaoResponse";
import { IProduto } from "@/types/Produto";
import { IProdutoPaginacao } from "@/types/ProdutoPaginacao";

export function useProdutoApi() {
  const apiListarPorCategoria = useApi({
    method: "GET",
    url: "produtos/list-by-categorias?categoriaId=",
  });

  const apiListarPaginacao = useApi({
    method: "GET",
    url: "produtos/list",
  });

  async function listarPorCategorias(
    categoriaId: string
  ): Promise<IProduto[] | undefined> {
    return await apiListarPorCategoria.action({
      urlParams: categoriaId,
    });
  }

  async function paginacaoProduto(
    produtoPaginacao: IProdutoPaginacao
  ): Promise<IPaginacaoResponse<IProduto> | undefined> {
    return await apiListarPaginacao.action({
      urlParams: `?page=${produtoPaginacao.page}&categoriaId=${
        produtoPaginacao.categoriaId ?? ""
      }&pesoId=${produtoPaginacao.pesoId ?? ""}&tamanhoId=${
        produtoPaginacao.tamanhoId ?? ""
      }`,
    });
  }

  return {
    listarPorCategorias: {
      fetch: listarPorCategorias,
      status: apiListarPorCategoria.status,
    },
    paginacaoProduto: {
      fetch: paginacaoProduto,
      status: apiListarPaginacao.status,
    },
  };
}
