import "./App.css";
import { StateProvider } from "./state/context";
import Prose from "./components/prose";
import Builder from "./components/builder";

function App() {
  return (
    <StateProvider>
      <div className="App">
        <div className="App-header h-fit text-left">
          <p>TTS Demo</p>
          <div className="flex w-full lg:w-4/5 gap-x-20 justify-center">
            <div className="flex flex-col gap-8 w-full lg:w-2/5">
              <div className="mt-6 flex flex-col space-y-4">
                <Builder />
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full lg:w-2/5">
              <div className="mt-6 flex flex-col space-y-4">
                <Prose />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StateProvider>
  );
}

export default App;
