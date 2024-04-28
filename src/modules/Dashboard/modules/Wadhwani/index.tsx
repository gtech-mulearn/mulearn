import { useEffect, useState } from "react";
import { getWadhwaniClientToken, getWadhwaniCourses } from "./services/api";
import toast from "react-hot-toast";

const Wadhwani = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { response, error } = await getWadhwaniClientToken();
        if (error) {
            toast.error(error);
        } else if (response) {
            const { response: courses, error } = await getWadhwaniCourses(response.access_token);
            if (error) {
                toast.error(error);
            } else if (courses) {
                setData(courses);
            }
        }
    };

    return (
        <div>
            <h1>Wadhwani</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Wadhwani;
