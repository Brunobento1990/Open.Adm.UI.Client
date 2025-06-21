import { IBase } from "./Base";
import { IPeso } from "./Peso";
import { IProduto } from "./Produto";
import { ITamanhos } from "./Tamanho";
import { IUsuario } from "./Usuario";

export interface IPedido extends IBase {
  statusPedido: StatusPedido;
  valorTotal: number;
  usuario: IUsuario;
  itensPedido: IItemPedido[];
}

export type StatusPedido = 0 | 1 | 2 | 3 | 4;

export interface IItemPedido extends IBase {
  pesoId?: string;
  peso?: IPeso;
  tamanhoId?: string;
  tamanho?: ITamanhos;
  produtoId: string;
  produto: IProduto;
  pedidoId: string;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
}
