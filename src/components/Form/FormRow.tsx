import { propsFormRow } from "@/types/Form";
import { Box, Grid2 } from "@mui/material";

export function FormRow(props: propsFormRow) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: props.marginBotton ?? "12px",
        width: props.width,
        padding: props.padding,
        marginTop: props.marginTop ?? "5px",
        borderBottom: props.borderBottom,
        backgroundColor: props.backGroudnColor,
        borderRadius: props.borderRadius,
      }}
    >
      <Grid2 container spacing={props.spacing} direction={props.direction}>
        {props.children}
      </Grid2>
    </Box>
  );
}
