import { IPrecoProduto } from "@/types/PrecoProduto";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";
import { formatMoney } from "@/utils/FormatMoney";
import { IconApp } from "../Icon/IconApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { InputApp, MaskType } from "../Input/InputApp";
import { ChipApp } from "../Chip/ChipApp";

interface propsCardPesoTamanho {
  descricao: string;
  id: string;
  precoProduto?: IPrecoProduto;
  onChange: (qtd?: number) => void;
  onBlur?: () => void;
}

export function CardPesoTamanho(props: propsCardPesoTamanho) {
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="100%"
    >
      <TextApp titulo={props.descricao} width="100%" maxWidth="50px" />
      <InputApp
        label="QTD"
        width="100px"
        mask={MaskType.SOMENTE_NUMERO}
        id={`${props.id}`}
        value={props.precoProduto?.quantidade}
        onChange={(_, value) => props.onChange(value)}
        onBlur={props.onBlur}
        maxLength={10}
      />
      {props.precoProduto && (
        <ChipApp
          width="100px"
          color="primary"
          icone={listaDeIcones.etiqueta}
          label={formatMoney(props.precoProduto.valorUnitario) ?? ""}
        />
      )}
    </BoxApp>
  );
}
