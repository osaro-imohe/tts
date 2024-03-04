import {
  TrashIcon,
  InfoCircledIcon,
  EnterFullScreenIcon,
} from "@radix-ui/react-icons";
import Input, { getType } from "../input";
import { useStateDispatch } from "../../state/context";
import {
  Action,
  AppState,
  initial_pronunciation_dictionary_locators,
} from "../../state/reducer";
import {
  capitalizeBeforeDashOrUnderscore,
  dotNotationContainArrayIndex,
  getValueFromKey,
  keyExistsInObj,
  parseNumericValueOrString,
  splitArrayDotNotation,
} from "../../utils";
import { useState } from "react";
import { snakeToCamel } from "../../utils";

export type ObjectType = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | Record<string, string | number | boolean | null>
    | Record<string, string | number | boolean | null>[]
    | ObjectType;
};

type RenderInputProps = {
  state: ObjectType;
  dispatch: React.Dispatch<Action>;
  label: string;
  obj: ObjectType;
  prefix?: string;
};

type RecursiveInputProps = {
  obj: ObjectType;
  label: string;
};

function clearStateValue(
  state: ObjectType,
  dispatch: React.Dispatch<Action>,
  dotNotation: string,
) {
  let value;
  const keys = dotNotation.split(".");
  const lastKey = keys[keys.length - 1];
  const containsArray = dotNotationContainArrayIndex(dotNotation);
  const obj = getValueFromKey(state, dotNotation);

  if (containsArray && lastKey.includes("[") && lastKey.includes("]")) {
    const [accessor, idx] = splitArrayDotNotation(dotNotation);
    const arr = getValueFromKey(state, accessor);
    arr.splice(idx, 1);
    value = arr;
  } else if (containsArray && typeof lastKey === "string") {
    const [accessor, idx, key] = splitArrayDotNotation(dotNotation);
    const arr = getValueFromKey(state, accessor);
    const obj = { ...arr[idx] };
    obj[key] = null;
    arr[idx] = obj;
    value = arr;
  } else if (Array.isArray(getValueFromKey(state, dotNotation))) {
    value = [];
  } else if (typeof obj === "object") {
    const tempObj = { ...obj };
    for (let key in tempObj) {
      tempObj[key] = null;
    }
    value = tempObj;
  } else {
    value = null;
  }

  const switchKey = containsArray
    ? splitArrayDotNotation(dotNotation)[0]
    : dotNotation;

  dispatch({
    type: "SET_VALUE",
    payload: {
      key: switchKey,
      value,
    },
  });
}

