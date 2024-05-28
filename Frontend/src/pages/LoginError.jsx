import React from "react";
import { ArrowLeft } from "lucide-react";

export default function LoginError() {
  return (
    <div className="flex items-center justify-center min-h-screen px-2 md:px-0">
      <div className="text-center">
        <p className="text-sm font-semibold text-black">Login Error</p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          Unable to login
        </h1>
        <p className="mt-4 text-gray-500">
          Please check your username and password and try again.
        </p>
      </div>
    </div>
  );
}
