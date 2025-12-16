import "./TextArea.css"

const TextArea = ({
    placeholder,
    value,
    onChange,
    required,
    rows = 4
}) => {
    return(
    <div className="input">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
      />
    </div>
    )
}

export default TextArea