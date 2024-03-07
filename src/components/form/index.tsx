import { useState } from "react";
import { useStateDispatch } from "../../state/context";
import { objectIsEmpty, keyExistsInObj } from "../../utils";
import RenderInput from "../render-input";

type FormInnerProps = {
  obj: Record<string, unknown>;
  label: string;
};

export function Form({ obj, label }: FormInnerProps) {
  const { state, dispatch } = useStateDispatch();
  const [visible, setVisible] = useState<string>("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

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

  const updateVisible = (key: string) => setVisible(key);

  const toggleCollapsed = (key: string) => {
    const newObj = { ...collapsed };
    if (newObj[key]) {
      delete newObj[key];
    } else {
      newObj[key] = true;
    }

    setCollapsed(newObj);
  };
  return (
    <div>
      <div className="flex w-fit space-x-0.5 cursor-pointer bg-[#090B11] absolute top-0 right-2 px-1 transform -translate-y-1/2">
        {!objectIsEmpty(state?.body as {}) && (
          <button
            aria-label="delete parameter value"
            className="group p-1 cursor-pointer"
            onClick={() => dispatch({ type: "RESET" })}
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
        <button
          aria-label="info parameter value"
          className="group p-1 cursor-pointer"
          onClick={() => toggleCollapsed(`${label}`)}
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
      <div>
        {!collapsed[`${label}`] && (
          <div className="space-y-4">
            <RenderInput
              visible={visible}
              setVisible={setVisible}
              state={state}
              label={label}
              obj={obj as {}}
              dispatch={dispatch}
              params={params}
              setParams={setParams}
              addNewParam={addNewParam}
              removeParam={removeParam}
              updateVisible={updateVisible}
              collapsed={collapsed}
              toggleCollapsed={toggleCollapsed}
            />
            {label === "body" && (
              <>
                {visible !== `${label}` && (
                  <button
                    onClick={() => updateVisible(`${label}`)}
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

                {visible === `${label}` && (
                  <button
                    aria-label="add new property to object"
                    onClick={() => updateVisible(`${label}`)}
                    className="flex px-3.5 focus-within:!border-primary dark:focus-within:!border-primary-light border-gray-200/80 dark:border-white/10 dark:hover:border-white/40 w-full border-dashed border-2 rounded-lg transition-[height] h-10"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (
                          keyExistsInObj(
                            state,
                            `${label}.${params[`${label}`]}`,
                          )
                        )
                          return;
                        dispatch({
                          type: "SET_VALUE",
                          payload: {
                            key: `${label}.${params[`${label}`]}`,
                            value: null,
                          },
                        });
                        removeParam(`${label}`);
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
                        value={params[`${label}`] ?? ""}
                        onChange={(e) =>
                          addNewParam(`${label}`, e.target.value)
                        }
                        className={`py-2.5 flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-white/30 font-mono focus-visible ${keyExistsInObj(state, `${label}.${params[`${label}`]}`) && "underline decoration-wavy decoration-red-400"}`}
                      />
                    </form>
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
