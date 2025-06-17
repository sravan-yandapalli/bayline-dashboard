// components/ui/input.tsx
import React, { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
