import { useParams } from "react-router-dom";
import { useRedirectToApp } from "@/modules/utils/redirectToApp";

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const redirect = useRedirectToApp();

    return (
        <>
            {redirect(`/profile/${id}`)}
        </>
    );
}