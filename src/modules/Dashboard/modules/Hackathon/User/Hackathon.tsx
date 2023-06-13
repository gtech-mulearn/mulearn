import React from "react";
import { Link } from "react-router-dom";

const Hackathon = () => {
    return (
        <Link to="/hackathon-management">
            <button>Create</button>
        </Link>
    );
};

export default Hackathon;
