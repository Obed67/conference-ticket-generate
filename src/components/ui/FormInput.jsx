const FormInput = ({ label, name, value, onChange, error, placeholder }) => {
    return (
      <div className="w-96 mb-2 p-2">
        <label className="block text-left my-1">{label}</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-2 rounded-lg ${error ? 'border-[hsl(7,86%,67%)]' : 'border-gray-500'} bg-[hsl(248,70%,10%)] placeholder-gray-300 border-2`}
          placeholder={placeholder}
        />
        {error && (
          <div className="flex gap-1 text-[hsl(7,86%,67%)] mt-2">
            <img src="/src/assets/images/icon-info.svg" alt="info icon" className="w-4 h-4" />
            <p className="text-sm">Please enter a valid {label}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default FormInput;
  