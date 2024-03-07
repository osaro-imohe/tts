<!-- import {
  TrashIcon,
  InfoCircledIcon,
  EnterFullScreenIcon,
} from "@radix-ui/react-icons";
import Input from "../input";
import { useStateDispatch } from "../../state/context";
import { Action } from "../../state/reducer";
import { useEffect, useState } from "react";

type ObjectType = {
  [key: string]:
    | string
    | number
    | boolean
    | Record<string, string | number>
    | Record<string, string | number>[]
    | null;
};

type FormBuilderProps = {
  obj: ObjectType;
  label: string;
};

function capitalizeBeforeDashOrUnderscore(str: string) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const renderInputs = (
  label: string,
  obj: ObjectType,
  dispatch: React.Dispatch<Action>,
  properties: Record<string, boolean>,
  updateVisibleKeys: (newString: string, value: boolean) => void,
  prefix = "",
) => {
  return Object.keys(obj).map((key, index) => {
    const nestedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null)
      return (
        <div className="block w-full py-5 px-3.5 mt-3 relative border rounded-lg border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 focus-within:!border-gray-300 dark:focus-within:!border-white/20 cursor-ns-resize">
          <label className="bg-[#090B11] absolute top-0 left-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal">
            <p>{`${key} · object`}</p>
          </label>
          <label className="w-fit flex bg-[#090B11] absolute top-0 right-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal space-x-2">
            <TrashIcon className="text-md text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
            <InfoCircledIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
            <EnterFullScreenIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
          </label>
          <div className="w-full space-y-5">
            {renderInputs(
              label,
              obj[key] as Record<string, string | number>,
              dispatch,
              properties,
              updateVisibleKeys,
              nestedKey,
            )}
            {properties.hasOwnProperty(`${label}.${nestedKey}`) && (
              <button
                onClick={() => {
                  updateVisibleKeys(`${label}.${nestedKey}`, false);
                }}
                aria-label="add new property to object"
                className="flex px-3.5 focus-within:!border-primary dark:focus-within:!border-primary-light border-gray-200/80 dark:border-white/10 dark:hover:border-white/40 w-full border-dashed border-2 rounded-lg transition-[height] h-10"
              >
                <form
                  className="w-full h-full  flex text-start"
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    // dispatch({
                    //   type: "SET_VALUE",
                    //   payload: { key: `${label}.${nestedKey}.${formProps[0]}`, value: "" }
                    // });
                    // updateVisibleKeys(`${label}.${nestedKey}`, true)
                    }
                  }
                >
                  <input
                    autoFocus
                    type="text"
                    spellCheck={false}
                    name="inputFieldName"
                    data-focus-visible-added=""
                    // onChange={(e) => }
                    placeholder="Enter key of new property"
                    onBlur={() => updateVisibleKeys(`${label}.${nestedKey}`, false)}
                    className="py-2.5 flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-white/30 font-mono focus-visible"
                  />
                </form>
              </button>
            )}
            {!properties.hasOwnProperty(`${label}.${nestedKey}`) && (
              <button
                onClick={(e) => {
                  updateVisibleKeys(`${label}.${nestedKey}`, true);
                }}
                aria-label="add new property to object"
                className="flex px-3.5 focus-within:!border-primary dark:focus-within:!border-primary-light border-gray-200/80 dark:border-white/10 dark:hover:border-white/40 w-full border-dashed border-2 rounded-lg transition-[height] h-6 hover:bg-gray-50 dark:hover:bg-transparent active:bg-gray-100 items-center justify-center cursor-pointer"
              >
                <svg
                  className="bg-gray-400 dark:bg-white/40 h-2.5 w-2.5"
                  style={{
                    maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/solid/plus.svg')`,
                    maskRepeat: "no-repeat",
                    maskPosition: "center center",
                  }}
                />
              </button>
            )}
          </div>
        </div>
      );
    return (
      <Input
        param={key}
        key={`${key} - ${index}`}
        placeholder={`Enter ${key}`}
        value={obj[key] as string | number}
        label={`${capitalizeBeforeDashOrUnderscore(key)}`}
        type={
          typeof obj[key] === "string" || typeof obj[key] === "number"
            ? typeof obj[key]
            : undefined
        }
        onChange={(
          e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >,
        ) =>
          dispatch({
            type: "SET_VALUE",
            payload: { key: `${label}.${nestedKey}`, value: e.target.value },
          })
        }
      />
    );
  });
};

export default function FormBuilder({ obj, label }: FormBuilderProps) {
  const { dispatch } = useStateDispatch();
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [newProps, setNewProps] = useState<Record<string, boolean>>({});

  useEffect(() => console.log(newProps), [newProps]);

  const updateProperties = (newString: string, visible: boolean) => {
    const updatedProps = { ...newProps };

    if (!visible) {
      delete updatedProps[newString];
    } else if (visible) {
      updatedProps[newString] = visible;
    }

    setNewProps(updatedProps);
  };

  const renderedInputs = renderInputs(
    label,
    obj,
    dispatch,
    newProps,
    updateProperties,
  );

  return <>{renderedInputs}</>;
} -->
