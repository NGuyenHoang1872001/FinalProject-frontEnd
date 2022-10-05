const InputForm = ({ title, inputName }) => {
  return (
    <div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">{title}</span>
        </label>
        <input
          type="text"
          placeholder={inputName}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
};
export default InputForm;
