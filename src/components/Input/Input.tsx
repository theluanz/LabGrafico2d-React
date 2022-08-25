import { useState } from 'react';

interface IProps {
  children: string;
  type: string;
  id: string;
  value: any;
  setValue: (value: any) => void;
}

function Input({ children, id, type, value, setValue }: IProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={id}>{children}</label>
      <input
        className="border hover:border-blue-600 focus:border-blue-600 outline-none rounded-lg px-3 py-2 text-md shadow-sm"
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export { Input };
