import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface RadioGroupProps {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

const RadioButtonGroup = ({
  options,
  onChange,
  selectedValue,
}: RadioGroupProps) => {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
