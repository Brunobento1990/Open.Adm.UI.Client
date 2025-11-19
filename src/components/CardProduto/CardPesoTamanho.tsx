import { IPrecoProduto } from "@/types/PrecoProduto";
import { BoxApp } from "../Box/BoxApp";
import { TextApp } from "../Text/TextApp";
import { formatMoney } from "@/utils/FormatMoney";
import { Badge, Chip } from "@mui/material";
import { IconApp } from "../Icon/IconApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { InputApp, MaskType } from "../Input/InputApp";

interface propsCardPesoTamanho {
  descricao: string;
  id: string;
  precoProduto?: IPrecoProduto;
  onChange: (qtd?: number) => void;
  onBlur?: () => void;
  temEstoqueDisponivel?: boolean;
}

export function CardPesoTamanho(props: propsCardPesoTamanho) {
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="100%"
      gap="0.5rem"
    >
      <TextApp titulo={props.descricao} width="100%" maxWidth="50px" />
      {props.temEstoqueDisponivel ? (
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
      ) : (
        <Chip
          sx={{
            marginTop: ".3rem",
            width: "110px",
          }}
          color="error"
          size="small"
          label={"Sem estoque"}
        />
      )}
      {props.precoProduto && (
        <Chip
          sx={{
            marginTop: ".3rem",
            width: "100px",
          }}
          size="small"
          icon={<IconApp icon={listaDeIcones.etiqueta} />}
          label={formatMoney(props.precoProduto.valorUnitario) ?? ""}
        />
      )}
    </BoxApp>
  );
}
