import { propsFormRow } from "@/types/Form";
import { Grid2 } from "@mui/material";

export function FormItemRow(props: propsFormRow) {
  return (
    <Grid2
      size={{ xs: props.xs, md: props.md, sm: props.sm }}
      sx={{ marginTop: props.marginTop }}
    >
      {props.children}
    </Grid2>
  );
}
