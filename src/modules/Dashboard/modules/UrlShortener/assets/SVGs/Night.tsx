import React from "react";

type Props = {};

const Night = (props: Props) => {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="9.5"
                cy="9.5"
                r="8.75"
                stroke="#808080"
                stroke-width="1.5"
            />
            <path
                d="M9.5 4.5V9.5L11 12"
                stroke="#808080"
                stroke-width="1.5"
                stroke-linecap="round"
            />
        </svg>
    );
};

export default Night;
