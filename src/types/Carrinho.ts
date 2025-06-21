import { IEnderecoBase } from "./Base";
import { IProduto } from "./Produto";

export interface ICarrinho {
  itens: IProduto[];
  enderecoUsuario?: IEnderecoBase;
}
