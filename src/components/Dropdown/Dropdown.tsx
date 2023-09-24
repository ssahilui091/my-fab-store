
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DropdownProps } from "./Dropdown.types";

export default function Dropdown(props: DropdownProps) {
  return (
    <Box sx={props.sx}>
      <FormControl fullWidth>
        <InputLabel id="dropdown-label">{props.label}</InputLabel>
        <Select
        onClick={props.onClick}
          disabled={props?.disabled}
          labelId="dropdown-label"
          id="dropdown"
          value={props?.value}
          label={props.label}
          onChange={props?.handleChange}
        >
          {props?.options?.map((option, index) => {
            return (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
