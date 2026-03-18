import { IEnderecoBase } from "./Base";

export interface ICreatePedido {
  itens: IItemCreatePedido[];
  enderecoEntrega: IEnderecoBase;
  freteId?: number;
  valorFrete?: number;
}

export interface IItemCreatePedido {
  produtoId: string;
  pesoId?: string;
  tamanhoId?: string;
  quantidade: number;
  valorUnitario: number;
}
