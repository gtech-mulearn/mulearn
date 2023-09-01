import axios from "axios";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";

export const fetchQRCode = async (setBlob: any) => {
    try {
        const muid = fetchLocalStorage<UserInfo>("userInfo")?.muid;

        const url = `https://quickchart.io/qr?text=${
            import.meta.env.VITE_FRONTEND_URL
        }/profile/${muid}&centerImageUrl=https://avatars.githubusercontent.com/u/98015594?s=88&v=4`;
        const response = await axios
            .get(url, {
                responseType: "arraybuffer"
            })
            .then(response => {
                // console.log(response.data);
                const blob = new Blob([response.data], {
                    type: "image/png"
                });
                setBlob(URL.createObjectURL(blob));
                // const imageUrl = URL.createObjectURL(blob);
                // console.log(blob);
            });
    } catch (error) {
        console.error(error);
    }
};