function RenderInput({
  state,
  dispatch,
  label,
  obj,
  prefix,
}: RenderInputProps) {
  const nestedKeyPrefix = prefix ? `${prefix}.` : "";
  const [visible, setVisible] = useState<string>("");
  const [params, setParams] = useState<Record<string, string>>({});

  const updateVisible = (key: string) => setVisible(key);

  const addNewParam = (key: string, value: string) => {
    const newObj = { ...params };
    newObj[key] = value;
    setParams(newObj);
  };

  const removeParam = (key: string) => {
    const newObj = { ...params };
    delete newObj[key];
    setParams(newObj);
  };

  return (
    <>
      {Object.keys(obj).map((key, index) => {
        const nestedKey = `${nestedKeyPrefix}${key}`;
        if (Array.isArray(obj[key])) {
          return (
            <div className="block w-full py-5 px-3.5 mt-3 relative border rounded-lg border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 focus-within:!border-gray-300 dark:focus-within:!border-white/20 cursor-ns-resize">
              <label className="cursor-pointer bg-[#090B11] absolute top-0 left-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal">
                <p>{`${key} ${capitalizeBeforeDashOrUnderscore(key)} · array`}</p>
              </label>
              <label className="cursor-pointer w-fit flex bg-[#090B11] absolute top-0 right-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal space-x-2">
                {obj[key] != null && (
                  <button
                    onClick={() =>
                      clearStateValue(state, dispatch, `${label}.${nestedKey}`)
                    }
                  >
                    <TrashIcon className="text-md text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
                  </button>
                )}
                <InfoCircledIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
                <EnterFullScreenIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
              </label>
              <div className="space-y-4">
                {(obj[key] as ObjectType[]).map(
                  (item: ObjectType, index: number) => (
                    <div className="block w-full py-5 px-3.5 mt-3 relative border rounded-lg border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 focus-within:!border-gray-300 dark:focus-within:!border-white/20 cursor-ns-resize">
                      <label className="bg-[#090B11] absolute top-0 left-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal">
                        <p>{`${isNaN(Number(key)) ? key : snakeToCamel(`${prefix}_db_model`)} · object`}</p>
                      </label>
                      <label className="cursor-pointer w-fit flex bg-[#090B11] absolute top-0 right-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal space-x-2">
                        <button
                          onClick={() =>
                            clearStateValue(
                              state,
                              dispatch,
                              `${label}.${nestedKey}.[${index}]`,
                            )
                          }
                        >
                          <TrashIcon className="text-md text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
                        </button>
                        <InfoCircledIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
                        <EnterFullScreenIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
                      </label>
                      <div className="space-y-4">
                        <RenderInput
                          obj={item as ObjectType}
                          label={label}
                          state={state}
                          prefix={`${nestedKey}.[${index}]`}
                          dispatch={dispatch}
                          key={`${key}-${index}`}
                        />
                        {visible.includes(
                          `${label}.${nestedKey}.[${index}]`,
                        ) && (
                          <button
                            aria-label="add new property to object"
                            onClick={() =>
                              updateVisible(`${nestedKey}.[${index}]`)
                            }
                            className="flex px-3.5 focus-within:!border-primary dark:focus-within:!border-primary-light border-gray-200/80 dark:border-white/10 dark:hover:border-white/40 w-full border-dashed border-2 rounded-lg transition-[height] h-10"
                          >
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const arr = getValueFromKey(
                                  state,
                                  `${label}.${nestedKey}`,
                                );
                                const obj = { ...arr[index] };
                                const objectContainsKey = keyExistsInObj(
                                  obj,
                                  params[`${label}.${nestedKey}.[${index}]`],
                                );
                                if (objectContainsKey) return;
                                obj[
                                  params[`${label}.${nestedKey}.[${index}]`]
                                ] = "";
                                arr[index] = obj;
                                dispatch({
                                  type: "SET_VALUE",
                                  payload: {
                                    key: `${label}.${nestedKey}`,
                                    value: arr,
                                  },
                                });
                                removeParam(`${label}.${nestedKey}.[${index}]`);
                              }}
                              className="w-full h-full  flex text-start"
                            >
                              <input
                                autoFocus
                                type="text"
                                spellCheck={false}
                                name="inputFieldName"
                                data-focus-visible-added=""
                                placeholder="Enter key of new property"
                                value={
                                  params[`${label}.${nestedKey}.[${index}]`] ??
                                  ""
                                }
                                onChange={(e) => {
                                  addNewParam(
                                    `${label}.${nestedKey}.[${index}]`,
                                    e.target.value,
                                  );
                                }}
                                className={`py-2.5 flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-white/30 font-mono focus-visible ${keyExistsInObj(getValueFromKey(state, `${label}.${nestedKey}`)[index], params[`${label}.${nestedKey}.[${index}]`] ?? "") && "underline decoration-wavy decoration-red-400"}`}
                              />
                            </form>
                          </button>
                        )}
                        {!visible.includes(
                          `${label}.${nestedKey}.[${index}]`,
                        ) && (
                          <button
                            onClick={() =>
                              updateVisible(`${label}.${nestedKey}.[${index}]`)
                            }
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
                  ),
                )}
                <button
                  onClick={() => {
                    const arr = getValueFromKey(state, `${label}.${nestedKey}`);
                    dispatch({
                      type: "SET_VALUE",
                      payload: {
                        key: `${label}.${nestedKey}`,
                        value: [
                          ...(arr ?? []),
                          initial_pronunciation_dictionary_locators,
                        ],
                      },
                    });
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
              </div>
            </div>
          );
        }
        if (
          typeof obj[key] === "object" &&
          obj[key] != null &&
          !Array.isArray(obj[key])
        ) {
          return (
            <div className="block w-full py-5 px-3.5 mt-3 relative border rounded-lg border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 focus-within:!border-gray-300 dark:focus-within:!border-white/20 cursor-ns-resize">
              <label className="cursor-pointer bg-[#090B11] absolute top-0 left-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal">
                <p>{`${isNaN(Number(key)) ? key : snakeToCamel(`${prefix}_db_model`)} · object`}</p>
              </label>
              <label className="cursor-pointer w-fit flex bg-[#090B11] absolute top-0 right-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal space-x-2">
                <button
                  onClick={() =>
                    clearStateValue(state, dispatch, `${label}.${nestedKey}`)
                  }
                >
                  <TrashIcon className="text-md text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
                </button>
                <InfoCircledIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
                <EnterFullScreenIcon className="text-[hsla(0,0%,100%,.1)] hover:text-white m-0" />
              </label>
              <div className="space-y-4">
                <RenderInput
                  state={state}
                  label={label}
                  prefix={nestedKey}
                  dispatch={dispatch}
                  obj={obj[key] as ObjectType}
                  key={`${key}-${index}`}
                />
                {visible.includes(`${label}.${nestedKey}`) && (
                  <button
                    aria-label="add new property to object"
                    onClick={() => updateVisible(`${label}.${nestedKey}`)}
                    className="flex px-3.5 focus-within:!border-primary dark:focus-within:!border-primary-light border-gray-200/80 dark:border-white/10 dark:hover:border-white/40 w-full border-dashed border-2 rounded-lg transition-[height] h-10"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (
                          keyExistsInObj(
                            state,
                            `${label}.${nestedKey}.${params[`${label}.${nestedKey}`]}`,
                          )
                        )
                          return;
                        dispatch({
                          type: "SET_VALUE",
                          payload: {
                            key: `${label}.${nestedKey}.${params[`${label}.${nestedKey}`]}`,
                            value: "",
                          },
                        });
                        removeParam(`${label}.${nestedKey}`);
                      }}
                      className="w-full h-full  flex text-start"
                    >
                      <input
                        autoFocus
                        type="text"
                        spellCheck={false}
                        name="inputFieldName"
                        data-focus-visible-added=""
                        placeholder="Enter key of new property"
                        value={params[`${label}.${nestedKey}`] ?? ""}
                        onChange={(e) =>
                          addNewParam(`${label}.${nestedKey}`, e.target.value)
                        }
                        className={`py-2.5 flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-white/30 font-mono focus-visible ${keyExistsInObj(state, `${label}.${nestedKey}.${params[`${label}.${nestedKey}`]}`) && "underline decoration-wavy decoration-red-400"}`}
                      />
                    </form>
                  </button>
                )}
                {!visible.includes(`${label}.${nestedKey}`) && (
                  <button
                    onClick={() => updateVisible(`${label}.${nestedKey}`)}
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
        }
        return (
          <Input
            param={key}
            key={`${key}-${index}`}
            placeholder={`Enter ${key}`}
            value={obj[key] as string}
            dotNotation={`${label}.${nestedKey}`}
            label={`${capitalizeBeforeDashOrUnderscore(key)}`}
            onChange={(
              e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >,
            ) => {
              let value;
              const dotNotation = `${label}.${nestedKey}`;
              const containsArray = dotNotationContainArrayIndex(dotNotation);
              if (containsArray) {
                const [accessor, idx, key] = splitArrayDotNotation(dotNotation);
                const arr = getValueFromKey(state, accessor);
                const obj = { ...arr[idx] };
                obj[key] = parseNumericValueOrString(e.target.value);
                arr[idx] = obj;
                value = arr;
              } else {
                value = parseNumericValueOrString(e.target.value);
              }
              dispatch({
                type: "SET_VALUE",
                payload: {
                  key: containsArray
                    ? splitArrayDotNotation(dotNotation)[0]
                    : dotNotation,
                  value,
                },
              });
            }}
            onClear={() =>
              clearStateValue(state, dispatch, `${label}.${nestedKey}`)
            }
          />
        );
      })}
    </>
  );
}

export default function RecursiveInput({ obj, label }: RecursiveInputProps) {
  const { state, dispatch } = useStateDispatch();

  return (
    <RenderInput state={state} label={label} obj={obj} dispatch={dispatch} />
  );
}
