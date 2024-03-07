import { Tooltip } from "@mui/material";
import Input from "../input";
import Select from "../select";
import {
  Action,
  ObjectType,
  initial_pronunciation_dictionary_locators,
} from "../../state/reducer";
import {
  capitalizeBeforeDashOrUnderscore,
  getValueFromKey,
  keyExistsInObj,
  snakeToCamel,
  getType,
  dotNotationContainArrayIndex,
  splitArrayDotNotation,
  parseNumericValueOrString,
  clearStateValue,
} from "../../utils";

type RenderInputProps = {
  state: ObjectType;
  visible: string;
  params: Record<string, string>;
  setVisible: React.Dispatch<React.SetStateAction<string>>;
  setParams: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  dispatch: React.Dispatch<Action>;
  label: string;
  obj: ObjectType;
  prefix?: string;
  addNewParam: (key: string, value: string) => void;
  removeParam: (key: string) => void;
  updateVisible: (key: string) => void;
  collapsed: Record<string, boolean>;
  toggleCollapsed: (key: string) => void;
};

export default function RenderInput({
  state,
  dispatch,
  label,
  obj,
  prefix,
  params,
  visible,
  collapsed,
  setVisible,
  setParams,
  addNewParam,
  removeParam,
  updateVisible,
  toggleCollapsed,
}: RenderInputProps) {
  const nestedKeyPrefix = prefix ? `${prefix}.` : "";

  return (
    <>
      {Object.keys(obj).map((key, index) => {
        const nestedKey = `${nestedKeyPrefix}${key}`;
        if (Array.isArray(obj[key])) {
          return (
            <div className="block w-full py-5 px-3.5 mt-3 relative border rounded-lg border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 focus-within:!border-gray-300 dark:focus-within:!border-white/20 cursor-ns-resize">
              <label className="overflow-hidden whitespace-nowrap text-ellipsis w-3/4 cursor-pointer bg-[#090B11] absolute top-0 left-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis">{`${key} ${capitalizeBeforeDashOrUnderscore(key)} · array`}</p>
                </div>
              </label>
              <div className="flex w-fit space-x-0.5 cursor-pointer bg-[#090B11] absolute top-0 right-2 px-1 transform -translate-y-1/2">
                {obj[key] != null && (
                  <button
                    aria-label="delete parameter value"
                    className="group p-1 cursor-pointer"
                    onClick={() =>
                      clearStateValue(state, dispatch, `${label}.${nestedKey}`)
                    }
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
                          {key}
                        </div>
                        <div className="flex items-center rounded px-1.5 py-0.5 bg-white/[.15] text-white text-xs">
                          array
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
                <button
                  aria-label="info parameter value"
                  className="group p-1 cursor-pointer"
                  onClick={() => toggleCollapsed(`${label}.${nestedKey}`)}
                >
                  <svg
                    className="w-4 h-4 bg-gray-300 group-hover:bg-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-300"
                    style={{
                      maskRepeat: "no-repeat",
                      maskPosition: "center center",
                      maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/solid/down-left-and-up-right-to-center.svg')`,
                    }}
                  />
                </button>
              </div>
              {!collapsed[`${label}.${nestedKey}`] && (
                <div className="space-y-4">
                  {(obj[key] as ObjectType[]).map(
                    (item: ObjectType, index: number) => (
                      <div className="block w-full py-5 px-3.5 mt-3 relative border rounded-lg border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 focus-within:!border-gray-300 dark:focus-within:!border-white/20 cursor-ns-resize">
                        <label className="overflow-hidden whitespace-nowrap text-ellipsis w-3/4 cursor-pointer bg-[#090B11] absolute top-0 left-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal">
                          <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                            <p className="overflow-hidden whitespace-nowrap text-ellipsis">{`${key} ${capitalizeBeforeDashOrUnderscore(key)} · array`}</p>
                          </div>
                        </label>
                        <div className="flex w-fit space-x-0.5 cursor-pointer bg-[#090B11] absolute top-0 right-2 px-1 transform -translate-y-1/2">
                          {obj[key] != null && (
                            <button
                              aria-label="delete parameter value"
                              className="group p-1 cursor-pointer"
                              onClick={() =>
                                clearStateValue(
                                  state,
                                  dispatch,
                                  `${label}.${nestedKey}.[${index}]`,
                                )
                              }
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
                                    {key}
                                  </div>
                                  <div className="flex items-center rounded px-1.5 py-0.5 bg-white/[.15] text-white text-xs">
                                    object
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
                          <button
                            aria-label="info parameter value"
                            className="group p-1 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleCollapsed(`${nestedKey}.[${index}]`);
                            }}
                          >
                            <svg
                              className="w-4 h-4 bg-gray-300 group-hover:bg-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-300"
                              style={{
                                maskRepeat: "no-repeat",
                                maskPosition: "center center",
                                maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/solid/down-left-and-up-right-to-center.svg')`,
                              }}
                            />
                          </button>
                        </div>
                        {!collapsed[`${nestedKey}.[${index}]`] && (
                          <div className="space-y-4">
                            <RenderInput
                              obj={item as ObjectType}
                              label={label}
                              state={state}
                              prefix={`${nestedKey}.[${index}]`}
                              dispatch={dispatch}
                              key={`${key}-${index}`}
                              visible={visible}
                              setVisible={setVisible}
                              params={params}
                              collapsed={collapsed}
                              setParams={setParams}
                              addNewParam={addNewParam}
                              removeParam={removeParam}
                              updateVisible={updateVisible}
                              toggleCollapsed={toggleCollapsed}
                            />
                            {visible === `${label}.${nestedKey}.[${index}]` && (
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
                                      params[
                                        `${label}.${nestedKey}.[${index}]`
                                      ],
                                    );
                                    if (objectContainsKey) return;
                                    obj[
                                      params[`${label}.${nestedKey}.[${index}]`]
                                    ] = null;
                                    arr[index] = obj;
                                    dispatch({
                                      type: "SET_VALUE",
                                      payload: {
                                        key: `${label}.${nestedKey}`,
                                        value: arr,
                                      },
                                    });
                                    removeParam(
                                      `${label}.${nestedKey}.[${index}]`,
                                    );
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
                                      params[
                                        `${label}.${nestedKey}.[${index}]`
                                      ] ?? ""
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
                            {visible !== `${label}.${nestedKey}.[${index}]` && (
                              <button
                                onClick={() =>
                                  updateVisible(
                                    `${label}.${nestedKey}.[${index}]`,
                                  )
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
                        )}
                      </div>
                    ),
                  )}
                  <button
                    onClick={() => {
                      const arr = getValueFromKey(
                        state,
                        `${label}.${nestedKey}`,
                      );
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
              )}
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
              <label className="overflow-hidden whitespace-nowrap text-ellipsis w-fit cursor-pointer bg-[#090B11] absolute top-0 left-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                  {`${isNaN(Number(key)) ? key : snakeToCamel(`${prefix}_db_model`)} · object`}
                </div>
              </label>
              <div className="flex w-fit space-x-0.5 cursor-pointer bg-[#090B11] absolute top-0 right-2 px-1 transform -translate-y-1/2">
                {obj[key] != null && (
                  <button
                    aria-label="delete parameter value"
                    className="group p-1 cursor-pointer"
                    onClick={() =>
                      clearStateValue(state, dispatch, `${label}.${nestedKey}`)
                    }
                  >
                    <svg
                      className="w-4 h-4 bg-gray-300 group-hover:bg-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-300"
                      style={{
                        maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/regular/trash.svg')`,
                        maskRepeat: "no-repeat",
                        maskPosition: "center center",
                      }}
                    />
                  </button>
                )}
                <div className="group relative p-1">
                  <Tooltip
                    title={
                      <div className="space-x-2 px py-2 items-center w-fit flex bg-[#0A0A0A] text-white rounded">
                        <div className=" text-white font-mono text-xs m-0 p-0">
                          {key}
                        </div>
                        <div className="flex items-center rounded px-1.5 py-0.5 bg-white/[.15] text-white text-xs">
                          array
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
                <button
                  aria-label="info parameter value"
                  className="group p-1 cursor-pointer"
                  onClick={() => toggleCollapsed(`${label}.${nestedKey}`)}
                >
                  <svg
                    className="w-4 h-4 bg-gray-300 group-hover:bg-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-300"
                    style={{
                      maskRepeat: "no-repeat",
                      maskPosition: "center center",
                      maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/solid/down-left-and-up-right-to-center.svg')`,
                    }}
                  />
                </button>
              </div>
              {!collapsed[`${label}.${nestedKey}`] && (
                <div className="space-y-4">
                  <RenderInput
                    state={state}
                    label={label}
                    prefix={nestedKey}
                    dispatch={dispatch}
                    obj={obj[key] as ObjectType}
                    key={`${key}-${index}`}
                    visible={visible}
                    setVisible={setVisible}
                    params={params}
                    collapsed={collapsed}
                    setParams={setParams}
                    addNewParam={addNewParam}
                    removeParam={removeParam}
                    updateVisible={updateVisible}
                    toggleCollapsed={toggleCollapsed}
                  />
                  {visible === `${label}.${nestedKey}` && (
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
                              value: null,
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
                  {visible !== `${label}.${nestedKey}` && (
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
              )}
            </div>
          );
        }
        if (getType(`${label}.${nestedKey}`) === "boolean")
          return (
            <Select
              param={key}
              key={`${key}-${index}`}
              value={obj[key]?.toString()}
              dotNotation={`${label}.${nestedKey}`}
              label={`${capitalizeBeforeDashOrUnderscore(key)}`}
              onChange={(value: string | number | boolean) => {
                dispatch({
                  type: "SET_VALUE",
                  payload: {
                    key: `${label}.${nestedKey}`,
                    value,
                  },
                });
              }}
              onClear={() =>
                clearStateValue(state, dispatch, `${label}.${nestedKey}`)
              }
            />
          );
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
