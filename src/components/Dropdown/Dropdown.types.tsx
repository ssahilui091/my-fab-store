import { SelectChangeEvent, SxProps } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

export interface DropdownProps {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  handleChange?:
    | ((event: SelectChangeEvent<string>, child: ReactNode) => void)
    | undefined;
  value?: string;
  label?: string;
  options: string[];
  sx?: SxProps;
  disabled?: boolean;
}
