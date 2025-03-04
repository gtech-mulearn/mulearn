interface RegisterUserData {
    full_name: string;
    email: string;
    password: string;
}

interface DWMSData {
    email: string;
    fullName: string;
    phoneNumber: string;
    gender?: string;
    dob?: string;
}

interface RegisterInterestData {
    choosen_interests: string[];
    choosen_endgoals: string[];
    other_interests: string[];
    other_endgoals: string[];
}

type RegisterRequestDataType = {
    user: RegisterUserData;
    interests: InterestData;
    referral?: { muid: string };
    gender?: string;
    dob?: string;
    communities?: string[];
    integration?: {
        param: string;
        title: string;
    };
};

interface Question {
    question: string;
    options: { text: string; category: string }[];
}
