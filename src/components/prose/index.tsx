import React, { useState } from "react";
import { useStateDispatch } from "../../state/context";
import { ObjectType, bodyPlaceholder } from "../../state/reducer";
import { objectIsEmpty } from "../../utils";

const ObjectRenderer = ({ data }: { data: any }) => {
  const renderObject = (
    obj: ObjectType | ObjectType[],
    indent = 0,
    showKey = true,
  ) => {
    return Object.entries(obj).map(([key, value]) => {
      const formattedKey = `"${key}"`;
      const indentSpaces = " ".repeat(indent * 2);
      if (value == null) return;
      if (Array.isArray(value) && value.length < 1) return;
      if (
        value != null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.values(value).every((value) => value === null)
      )
        return;
      if (typeof value === "object" && !Array.isArray(value))
        return (
          <div key={key}>
            {indentSpaces}&nbsp;{showKey && `${formattedKey}: `}
            {"{"}
            {renderObject(value, indent + 1)}
            {indentSpaces}&nbsp;{"}"}
          </div>
        );
      if (Array.isArray(value)) {
        const shouldRenderObject = value.some((obj) =>
          Object.values(obj).some((val) => val !== null),
        );
        return (
          <div key={key}>
            {indentSpaces}&nbsp;{formattedKey}: [
            {shouldRenderObject && (
              <div>{renderObject(value, indent + 1, false)}</div>
            )}
            {shouldRenderObject && indentSpaces}
            {shouldRenderObject && <>&nbsp;</>}]
          </div>
        );
      }
      return (
        <div key={key}>
          {indentSpaces}&nbsp;{formattedKey}: {JSON.stringify(value)}
        </div>
      );
    });
  };

  return (
    <pre>
      --data {"{"}
      {renderObject(data, 1)}
      {"}"}
    </pre>
  );
};

