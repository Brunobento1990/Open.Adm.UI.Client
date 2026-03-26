import { ITipoCobrancaProps } from '@/view/pedido/TipoCobrancaForm';

export function PixCobrancaForm(props: ITipoCobrancaProps) {
  return <>{props.cobranca?.qrCodePix}</>;
}
