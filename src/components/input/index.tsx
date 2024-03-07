import React from "react";
import { InputAdornment, TextField, Tooltip } from "@mui/material";
import { getType, isRequired } from "../../utils";

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

export default function Input({
  placeholder,
  param,
  label,
  value,
  onChange = () => null,
  dotNotation,
  onClear = () => null,
}: InputProps) {
  return (
    <TextField
      sx={{
        color: "white",
        "& .MuiOutlinedInput-root": {
          height: "42px",
          zIndex: 1,
          position: "relative",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.1)",
            opacity: 1,
            borderRadius: "6px",
            zIndex: 1,
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.2)",
            zIndex: 1,
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(77, 156, 255, 1)",
            zIndex: 1,
          },
        },
        "& .MuiInputBase-input": {
          color: "#e2e8f0",
          opacity: 1,
          zIndex: 1,
        },
        "& .MuiInputLabel-root": {
          color: "#e2e8f0",
          zIndex: 1,
        },
      }}
      id="outlined-basic"
      label={
        <div>
          {param} {label} · {getType(dotNotation)}{" "}
          {isRequired(dotNotation) ? (
            <span style={{ color: "red" }}>*</span>
          ) : (
            ""
          )}
        </div>
      }
      value={value != null ? value : ""}
      variant="outlined"
      className="flex w-full px-3.5 mt-3 relative border rounded-lg border-gray-100 dark:border-white/10 dark:hover:border-white/20 focus-within:[rgba(77, 156, 255, 1)] dark:focus-within:rgba(77, 156, 255, 1)"
      type={getType(dotNotation)}
      placeholder={placeholder}
      InputLabelProps={{ shrink: true }}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment className="cursor-pointer space-x-1" position="end">
            <div className="flex space-x-0.5">
              {value != null && (
                <button
                  onClick={onClear}
                  aria-label="delete parameter value"
                  className="group p-1 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 bg-gray-300 group-hover:bg-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-300"
                    style={{
                      maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/regular/trash.svg')`,
                      maskRepeat: "no-repeat",
                      maskPosition: "center center",
                    }}
                  ></svg>
                </button>
              )}
              <div className="group relative p-1">
                <Tooltip
                  title={
                    <div className="space-x-2 px py-2 items-center w-fit flex bg-[#0A0A0A] text-white rounded">
                      <div className=" text-white font-mono text-xs m-0 p-0">
                        {param}
                      </div>
                      <div className="flex items-center rounded px-1.5 py-0.5 bg-white/[.15] text-white text-xs">
                        {getType(dotNotation)}
                      </div>
                    </div>
                  }
                  componentsProps={{
                    tooltip: {
                      sx: {
                        paddingLeft: "4px",
                        paddingRight: "4px",
                        bgcolor: "#090b11",
                        width: "fit-content",
                        border: "solid",
                        borderWidth: "1px",
                        borderColor: "hsla(0,0%,100%,.1)",
                      },
                    },
                  }}
                >
                  <svg
                    className="w-4 h-4 bg-gray-300 group-hover:bg-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-300"
                    style={{
                      maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/regular/circle-info.svg')`,
                      maskRepeat: "no-repeat",
                      maskPosition: "center center",
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </InputAdornment>
        ),
      }}
    />
  );
}
