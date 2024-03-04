import React from "react";
import Button from "@mui/material/Button";
import { InputAdornment, TextField } from "@mui/material";
import { TrashIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { StateDotNotationTypeMap } from "../../state/reducer";
import {
  dotNotationContainArrayIndex,
  removeArrayIndexFromDotNotation,
} from "../../utils";

type InputProps = {
  param: string;
  label: string;
  placeholder: string;
  dotNotation: string;
  value?: string | number | null;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onClear?: () => void;
};

export function getType(dotNotation: string) {
  let key;
  if (dotNotationContainArrayIndex(dotNotation)) {
    key = removeArrayIndexFromDotNotation(dotNotation);
  } else {
    key = dotNotation;
  }

  const type = StateDotNotationTypeMap[key];
  return type ?? "string";
}

export default function Input({
  placeholder,
  param,
  label,
  value,
  onChange,
  dotNotation,
  onClear = () => null,
}: InputProps) {
  return (
    <TextField
      sx={{
        color: "white",
        "& .MuiOutlinedInput-root": {
          height: "42px",
          "& fieldset": {
            borderColor: "hsla(0,0%,100%,.1)",
            opacity: 1,
            borderRadius: "6px",
          },
          "&:hover fieldset": {
            opacity: 0.4,
            borderColor: "rgba(229, 231, 235)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4C9CFF",
          },
        },
        "& .MuiInputBase-input": {
          color: "white",
          opacity: 1,
        },
        "& .MuiInputLabel-root": {
          color: "white",
        },
      }}
      id="outlined-basic"
      label={`${param} ${label} · ${getType(dotNotation)}`}
      value={value != null ? value : ""}
      variant="outlined"
      className="w-full"
      type={getType(dotNotation)}
      placeholder={placeholder}
      InputLabelProps={{ shrink: true }}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment className="cursor-pointer space-x-1" position="end">
            {value != "" && value != null && (
              <button onClick={onClear}>
                <TrashIcon className="text-md text-[hsla(0,0%,100%,.1)] hover:text-white" />
              </button>
            )}
            <button>
              <InfoCircledIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white" />
            </button>
          </InputAdornment>
        ),
      }}
    />
  );
}
