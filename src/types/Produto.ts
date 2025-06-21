import { IBase } from "./Base";
import { ICategoria } from "./Categoria";
import { IPeso } from "./Peso";
import { ITamanhos } from "./Tamanho";

export interface IProduto extends IBase {
  descricao: string;
  foto: string;
  referencia?: string;
  categoria: ICategoria;
  especificacaoTecnica?: string;
  pesos: IPeso[];
  tamanhos: ITamanhos[];
}
