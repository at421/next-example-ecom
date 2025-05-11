'use client';

type CheckboxType = {
  type?: string;
  label: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxType> = ({ type = "", label, name, onChange }) => (
  <label
    htmlFor={`${label}-${name}`}
    className={`checkbox ${type ? `checkbox--${type}` : ""}`}
  >
    <input
      name={name}
      onChange={onChange}
      type="checkbox"
      id={`${label}-${name}`}
    />
    <span className="checkbox__check" />
    <p>{label}</p>
  </label>
);

export default Checkbox;