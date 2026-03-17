import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "react";
import { IconApp } from "../Icon/IconApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useAppParceiroContext } from "@/context/AppParceiroContext";

interface propsModalApp {
  open: boolean;
  close: () => void;
  children: ReactNode;
  fullWidth?: boolean;
  maxWidth?: "lg" | "md" | "sm" | "xl" | "xs";
}

export default function ModalApp(props: propsModalApp) {
  const { parceiro } = useAppParceiroContext();
  return (
    <Dialog
      maxWidth={props.maxWidth}
      fullWidth={props.fullWidth}
      open={props.open}
      onClose={props.close}
    >
      <DialogTitle>{parceiro?.nomeFantasia ?? ""}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.close}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <IconApp icon={listaDeIcones.close} />
      </IconButton>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}
