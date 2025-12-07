const InputField = ({ label, id, name, type = 'text', value, onChange, placeholder = '' }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={placeholder}
                required={label.includes('*')}
            />
        </div>
    );
    export default InputField;