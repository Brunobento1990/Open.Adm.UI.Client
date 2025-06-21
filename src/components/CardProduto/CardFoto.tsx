import { BoxApp } from "../Box/BoxApp";
import { ImageApp } from "../Image/ImageApp";
import styled from "./CarProduto.module.css";

interface propsFotoCard {
  backgroundColor: string;
  foto: string;
  descricao: string;
  borderRadius: string;
  width: string;
}

export function CardFoto(props: propsFotoCard) {
  return (
    <BoxApp
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={'100%'}
      maxWidth="320px"
      height="auto"
      overflowx="hidden"
      overflowy="hidden"
      position="relative"
      borderRadius={props.borderRadius}
    >
      <ImageApp
        className={styled.cardproduto}
        src={props.foto}
        alt={props.descricao}
        height={'auto'}
        width={'100%'}
        borderRadius="5px"
        objectFit="cover"
      />
    </BoxApp>
  );
}
