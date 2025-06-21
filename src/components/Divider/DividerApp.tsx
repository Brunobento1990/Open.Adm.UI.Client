import { Chip, Divider } from "@mui/material";

interface propsDividerApp {
  chip?: string;
  width?: string;
}

export function DividerApp(props: propsDividerApp) {
  if (props.chip) {
    return (
      <Divider sx={{ width: props.width }}>
        <Chip label={props.chip} />
      </Divider>
    );
  }

  return <Divider sx={{ width: props.width }} />;
}
