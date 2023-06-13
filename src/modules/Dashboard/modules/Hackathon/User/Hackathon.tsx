import { Link } from "react-router-dom";
import logo from "../../../../../assets/images/hackadmin.png"

const Hackathon = () => {
    return (
        <div>
			<img src={logo}alt="" />

            <Link to="/hackathon-management">
                <button>Create</button>
            </Link>
        </div>
    );
};

export default Hackathon;
