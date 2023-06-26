import { TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface AppTextInputProps extends UseControllerProps {
  label: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
}

const AppTextInput = (props: AppTextInputProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <TextField
      {...props}
      {...field}
      type={props.type}
      multiline={props.multiline}
      rows={props.rows}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};

export default AppTextInput;
