import { useState } from "react";
import { Tooltip } from "@mui/material";
import { getType } from "../../utils";

type SelectProps = {
  param: string;
  label: string;
  dotNotation: string;
  placeholder?: string;
  value?: string | number | null;
  onChange?: (value: string | number | boolean) => void;
  onClear?: () => void;
};

export default function Select({
  param,
  label,
  value,
  placeholder = "Select option",
  onChange = () => null,
  dotNotation,
  onClear = () => null,
}: SelectProps) {
  const [open, toggleOpen] = useState<boolean>(false);
  return (
    <div className="flex w-full px-3.5 mt-3 relative border rounded-lg border-gray-100 dark:border-white/10 dark:hover:border-white/20 focus-within:[rgba(77, 156, 255, 1)] dark:focus-within:rgba(77, 156, 255, 1)">
      <div className="bg-[#090b11] cursor-default flex max-w-[75%] items-baseline absolute top-[-0.6rem] bg-background-light dark:bg-background-dark px-1 space-x-2">
        <div className="flex space-x-2 max-w-full overflow-hidden">
          <div className="font-mono shrink-0 max-w-full text-xs overflow-hidden text-ellipsis whitespace-nowrap text-gray-700 dark:text-gray-300">
            {param}
          </div>
          <div className="relative overflow-hidden flex items-center">
            <div className="text-xs overflow-hidden whitespace-nowrap text-ellipsis font-mono text-gray-400">
              {label} · {getType(dotNotation)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center space-x-2 cursor-default">
        <div className="relative w-full" data-headlessui-state="">
          <button
            className="py-2.5 h-full w-full text-left bg-transparent outline-none text-sm font-mono text-gray-100"
            id="headlessui-menu-button-:r12:"
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            data-headlessui-state=""
            onClick={() => toggleOpen(!open)}
          >
            {value ?? placeholder}
          </button>
        </div>
        <div className="flex space-x-0.5">
          {value != null && (
            <button
              aria-label="delete parameter value"
              className="group p-1 cursor-pointer"
              onClick={onClear}
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
        </div>
      </div>
      {open && (
        <div
          className="z-20 bg-[#090b11] mt-1 left-0 right-0 w-full absolute py-1 top-9 border border-gray-200 dark:border-white/10 rounded-md shadow-gray-400/20 dark:shadow-none focus:outline-none font-mono text-sm"
          role="menu"
          data-headlessui-state="open"
          onBlur={() => toggleOpen(false)}
        >
          <button
            className="w-full flex items-center gap-3 py-2 px-4 cursor-pointer text-gray-600 dark:text-white/70"
            id="headlessui-menu-item-:r2m:"
            tabIndex={-1}
            onClick={() => onChange(true)}
          >
            <svg
              className="w-3 h-3 bg-transparent"
              style={{
                maskImage: `url(&quot;https://mintlify.b-cdn.net/v6.5.1/solid/check.svg&quot;)`,
                maskRepeat: "no-repeat",
                maskPosition: "center center",
              }}
            />
            true
          </button>
          <button
            className="w-full flex items-center gap-3 py-2 px-4 cursor-pointer text-gray-600 dark:text-white/70"
            id="headlessui-menu-item-:r2n:"
            onClick={() => onChange(false)}
          >
            <svg
              className="w-3 h-3 bg-gray-600 dark:bg-white/70"
              style={{
                maskImage: `url(&quot;https://mintlify.b-cdn.net/v6.5.1/solid/check.svg&quot;)`,
                maskRepeat: "no-repeat",
                maskPosition: "center center",
              }}
            ></svg>
            false
          </button>
        </div>
      )}
    </div>
  );
}
