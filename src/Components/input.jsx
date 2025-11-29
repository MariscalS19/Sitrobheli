export default function Input({
    text,
    type,
    placeholder,
    value,
    onChange,
    icon,
    className,
    keyword,
}) {
    return (
        <div className={`input${keyword}Group`}>
            <label className={`input${keyword}Label`}>{text}</label>
            <div className={`input${keyword}Container`}>
                {icon && <div className={`input${keyword}Icon`}>{icon}</div>}
                <input
                    className={`${className ? ` ${className}` : ''} ${
                        icon ? 'input-with-icon' : ''
                    }`}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
