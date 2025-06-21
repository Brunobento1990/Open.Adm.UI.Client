import { IEnderecoBase } from "./Base";

export interface ICreatePedido {
  itens: IItemCreatePedido[];
  enderecoEntrega: IEnderecoBase;
}

export interface IItemCreatePedido {
  produtoId: string;
  pesoId?: string;
  tamanhoId?: string;
  quantidade: number;
  valorUnitario: number;
}
