import React, { useReducer, useState } from "react";
import "./App.css";
import Section from "./components/section";
import { StateProvider, useStateDispatch } from "./state/context";
import { ObjectType } from "./components/recursive-input";

function Form() {
  const { state, dispatch } = useStateDispatch();
  return (
    <div className="App">
      <div className="App-header h-fit">
        <div className="flex w-2/5 flex-col space-y-3 bg-background-light/90 dark:bg-background-dark/90 border border-gray-200/70 dark:border-white/10 rounded-xl ring-2 ring-gray-100 dark:ring-white/5 p-4">
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
              const stateObj = state[key as keyof ObjectType] as ObjectType;
              return <Section state={stateObj} label={key} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <StateProvider>
      <>
        {/* <div className="bg-[#090b11] flex flex-row items-stretch gap-12 pt-[9.5rem] lg:pt-[6.5rem]">
          <div
            className="relative grow mx-auto px-1 overflow-hidden xl:-ml-12 xl:pl-14"
            id="content-area"
          >
            <header id="header" className="relative">
              <div className="mt-0.5 space-y-2.5">
                <div className="flex h-5">
                  <div className="flex-1 text-[#DFDFE0] text-sm font-semibold">
                    Text to Speech
                  </div>
                </div>
                <div className="flex items-center">
                  <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200">
                    Text to speech
                  </h1>
                </div>
              </div>
              <div className="mt-2 text-lg prose prose-gray text-[#A09FA0]">
                <p>
                  API that converts text into lifelike speech with best-in-class
                  latency &amp; uses the most advanced AI audio model ever.
                  Create voiceovers for your videos, audiobooks, or create AI
                  chatbots for free.
                </p>
              </div>
            </header>
          </div>
        </div> */}
        <Form />
      </>
    </StateProvider>
  );
}

export default App;
