import { useState } from "react";
import FormBuilder from "../form-builder";
import { ObjectType } from "../../state/reducer";

type SectionProps = {
  label: string;
  state: ObjectType;
};

export default function Section({ label, state }: SectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  return (
    <div className="w-full h-fit justify-between">
      <div
        className={`w-full px-4 flex justify-between py-2.5 bg-gray-100/50 dark:bg-white/[0.03] items-center border-gray-100 dark:border-white/10 cursor-pointer hover:bg-gray-100/90 dark:hover:bg-white/5 border-t border-x rounded-t-xl ${!isOpen && "rounded-b-xl border-b"}`}
      >
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-6">
          {label}
        </div>
        <svg
          className={`w-4 h-4 bg-gray-500 dark:bg-gray-400 border-2 border-black text-center bg-no-repeat cursor-pointer ${
            isOpen ? "mask rotate-180" : ""
          }`}
          style={{
            maskImage: `url('https://mintlify.b-cdn.net/v6.5.1/solid/angle-up.svg')`,
            maskRepeat: "no-repeat",
            maskPosition: "center center",
          }}
          onClick={handleClick}
        />
      </div>
      {isOpen && (
        <div className="w-full space-y-8 py-8 justify-center px-4 border-l border-r border-b border-gray-100 dark:border-white/10 cursor-pointer  rounded-b-xl">
          <FormBuilder obj={state} label={label} />
        </div>
      )}
    </div>
  );
}
