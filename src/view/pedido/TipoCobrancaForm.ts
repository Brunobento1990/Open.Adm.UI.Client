import { PixCobrancaForm } from '@/components/Cobranca/PixCobranca';
import { ICobrarPedidoResponse } from '@/types/CobrarPedido';
import { TipoCobranca } from '@/types/TipoCobranca';

export interface ITipoCobrancaProps {
  cobranca?: ICobrarPedidoResponse;
}

export const CardsCobranca: Record<TipoCobranca, React.ComponentType<ITipoCobrancaProps>> = {
  1: PixCobrancaForm,
};
