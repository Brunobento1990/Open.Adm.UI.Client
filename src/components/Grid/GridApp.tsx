import { Grid2 } from "@mui/material";
import { ReactNode } from "react";

interface propsGridApp {
  children: ReactNode;
  width?: string;
  container?: boolean;
  spacing?: number;
  xs?: number;
  sm?: number;
  padding?: string;
}

export function GridApp(props: propsGridApp) {
  return (
    <Grid2
      width="100%"
      spacing={props.spacing}
      container={props.container}
      size={{ xs: props.xs, sm: props.sm }}
      padding={props.padding}
    >
      {props.children}
    </Grid2>
  );
}
