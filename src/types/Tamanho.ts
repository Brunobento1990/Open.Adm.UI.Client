import { IBase } from "./Base";
import { IPrecoProduto } from "./PrecoProduto";

export interface ITamanhos extends IBase {
  descricao: string;
  precoProduto?: IPrecoProduto;
}