export default function Prose() {
  const { state } = useStateDispatch();
  const [selected, setSelected] = useState(0);
  return (
    <div className="w-full not-prose relative overflow-hidden bg-[#0F1117] dark:bg-codeblock rounded-xl dark:ring-1 dark:ring-gray-800/50">
      <div
        className="flex h-10 text-xs leading-6 border-b bg-black/40 rounded-t-xl border-gray-900/80"
        role="tablist"
        aria-orientation="horizontal"
      >
        <div className="flex overflow-x-auto">
          <button
            className="group flex items-center relative px-2 pt-2.5 pb-2 text-gray-400 outline-none whitespace-nowrap font-medium text-primary-light"
            id="headlessui-tabs-tab-:r14:"
            role="tab"
            type="button"
            aria-selected="true"
            tabIndex={0}
            data-headlessui-state="selected"
            aria-controls="headlessui-tabs-panel-:r1a:"
            onClick={() => setSelected(0)}
          >
            <div className="px-2 rounded-md group-hover:bg-gray-700/60 group-hover:text-primary-light">
              <div className="z-10">cURL</div>
            </div>
            {selected === 0 && (
              <div className="absolute inset-0 border-b pointer-events-none border-primary-light"></div>
            )}
          </button>
          <button
            className="group flex items-center relative px-2 pt-2.5 pb-2 text-gray-400 outline-none whitespace-nowrap font-medium"
            id="headlessui-tabs-tab-:r15:"
            role="tab"
            type="button"
            aria-selected="false"
            tabIndex={-1}
            data-headlessui-state=""
            aria-controls="headlessui-tabs-panel-:r1b:"
            onClick={() => setSelected(1)}
          >
            <div className="px-2 rounded-md group-hover:bg-gray-700/60 group-hover:text-primary-light">
              <div className="z-10">Python</div>
            </div>
            {selected === 1 && (
              <div className="absolute inset-0 border-b pointer-events-none border-primary-light"></div>
            )}
          </button>
          <button
            className="group flex items-center relative px-2 pt-2.5 pb-2 text-gray-400 outline-none whitespace-nowrap font-medium"
            id="headlessui-tabs-tab-:r16:"
            role="tab"
            type="button"
            aria-selected="false"
            tabIndex={-1}
            data-headlessui-state=""
            aria-controls="headlessui-tabs-panel-:r1c:"
            onClick={() => setSelected(2)}
          >
            <div className="px-2 rounded-md group-hover:bg-gray-700/60 group-hover:text-primary-light">
              <div className="z-10">JavaScript</div>
            </div>
            {selected === 2 && (
              <div className="absolute inset-0 border-b pointer-events-none border-primary-light"></div>
            )}
          </button>
          <button
            className="group flex items-center relative px-2 pt-2.5 pb-2 text-gray-400 outline-none whitespace-nowrap font-medium"
            id="headlessui-tabs-tab-:r17:"
            role="tab"
            type="button"
            aria-selected="false"
            tabIndex={-1}
            data-headlessui-state=""
            aria-controls="headlessui-tabs-panel-:r1d:"
            onClick={() => setSelected(3)}
          >
            <div className="px-2 rounded-md group-hover:bg-gray-700/60 group-hover:text-primary-light">
              <div className="z-10">PHP</div>
            </div>
            {selected === 3 && (
              <div className="absolute inset-0 border-b pointer-events-none border-primary-light"></div>
            )}
          </button>
          <button
            className="group flex items-center relative px-2 pt-2.5 pb-2 text-gray-400 outline-none whitespace-nowrap font-medium"
            id="headlessui-tabs-tab-:r18:"
            role="tab"
            type="button"
            aria-selected="false"
            tabIndex={-1}
            data-headlessui-state=""
            aria-controls="headlessui-tabs-panel-:r1e:"
            onClick={() => setSelected(4)}
          >
            <div className="px-2 rounded-md group-hover:bg-gray-700/60 group-hover:text-primary-light">
              <div className="z-10">Go</div>
            </div>
            {selected === 4 && (
              <div className="absolute inset-0 border-b pointer-events-none border-primary-light"></div>
            )}
          </button>
          <button
            className="group flex items-center relative px-2 pt-2.5 pb-2 text-gray-400 outline-none whitespace-nowrap font-medium"
            id="headlessui-tabs-tab-:r19:"
            role="tab"
            type="button"
            aria-selected="false"
            tabIndex={-1}
            data-headlessui-state=""
            aria-controls="headlessui-tabs-panel-:r1f:"
            onClick={() => setSelected(5)}
          >
            <div className="px-2 rounded-md group-hover:bg-gray-700/60 group-hover:text-primary-light">
              <div className="z-10">Java</div>
            </div>
            {selected === 5 && (
              <div className="absolute inset-0 border-b pointer-events-none border-primary-light"></div>
            )}
          </button>
        </div>
        <div className="flex-auto flex justify-end items-center pr-4 rounded-tr">
          <div className="group z-10 relative">
            <button className="h-7 w-7 flex items-center justify-center rounded-md">
              <svg
                className="fill-gray-700 group-hover:fill-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 14.5H9C9.275 14.5 9.5 14.275 9.5 14V12H11V14C11 15.1031 10.1031 16 9 16H2C0.896875 16 0 15.1031 0 14V7C0 5.89687 0.896875 5 2 5H4V6.5H2C1.725 6.5 1.5 6.725 1.5 7V14C1.5 14.275 1.725 14.5 2 14.5ZM7 11C5.89687 11 5 10.1031 5 9V2C5 0.896875 5.89687 0 7 0H14C15.1031 0 16 0.896875 16 2V9C16 10.1031 15.1031 11 14 11H7Z"></path>
              </svg>
            </button>
            <div className="absolute top-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block text-white rounded-lg px-1.5 py-0.5 text-xs bg-primary-dark">
              Copy
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-h-[calc(100%-40px)]">
        <div
          className="flex-none text-gray-50 p-5 min-w-full overflow-x-auto scrollbar-thumb-white/25 dark:scrollbar-thumb-white/10 w-full scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded text-xs leading-[1.35rem]"
          id="headlessui-tabs-panel-:r1a:"
          role="tabpanel"
          tabIndex={0}
          data-headlessui-state="selected"
          aria-labelledby="headlessui-tabs-tab-:r14:"
          style={{ fontVariantLigatures: "none" }}
        >
          <pre>
            <code>
              <span className="token function">curl</span>{" "}
              <span className="token parameter variable">--request</span> POST{" "}
              <span className="token punctuation">\</span>
              <br />
              <span className="token parameter variable">--url</span>{" "}
              https://api.elevenlabs.io/v1/text-to-speech/
              {state.path?.["voice_id" as keyof {}] !== null && (
                <>
                  <span className="token punctuation">
                    {state.path?.["voice_id" as keyof {}]}
                  </span>
                </>
              )}
              {state.path?.["voice_id" as keyof {}] === null && (
                <>
                  <span className="token punctuation">{"{"}</span>voice_id
                  <span className="token punctuation">{"}"}</span>
                </>
              )}
              {Object.entries(state.query || {})
                .filter(([key, value]) => value !== null)
                .map(([key, value], index) => (
                  <>
                    {state.query?.[key as keyof {}] != null && (
                      <>
                        {index === 0 && <span className="token string">?</span>}
                        {index > 0 && <span className="token string">&</span>}
                        <span className="token string">
                          {`${key}=${state.query?.[key as keyof {}]}`}
                        </span>
                      </>
                    )}
                  </>
                ))}{" "}
              <span className="token punctuation">\</span>
              <br />
              <span className="token parameter variable">--header</span>{" "}
              <span className="token string">
                'Content-Type: application/json'
              </span>{" "}
              <span className="token punctuation">\</span>
              <br />
              {Object.keys(state.header || {}).map((key: string, index) => (
                <React.Fragment key={index}>
                  {state.header?.[key as keyof {}] != null && (
                    <>
                      <span className="token parameter variable">--header</span>{" "}
                      <span className="token string">
                        {`'${key}: ${state.header?.[key as keyof {}]}'`}
                      </span>{" "}
                    </>
                  )}
                </React.Fragment>
              ))}
              <ObjectRenderer
                data={
                  objectIsEmpty(state?.body as {})
                    ? bodyPlaceholder
                    : state.body
                }
              />
            </code>
          </pre>
        </div>
        <span
          id="headlessui-tabs-panel-:r1b:"
          role="tabpanel"
          tabIndex={-1}
          aria-labelledby="headlessui-tabs-tab-:r15:"
          style={{
            position: "fixed",
            top: "1px",
            left: "1px",
            width: "1px",
            height: "0px",
            padding: "0px",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0px, 0px, 0px, 0px)",
            whiteSpace: "nowrap",
            borderWidth: "0px",
          }}
        ></span>
        <span
          id="headlessui-tabs-panel-:r1c:"
          role="tabpanel"
          tabIndex={-1}
          aria-labelledby="headlessui-tabs-tab-:r16:"
          style={{
            position: "fixed",
            top: "1px",
            left: "1px",
            width: "1px",
            height: "0px",
            padding: "0px",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0px, 0px, 0px, 0px)",
            whiteSpace: "nowrap",
            borderWidth: "0px",
          }}
        ></span>
        <span
          id="headlessui-tabs-panel-:r1d:"
          role="tabpanel"
          tabIndex={-1}
          aria-labelledby="headlessui-tabs-tab-:r17:"
          style={{
            position: "fixed",
            top: "1px",
            left: "1px",
            width: "1px",
            height: "0px",
            padding: "0px",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0px, 0px, 0px, 0px)",
            whiteSpace: "nowrap",
            borderWidth: "0px",
          }}
        ></span>
        <span
          id="headlessui-tabs-panel-:r1e:"
          role="tabpanel"
          tabIndex={-1}
          aria-labelledby=" -tabs-tab-:r18:"
          style={{
            position: "fixed",
            top: "1px",
            left: "1px",
            width: "1px",
            height: "0px",
            padding: "0px",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0px, 0px, 0px, 0px)",
            whiteSpace: "nowrap",
            borderWidth: "0px",
          }}
        ></span>
        <span
          id="headlessui-tabs-panel-:r1f:"
          role="tabpanel"
          tabIndex={-1}
          aria-labelledby="headlessui-tabs-tab-:r19:"
          style={{
            position: "fixed",
            top: "1px",
            left: "1px",
            width: "1px",
            height: "0px",
            padding: "0px",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0px, 0px, 0px, 0px)",
            whiteSpace: "nowrap",
            borderWidth: "0px",
          }}
        ></span>
      </div>
    </div>
  );
}
