import "./Input.css"

const Input = ({type, placeholder, value, onChange, required, icon: Icon, ...rest})  => {

    return(
        <div className="input">
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                {...rest}
            />
            {Icon && <Icon className="icon" />}
        </div>
    )
    
}

export default Input