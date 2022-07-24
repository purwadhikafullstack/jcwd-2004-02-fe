const Input = ({
  children,
  name,
  onChange,
  onBlur,
  value,
  className,
  type,
  leftIcon,
  placeholder,
}) => {
  return (
    <div>
      <p className="text-sm text-purple-800 mb-1 xl:text-xs">{children}</p>
      <input
        name={name}
        type={type}
        className={
          "border-2 xl:h-10 xl:pl-10 h-12 pl-8 pr-8 xl:pr-10 pb-1 w-full rounded-xl focus:outline-none xl:text-sm" +
          className
        }
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        required
      ></input>
      <div className="absolute xl:bottom-3 top-8 ml-3 text-purple-800 text-lg">
        {leftIcon}
      </div>
    </div>
  );
};

export default Input;
