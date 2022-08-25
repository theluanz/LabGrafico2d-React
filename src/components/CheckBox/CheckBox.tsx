interface IProps {
  children: string;
  value: boolean;
  id: string;
  setValue: (value: boolean) => void;
}
function CheckBox({ children, setValue, value, id }: IProps) {
  return (
    <label htmlFor={id} className="flex gap-2">
      <input name={id} type="checkbox" id={id} onChange={(e) => setValue(!value)} checked={value}
      className="form-checkbox w-4"
      />
      <span>{children}</span>
    </label>
  );
}

export { CheckBox };
