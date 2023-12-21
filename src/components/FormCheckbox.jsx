const FormCheckbox = ({ label, name, size, defaultValue }) => {
  return (
    <>
      <div className=" form-control w-full max-w-xs items-center">
        <label htmlFor={name} className="label cursor-pointer">
          <span className="label-text capitalize">{label}</span>
        </label>
        <input
          type="checkbox"
          name={name}
          className={` checkbox checkbox-primary ${size}`}
          defaultChecked={defaultValue}
        />
      </div>
    </>
  );
};

export default FormCheckbox;
