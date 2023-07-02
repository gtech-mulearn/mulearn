import React, { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    handleClick?: () => void;
    bgColor?: string;
    prefixIcon?: JSX.Element;
    margin?: string;
}

export const PrimaryButton: React.FC<Props> = ({
    text,
    handleClick,
    bgColor = 'white',
    prefixIcon,
    margin,
    ...rest
}) => {
    return (
        <button
            onClick={handleClick}
            style={{
                height: "max-content",
                padding: "6px 16px",
                border: "1px solid var(--blue)",
                borderRadius: "8px",
                color: "var(--blue)",
                backgroundColor: bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: margin,
                fontWeight: "600"
            }}
            {...rest}
        >
            {prefixIcon && (
                <div style={{ marginRight: "8px" }}>{prefixIcon}</div>
            )}
            <span>{text}</span>
        </button>
    );
};

export default PrimaryButton;
