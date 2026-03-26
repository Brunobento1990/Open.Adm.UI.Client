import { TipoCobranca } from './TipoCobranca';

export interface ICobrarPedido {
  pedidoId: string;
  tipoCobranca: TipoCobranca;
}

export interface ICobrarPedidoResponse {
  qrCodePix?: string;
}
