import { Form } from "../form";

type FormBuilderProps = {
  obj: Record<string, unknown>;
  label: string;
};

export default function FormBuilder({ obj, label }: FormBuilderProps) {
  if (label === "body") {
    return (
      <div className="block w-full py-5 px-3.5 relative border rounded-lg border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 focus-within:!border-gray-300 dark:focus-within:!border-white/20 cursor-ns-resize">
        <label className="overflow-hidden whitespace-nowrap text-ellipsis w-fit cursor-pointer bg-[#090B11] absolute top-0 left-2 px-1 transform -translate-y-1/2 font-roboto text-xs font-normal">
          <div className="overflow-hidden whitespace-nowrap text-ellipsis">
            {`Body · object`}
          </div>
        </label>
        <Form obj={obj} label={label} />
      </div>
    );
  }
  return <Form obj={obj} label={label} />;
}
