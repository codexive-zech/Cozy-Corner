const FormInput = ({ name, label, type, defaultValue, size }) => {
  return (
    <>
      <label className="form-control">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className={`${size} input input-bordered w-full `}
        />
      </label>
    </>
  );
};

export default FormInput;
