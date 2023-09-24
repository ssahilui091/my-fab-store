import { SxProps } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  children?: ReactNode;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  sx?: SxProps;
}
