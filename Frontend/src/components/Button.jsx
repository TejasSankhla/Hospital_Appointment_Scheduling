import * as React from "react";
import { ArrowRight } from "lucide-react";

export function Button(props) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`inline-flex w-full mx-2 justify-center rounded-md border-black  border  text-gray-800  py-2 text-sm font-semibold hover:bg-blue-100`}
    >
      {props.content}
      {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
    </button>
  );
}
