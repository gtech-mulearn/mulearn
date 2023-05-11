import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    prefixIcon?: JSX.Element;
    sufixIcon?: JSX.Element;
    hintText?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({
    prefixIcon,
    sufixIcon,
    hintText,
    onChange,
    style,
    ...rest
}) => {
    const placeholderStyle = {
        color: 'rgba(1, 75, 178, 1)',
        fontSize: '14px',
        fontWeight: 500,
    };

    return (
        <div style={{
            display: 'flex', alignItems: 'center', ...style,
            border: "1px solid rgba(1, 75, 178, .5)",
            borderRadius: '8px',
            padding: '4px 6px',
            width: 'fit-content'
        }}>
            {prefixIcon && (
                <div style={{ marginRight: '8px' }}>{prefixIcon}</div>
            )}
            <input
                style={{ flex: 1 }}
                placeholder={hintText}
                onChange={onChange}
                {...rest}
            />
            {sufixIcon && (
                <div style={{ marginLeft: '8px' }}>{sufixIcon}</div>
            )}
            <style>{`::placeholder { ${Object.entries(placeholderStyle ?? {}).map(([k, v]) => `${k}: ${v};`).join(' ')} }`}</style>
        </div>
    );
};

export default InputField;
