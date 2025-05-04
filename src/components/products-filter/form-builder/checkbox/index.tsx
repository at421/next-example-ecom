'use client';

type CheckboxType = {
  type?: string;
  label: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean; // Added for better control in parent components
  disabled?: boolean; // Added for better control
};

const Checkbox = ({ type = "", label, name, onChange, checked, disabled }: CheckboxType) => (
  <label
    htmlFor={`${label}-${name}`}
    className={`checkbox ${type ? `checkbox--${type}` : ""} ${disabled ? 'checkbox--disabled' : ''}`}
  >
    <input
      name={name}
      onChange={onChange}
      type="checkbox"
      id={`${label}-${name}`}
      checked={checked}
      disabled={disabled}
    />
    <span className="checkbox__check" />
    <p>{label}</p>
  </label>
);

export default Checkbox;