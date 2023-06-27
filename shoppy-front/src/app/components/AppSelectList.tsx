import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface AppSelectListProps extends UseControllerProps {
  label: string;
  items: string[];
}

const AppSelectList = (props: AppSelectListProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select value={field.value} label={props.label} onChange={field.onChange}>
        {props.items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
};

export default AppSelectList;
