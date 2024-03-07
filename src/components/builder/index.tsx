import { useStateDispatch } from "../../state/context";
import { ObjectType } from "../../state/reducer";
import FormBuilder from "../form-builder";
import Section from "../section";

export default function Builder() {
  const { state } = useStateDispatch();
  return (
    <div className="flex w-full flex-col space-y-3 bg-background-light/90 dark:bg-background-dark/90 border border-gray-200/70 dark:border-white/10 rounded-xl ring-2 ring-gray-100 dark:ring-white/5 p-4">
      <div className="flex space-x-2 items-center">
        <div className="relative group flex-1 flex min-w-0 rounded-lg px-2 py-1.5 items-center cursor-pointer border border-gray-200/70 dark:border-white/10">
          <div className="rounded-md font-bold px-1.5 py-0.5 text-sm leading-5  bg-blue-400/20 text-blue-700 dark:bg-blue-400/20 dark:text-blue-400">
            POST
          </div>
          <div className="mx-2 w-[1px] h-4 bg-gray-200 dark:bg-white/10"></div>
          <div className="flex-1 flex items-center space-x-1 overflow-x-auto font-mono">
            <div className="text-sm text-gray-400">/</div>
            <div className="text-sm text-gray-800 dark:text-white font-medium min-w-max">
              v1
            </div>
            <div className="text-sm text-gray-400">/</div>
            <div className="text-sm text-gray-800 dark:text-white font-medium min-w-max">
              text-to-speech
            </div>
            <div className="text-sm text-gray-400">/</div>
            <div className="text-sm font-mono font-medium rounded-md px-1 border-2 min-w-max text-[#3064E3] bg-[#3064E3]/10 border-[#3064E3]/30">
              {"{voice_id}"}
            </div>
          </div>
          <div className="absolute right-3 hidden group-hover:block">
            <svg
              style={{
                maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/regular/clone.svg')`,
                maskRepeat: "no-repeat",
                maskPosition: "center center",
              }}
              className="h-4 w-4 bg-gray-400 dark:bg-white/30"
            />
          </div>
        </div>
        <button className="flex items-center justify-center w-16 h-9 text-white font-medium rounded-lg mouse-pointer disabled:opacity-70 bg-[#3064E3] text-sm">
          Send
        </button>
      </div>
      <div className="w-full space-y-3 m-0 px-1.5">
        {Object.keys(state).map((key: string) => {
          const stateObj = state[key] as ObjectType;
          return (
            <>
              <Section state={stateObj} label={key}>
                <FormBuilder obj={stateObj} label={key} />
              </Section>
            </>
          );
        })}
      </div>
    </div>
  );
}
