import "./Select.css"

const Select = ({value, onChange, required, options = [], placeholder}) => {
    return(
        <div className="input">
            <select value={value} onChange={onChange} required={required}>
                {placeholder && <option value="">{placeholder}</option>}

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))} 
            </select>
        </div>
    )
}

export default Select;