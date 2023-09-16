import React from "react";
import { Helmet } from "react-helmet";

type Props = {
    userProfile: any;
    dpm: string;
};

const HelmetMetaTags = (props: Props) => {
    return (
        <Helmet>
            {/* <!-- Primary Meta Tags --> */}
            <title>Profile | Mulearn</title>
            <meta
                name="title"
                content={`${props.userProfile.first_name} ${props.userProfile.last_name}`}
            />
            <meta name="viewport" content="width=device-width" />
            <meta name="route-pattern" content="/dashboard/profile/:id" />
            <meta name="description" content="you bio is here" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />

            {/* <!-- Open Graph / Facebook --> */}
            <meta
                property="og:image"
                itemProp="image"
                content={
                    props.userProfile.profile_pic
                        ? props.userProfile.profile_pic
                        : props.dpm
                }
            />
            <meta
                property="og:image:alt"
                content={`${props.userProfile.first_name}'s Profile Picture`}
            />
            <meta property="og:site_name" content="Mulearn" />
            <meta property="og:type" content="profile" />
            <meta
                property="og:title"
                content={
                    props.userProfile.first_name +
                    " " +
                    props.userProfile.last_name +
                    "(" +
                    props.userProfile.karma +
                    ")"
                }
            />
            <meta
                name="hostname"
                content={import.meta.env.VITE_FRONTEND_URL as string}
            />
            <meta
                property="og:url"
                content={
                    (import.meta.env.VITE_FRONTEND_URL as string) +
                    "/dashboard/profile/" +
                    props.userProfile.muid
                }
            />
            <meta property="og:description" content="you bio is here" />

            <meta
                property="og:image:secure_url"
                content={
                    props.userProfile.profile_pic
                        ? props.userProfile.profile_pic
                        : props.dpm
                }
            />
            <meta property="og:type" content="profile" />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="300" />
            <meta property="og:image:height" content="300" />

            {/* <!-- Twitter --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                property="twitter:site"
                content={
                    (import.meta.env.VITE_FRONTEND_URL as string) +
                    "/dashboard/profile/" +
                    props.userProfile.muid
                }
            />
            <meta
                name="twitter:title"
                content={`${props.userProfile.first_name} ${props.userProfile.last_name} (${props.userProfile.karma})`}
            />
            <meta name="twitter:description" content="you bio is here" />
            <meta
                name="twitter:image:src"
                content={
                    props.userProfile.profile_pic
                        ? props.userProfile.profile_pic
                        : props.dpm
                }
            />
        </Helmet>
    );
};

export default HelmetMetaTags;
