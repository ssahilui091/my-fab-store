
import Button from "@mui/material/Button";
import { ButtonProps } from "./Button.types";

export default function ButtonComponent(props: ButtonProps) {
  return (
    <div>
      <Button
        onClick={props.onClick}
        sx={props.sx}
        variant={props.variant}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
    </div>
  );
}
