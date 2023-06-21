import { Checkbox, FormControlLabel } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface AppCheckboxProps extends UseControllerProps {
  label: string;
}

const AppCheckbox = (props: AppCheckboxProps) => {
  const { field } = useController({ ...props, defaultValue: false });
  return (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} color="secondary" />}
      label={props.label}
    />
  );
};

export default AppCheckbox;
