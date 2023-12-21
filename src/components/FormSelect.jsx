const FormSelect = ({ label, selectList, name, defaultValue, size }) => {
  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor={name}>
          <span className="label-text capitalize">{label}</span>
        </label>
        <select
          className={`select select-bordered  capitalize ${size}`}
          name={name}
          id={name}
          defaultValue={defaultValue}
        >
          {selectList?.map((list, index) => {
            return <option key={index}>{list}</option>;
          })}
        </select>
      </div>
    </>
  );
};

export default FormSelect;
